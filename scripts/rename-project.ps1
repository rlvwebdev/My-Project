# Project Rename Script
# Usage: .\scripts\rename-project.ps1 -NewName "YourProjectName" -NewDescription "Your project description"

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
    Write-Host "  .\scripts\rename-project.ps1 -NewName `"ProjectName`" [options]"
    Write-Host ""
    Write-Info "Parameters:"
    Write-Host "  -NewName        " -NoNewline; Write-Warning "(required) "; Write-Host "New project name"
    Write-Host "  -NewDescription Project description (default: `"A modern Next.js application`")"
    Write-Host "  -NewAuthor      Author name"
    Write-Host "  -NewRepository  Git repository URL"
    Write-Host "  -Help           Show this help message"
    Write-Host ""
    Write-Info "Examples:"
    Write-Host "  .\scripts\rename-project.ps1 -NewName `"My Awesome App`""
    Write-Host ""
    Write-Host "  .\scripts\rename-project.ps1 -NewName `"My App`" -NewDescription `"My description`" -NewAuthor `"John Doe`""
    Write-Host ""
    Write-Host "  .\scripts\rename-project.ps1 -NewName `"My App`" -NewRepository `"https://github.com/user/repo.git`""
    Write-Host ""
    Write-Info "What gets updated:"
    Write-Host "  • package.json (name, description, author, repository)"
    Write-Host "  • README.md (project title and descriptions)"
    Write-Host "  • Environment variables (.env.example, .env.local)"
    Write-Host "  • Configuration files (src/lib/config.ts)"
    Write-Host "  • App files (layout.tsx, page.tsx if they contain project references)"
    Write-Host "  • VS Code workspace files"
    Write-Host "  • GitHub Copilot instructions"
    Write-Host "  • Git remote (if repository provided)"
    Write-Host ""
    Write-Warning "Note: A backup will be created before making changes."
    Write-Host ""
    exit 0
}

# Validate input
if ([string]::IsNullOrWhiteSpace($NewName)) {
    Write-Error "❌ Project name cannot be empty"
    Write-Info "💡 Use -Help for usage information"
    exit 1
}

# Convert name to different formats
$ProjectNameKebab = $NewName -replace '\s+', '-' -replace '[^a-zA-Z0-9\-]', '' | ForEach-Object { $_.ToLower() }
$ProjectNameCamel = ($NewName -replace '\s+', '' -replace '[^a-zA-Z0-9]', '') -replace '(.)([A-Z])', '$1$2'
$ProjectNamePascal = (Get-Culture).TextInfo.ToTitleCase($NewName) -replace '\s+', '' -replace '[^a-zA-Z0-9]', ''

Write-Info "🚀 Starting project rename process..."
Write-Info "📝 New project name: $NewName"
Write-Info "🔗 Kebab case: $ProjectNameKebab"
Write-Info "🐪 Camel case: $ProjectNameCamel"
Write-Info "📐 Pascal case: $ProjectNamePascal"

# Backup current files
Write-Info "💾 Creating backup of current configuration..."
$BackupDir = "backup-$(Get-Date -Format 'yyyyMMdd-HHmmss')"
New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null

Copy-Item "package.json" "$BackupDir\package.json" -ErrorAction SilentlyContinue
Copy-Item "README.md" "$BackupDir\README.md" -ErrorAction SilentlyContinue
Copy-Item ".env.example" "$BackupDir\.env.example" -ErrorAction SilentlyContinue
Copy-Item "src\lib\config.ts" "$BackupDir\config.ts" -ErrorAction SilentlyContinue

Write-Success "✅ Backup created in $BackupDir"

# Update package.json
Write-Info "📦 Updating package.json..."
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json

$packageJson.name = $ProjectNameKebab
$packageJson.description = $NewDescription

if ($NewAuthor) {
    $packageJson.author = $NewAuthor
}

if ($NewRepository) {
    if (-not $packageJson.repository) {
        $packageJson | Add-Member -NotePropertyName "repository" -NotePropertyValue @{}
    }
    $packageJson.repository = @{
        type = "git"
        url = $NewRepository
    }
}

$packageJson | ConvertTo-Json -Depth 10 | Set-Content "package.json"
Write-Success "✅ package.json updated"

# Update README.md
Write-Info "📖 Updating README.md..."
$readmeContent = Get-Content "README.md" -Raw

# Replace project name and description
$readmeContent = $readmeContent -replace "# Next\.js Modern Template", "# $NewName"
$readmeContent = $readmeContent -replace "A comprehensive, production-ready Next\.js starter template.*?rapid development\.", $NewDescription

# Update any remaining references
$readmeContent = $readmeContent -replace "MyProject", $NewName
$readmeContent = $readmeContent -replace "my-nextjs-project", $ProjectNameKebab

