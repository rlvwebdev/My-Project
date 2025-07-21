# Project Rename Script for Next.js Template
# Clean version without Unicode characters that can cause encoding issues

param(
    [Parameter(Mandatory = $false)]
    [string]$NewName,
    
    [Parameter(Mandatory = $false)]
    [string]$NewDescription = "A modern Next.js application",
    
    [Parameter(Mandatory = $false)]
    [string]$NewAuthor = "",
    
    [Parameter(Mandatory = $false)]
    [string]$NewRepository = "",
    
    [Parameter(Mandatory = $false)]
    [switch]$Help
)

# Color functions for better output
function Write-Success { param($Message) Write-Host $Message -ForegroundColor Green }
function Write-Warning { param($Message) Write-Host $Message -ForegroundColor Yellow }
function Write-Error { param($Message) Write-Host $Message -ForegroundColor Red }
function Write-Info { param($Message) Write-Host $Message -ForegroundColor Cyan }

# Show help
if ($Help) {
    Write-Host ""
    Write-Host "Next.js Project Rename Tool" -ForegroundColor White -BackgroundColor Blue
    Write-Host ""
    Write-Info "Usage:"
    Write-Host "  .\scripts\rename-project-clean.ps1 -NewName `"ProjectName`" [options]"
    Write-Host ""
    Write-Info "Parameters:"
    Write-Host "  -NewName        (required) New project name"
    Write-Host "  -NewDescription Project description"
    Write-Host "  -NewAuthor      Author name"
    Write-Host "  -NewRepository  Git repository URL"
    Write-Host "  -Help           Show this help message"
    Write-Host ""
    Write-Info "Examples:"
    Write-Host "  .\scripts\rename-project-clean.ps1 -NewName `"My Awesome App`""
    Write-Host ""
    Write-Host "  .\scripts\rename-project-clean.ps1 -NewName `"My App`" -NewDescription `"My description`""
    Write-Host ""
    Write-Success "A backup will be created before making changes."
    Write-Host ""
    exit 0
}

# Validate input
if ([string]::IsNullOrWhiteSpace($NewName)) {
    Write-Error "Project name cannot be empty"
    Write-Info "Use -Help for usage information"
    exit 1
}

# Convert name to different formats
$ProjectNameKebab = $NewName -replace '\s+', '-' -replace '[^a-zA-Z0-9\-]', '' | ForEach-Object { $_.ToLower() }

Write-Info "Starting project rename process..."
Write-Info "New project name: $NewName"
Write-Info "Kebab case: $ProjectNameKebab"

# Create backup
Write-Info "Creating backup of current configuration..."
$BackupDir = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null

$FilesToBackup = @("package.json", "README.md", ".env.example")
foreach ($File in $FilesToBackup) {
    if (Test-Path $File) {
        Copy-Item $File "$BackupDir\$(Split-Path $File -Leaf)" -ErrorAction SilentlyContinue
    }
}

Write-Success "Backup created in $BackupDir"

# Update package.json
Write-Info "Updating package.json..."
try {
    $PackageJsonContent = Get-Content "package.json" -Raw | ConvertFrom-Json
    $PackageJsonContent.name = $ProjectNameKebab
    $PackageJsonContent.description = $NewDescription
    
    if ($NewAuthor) {
        $PackageJsonContent.author = $NewAuthor
    }
    
    if ($NewRepository) {
        $PackageJsonContent | Add-Member -NotePropertyName "repository" -NotePropertyValue @{
            type = "git"
            url = $NewRepository
        } -Force
    }
    
    $PackageJsonContent | ConvertTo-Json -Depth 10 | Set-Content "package.json"
    Write-Success "package.json updated"
} catch {
    Write-Warning "Failed to update package.json: $_"
}

# Update README.md
Write-Info "Updating README.md..."
try {
    $ReadmeContent = Get-Content "README.md" -Raw
    if ($ReadmeContent) {
        $ReadmeContent = $ReadmeContent -replace "# Next\.js Modern Template", "# $NewName"
        $ReadmeContent = $ReadmeContent -replace "MyProject", $NewName
        $ReadmeContent = $ReadmeContent -replace "my-nextjs-project", $ProjectNameKebab
        
        Set-Content "README.md" -Value $ReadmeContent
        Write-Success "README.md updated"
    }
} catch {
    Write-Warning "Failed to update README.md: $_"
}

# Update .env.example
Write-Info "Updating .env.example..."
try {
    $EnvContent = Get-Content ".env.example" -Raw
    if ($EnvContent) {
        $EnvContent = $EnvContent -replace "NEXT_PUBLIC_APP_NAME=.*", "NEXT_PUBLIC_APP_NAME=$NewName"
        $EnvContent = $EnvContent -replace "MyProject", $NewName
        
        Set-Content ".env.example" -Value $EnvContent
        Write-Success ".env.example updated"
    }
} catch {
    Write-Warning "Failed to update .env.example: $_"
}

# Update config file
Write-Info "Updating configuration file..."
try {
    if (Test-Path "src\lib\config.ts") {
        $ConfigContent = Get-Content "src\lib\config.ts" -Raw
        $ConfigContent = $ConfigContent -replace "MyProject", $NewName
        Set-Content "src\lib\config.ts" -Value $ConfigContent
        Write-Success "Configuration file updated"
    }
} catch {
    Write-Warning "Failed to update configuration file: $_"
}

# Update .env.local if it exists
if (Test-Path ".env.local") {
    Write-Info "Updating .env.local..."
    try {
        $EnvLocalContent = Get-Content ".env.local" -Raw
        $EnvLocalContent = $EnvLocalContent -replace "NEXT_PUBLIC_APP_NAME=.*", "NEXT_PUBLIC_APP_NAME=$NewName"
        $EnvLocalContent = $EnvLocalContent -replace "MyProject", $NewName
        Set-Content ".env.local" -Value $EnvLocalContent
        Write-Success ".env.local updated"
    } catch {
        Write-Warning "Failed to update .env.local: $_"
    }
}

# Clean up dependencies
Write-Info "Cleaning up dependencies..."
try {
    if (Test-Path "node_modules") {
        Remove-Item "node_modules" -Recurse -Force
        Write-Success "node_modules removed"
    }
    
    if (Test-Path "package-lock.json") {
        Remove-Item "package-lock.json" -Force
        Write-Success "package-lock.json removed"
    }
} catch {
    Write-Warning "Could not clean up all dependency files: $_"
}

# Reinstall dependencies
Write-Info "Reinstalling dependencies..."
try {
    npm install
    Write-Success "Dependencies reinstalled successfully"
} catch {
    Write-Warning "npm install completed with warnings"
}

# Summary
Write-Success ""
Write-Success "Project rename completed successfully!"
Write-Success "Project name: $NewName"
Write-Success "Description: $NewDescription"
Write-Success "Backup created: $BackupDir"
Write-Success ""
Write-Info "Next steps:"
Write-Info "1. Review the updated files"
Write-Info "2. Update any custom references in your code"
Write-Info "3. Commit your changes to git"
Write-Info "4. Update your deployment configuration if needed"
Write-Success ""