Set-Content "README.md" -Value $readmeContent
Write-Success "✅ README.md updated"

# Update .env.example
Write-Info "🔧 Updating .env.example..."
$envContent = Get-Content ".env.example" -Raw

$envContent = $envContent -replace "NEXT_PUBLIC_APP_NAME=.*", "NEXT_PUBLIC_APP_NAME=$NewName"
$envContent = $envContent -replace "MyProject", $NewName

Set-Content ".env.example" -Value $envContent
Write-Success "✅ .env.example updated"

# Update src/lib/config.ts
Write-Info "⚙️ Updating configuration file..."
$configContent = Get-Content "src\lib\config.ts" -Raw

$configContent = $configContent -replace "process\.env\.NEXT_PUBLIC_APP_NAME \|\| 'MyProject'", "process.env.NEXT_PUBLIC_APP_NAME || '$NewName'"
$configContent = $configContent -replace "description: 'A modern Next\.js application template'", "description: '$NewDescription'"

Set-Content "src\lib\config.ts" -Value $configContent
Write-Success "✅ Configuration file updated"

# Update app layout and page if they contain hardcoded references
Write-Info "🎨 Updating app layout and pages..."

# Check and update layout.tsx
if (Test-Path "src\app\layout.tsx") {
    $layoutContent = Get-Content "src\app\layout.tsx" -Raw
    if ($layoutContent -match "MyProject|Next\.js Modern Template") {
        $layoutContent = $layoutContent -replace "MyProject", $NewName
        $layoutContent = $layoutContent -replace "Next\.js Modern Template", $NewName
        Set-Content "src\app\layout.tsx" -Value $layoutContent
        Write-Success "✅ layout.tsx updated"
    }
}

# Check and update page.tsx
if (Test-Path "src\app\page.tsx") {
    $pageContent = Get-Content "src\app\page.tsx" -Raw
    if ($pageContent -match "Next\.js.*Template") {
        $pageContent = $pageContent -replace "Next\.js.*?Template", $NewName
        Set-Content "src\app\page.tsx" -Value $pageContent
        Write-Success "✅ page.tsx updated"
    }
}

# Update .env.local if it exists
if (Test-Path ".env.local") {
    Write-Info "🔐 Updating .env.local..."
    $envLocalContent = Get-Content ".env.local" -Raw
    $envLocalContent = $envLocalContent -replace "NEXT_PUBLIC_APP_NAME=.*", "NEXT_PUBLIC_APP_NAME=$NewName"
    $envLocalContent = $envLocalContent -replace "MyProject", $NewName
    Set-Content ".env.local" -Value $envLocalContent
    Write-Success "✅ .env.local updated"
}

# Update workspace files
Write-Info "🏢 Updating workspace configuration..."
Get-ChildItem -Path "." -Name "*.code-workspace" | ForEach-Object {
    $workspaceFile = $_
    $workspaceContent = Get-Content $workspaceFile -Raw
    $workspaceContent = $workspaceContent -replace "MyProject", $NewName
    Set-Content $workspaceFile -Value $workspaceContent
    Write-Success "✅ Workspace file $workspaceFile updated"
}

# Update GitHub Copilot instructions
if (Test-Path ".github\copilot-instructions.md") {
    Write-Info "🤖 Updating GitHub Copilot instructions..."
    $copilotContent = Get-Content ".github\copilot-instructions.md" -Raw
    $copilotContent = $copilotContent -replace "MyProject", $NewName
    $copilotContent = $copilotContent -replace "# GitHub Copilot Instructions for MyProject", "# GitHub Copilot Instructions for $NewName"
    Set-Content ".github\copilot-instructions.md" -Value $copilotContent
    Write-Success "✅ GitHub Copilot instructions updated"
}

# Clean up node_modules and package-lock.json to ensure fresh install
Write-Info "🧹 Cleaning up dependencies..."
if (Test-Path "node_modules") {
    Remove-Item "node_modules" -Recurse -Force
    Write-Success "✅ node_modules removed"
}

if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json" -Force
    Write-Success "✅ package-lock.json removed"
}

# Reinstall dependencies
Write-Info "📥 Reinstalling dependencies..."
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Success "✅ Dependencies reinstalled successfully"
} else {
    Write-Warning "⚠️ Warning: npm install completed with warnings"
}

# Update git remote if new repository is provided
if ($NewRepository -and (Test-Path ".git")) {
    Write-Info "🔗 Updating git remote..."
    git remote set-url origin $NewRepository
    Write-Success "✅ Git remote updated to $NewRepository"
}

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

# Offer to start development server
$startDev = Read-Host "Would you like to start the development server? (y/n)"
if ($startDev -eq "y" -or $startDev -eq "Y") {
    Write-Info "Starting development server..."
    npm run dev
}
