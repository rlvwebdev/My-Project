# Next.js AI Template - Windows PowerShell Development Scripts
# PowerShell execution policy may need to be set: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Development server with Turbopack
function Start-DevServer {
    Write-Host "🚀 Starting Next.js development server with Turbopack..." -ForegroundColor Green
    npm run dev
}

# Production build
function Build-ProjectTemplate {
    Write-Host "🏗️ Building application for production..." -ForegroundColor Yellow
    npm run build
}

# Start production server
function Start-ProdServer {
    Write-Host "🌟 Starting production server..." -ForegroundColor Blue
    npm start
}

# Run linting
function Test-ProjectLint {
    Write-Host "🔍 Running ESLint..." -ForegroundColor Cyan
    npm run lint
}

# Fix linting issues
function Repair-ProjectLint {
    Write-Host "🔧 Fixing ESLint issues..." -ForegroundColor Magenta
    npm run lint -- --fix
}

# Install dependencies
function Install-Dependencies {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Green
    npm install
}

# Clean install (removes node_modules and reinstalls)
function Reset-Dependencies {
    Write-Host "🧹 Cleaning and reinstalling dependencies..." -ForegroundColor Yellow
    if (Test-Path "node_modules") {
        Remove-Item -Recurse -Force "node_modules"
    }
    if (Test-Path "package-lock.json") {
        Remove-Item -Force "package-lock.json"
    }
    npm install
}

# Type checking
function Test-ProjectTypes {
    Write-Host "🔒 Running TypeScript type checking..." -ForegroundColor Blue
    npx tsc --noEmit
}

# Run tests (when test framework is added)
function Test-ProjectCode {
    Write-Host "🧪 Running tests..." -ForegroundColor Green
    if (Get-Command "npm test" -ErrorAction SilentlyContinue) {
        npm test
    } else {
        Write-Host "⚠️ No test script found. Add testing framework first." -ForegroundColor Yellow
    }
}

# Format code with Prettier (when added)
function Format-ProjectCode {
    Write-Host "💄 Formatting code..." -ForegroundColor Magenta
    if (Get-Command "npx prettier" -ErrorAction SilentlyContinue) {
        npx prettier --write .
    } else {
        Write-Host "⚠️ Prettier not installed. Run: npm install --save-dev prettier" -ForegroundColor Yellow
    }
}

# Git helpers
function New-ProjectBranch {
    param([string]$BranchName)
    if (-not $BranchName) {
        $BranchName = Read-Host "Enter branch name"
    }
    Write-Host "🌿 Creating new branch: $BranchName" -ForegroundColor Green
    git checkout -b $BranchName
}

function Submit-ProjectChanges {
    param([string]$Message)
    if (-not $Message) {
        $Message = Read-Host "Enter commit message"
    }
    Write-Host "💾 Committing changes..." -ForegroundColor Blue
    git add .
    git commit -m $Message
}

# Development environment status
function Get-DevStatus {
    Write-Host "📊 Development Environment Status" -ForegroundColor Cyan
    Write-Host "=================================" -ForegroundColor Cyan
    
    # Node version
    Write-Host "Node.js Version:" -ForegroundColor Yellow
    node --version
    
    # NPM version
    Write-Host "NPM Version:" -ForegroundColor Yellow
    npm --version
    
    # Git status
    Write-Host "Git Status:" -ForegroundColor Yellow
    git status --porcelain
    
    # Current branch
    Write-Host "Current Branch:" -ForegroundColor Yellow
    git branch --show-current
    
    # Package.json scripts
    Write-Host "Available Scripts:" -ForegroundColor Yellow
    if (Test-Path "package.json") {
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        $packageJson.scripts | Format-Table -AutoSize
    }
}

# Quick setup for new development session
function Start-DevSession {
    Write-Host "🎯 Starting development session..." -ForegroundColor Green
    Write-Host "=================================" -ForegroundColor Green
    
    # Check if dependencies are installed
    if (-not (Test-Path "node_modules")) {
        Write-Host "📦 Installing dependencies first..." -ForegroundColor Yellow
        npm install
    }
    
    # Run type checking
    Write-Host "🔒 Checking types..." -ForegroundColor Blue
    npx tsc --noEmit
    
    # Run linting
    Write-Host "🔍 Running linter..." -ForegroundColor Cyan
    npm run lint
    
    # Show git status
    Write-Host "📊 Git status:" -ForegroundColor Yellow
    git status --short
    
    Write-Host "✅ Development session ready!" -ForegroundColor Green
    Write-Host "💡 Run 'Start-DevServer' to begin development" -ForegroundColor Cyan
}

# Environment variables helper
function Set-DevEnvironment {
    Write-Host "🌍 Setting up development environment variables..." -ForegroundColor Green
    
    if (-not (Test-Path ".env.local")) {
        Write-Host "Creating .env.local file..." -ForegroundColor Yellow
        @"
# Development Environment Variables
# Add your environment variables here

# Example:
# NEXT_PUBLIC_API_URL=http://localhost:3001
# DATABASE_URL=your_database_url_here
# NEXTAUTH_SECRET=your_nextauth_secret_here
"@ | Out-File -FilePath ".env.local" -Encoding UTF8
        Write-Host "✅ Created .env.local - Please add your environment variables" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ .env.local already exists" -ForegroundColor Blue
    }
}

# Package management helpers
function Add-Package {
    param(
        [string]$PackageName,
        [switch]$Dev
    )
    
    if (-not $PackageName) {
        $PackageName = Read-Host "Enter package name"
    }
    
    if ($Dev) {
        Write-Host "📦 Installing $PackageName as dev dependency..." -ForegroundColor Yellow
        npm install --save-dev $PackageName
    } else {
        Write-Host "📦 Installing $PackageName..." -ForegroundColor Green
        npm install $PackageName
    }
}

function Remove-Package {
    param([string]$PackageName)
    
    if (-not $PackageName) {
        $PackageName = Read-Host "Enter package name to remove"
    }
    
    Write-Host "🗑️ Removing $PackageName..." -ForegroundColor Red
    npm uninstall $PackageName
}

# Project renaming functionality
function Rename-Project {
    param(
        [Parameter(Mandatory = $true)]
        [string]$NewName,
        
        [Parameter(Mandatory = $false)]
        [string]$NewDescription = "A modern Next.js application",
        
        [Parameter(Mandatory = $false)]
        [string]$NewAuthor = "",
        
        [Parameter(Mandatory = $false)]
        [string]$NewRepository = ""
    )
    
    Write-Host "🚀 Starting project rename process..." -ForegroundColor Green
    Write-Host "This will use the dedicated rename script..." -ForegroundColor Yellow
    
    # Check if rename script exists
    if (Test-Path "scripts\rename-project.ps1") {
        $params = @("-NewName", $NewName, "-NewDescription", $NewDescription)
        
        if ($NewAuthor) {
            $params += @("-NewAuthor", $NewAuthor)
        }
        
        if ($NewRepository) {
            $params += @("-NewRepository", $NewRepository)
        }
        
        & ".\scripts\rename-project.ps1" @params
    } else {
        Write-Host "❌ Rename script not found at scripts\rename-project.ps1" -ForegroundColor Red
        Write-Host "💡 Please ensure the rename script is in the scripts directory" -ForegroundColor Cyan
    }
}
    
    Write-Host "🗑️ Removing $PackageName..." -ForegroundColor Red
    npm uninstall $PackageName
}

# Display available commands
function Show-DevCommands {
    Write-Host "🛠️ Available Development Commands" -ForegroundColor Cyan
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host "Start-DevServer        - Start development server with Turbopack" -ForegroundColor Green
    Write-Host "Build-ProjectTemplate  - Build for production" -ForegroundColor Green
    Write-Host "Start-ProdServer       - Start production server" -ForegroundColor Green
    Write-Host "Test-ProjectLint       - Run ESLint" -ForegroundColor Yellow
    Write-Host "Repair-ProjectLint     - Fix ESLint issues" -ForegroundColor Yellow
    Write-Host "Test-ProjectTypes      - Run TypeScript type checking" -ForegroundColor Yellow
    Write-Host "Test-ProjectCode       - Run tests" -ForegroundColor Yellow
    Write-Host "Format-ProjectCode     - Format code with Prettier" -ForegroundColor Yellow
    Write-Host "Install-Dependencies   - Install npm dependencies" -ForegroundColor Blue
    Write-Host "Reset-Dependencies     - Clean install dependencies" -ForegroundColor Blue
    Write-Host "New-ProjectBranch      - Create new git branch" -ForegroundColor Magenta
    Write-Host "Submit-ProjectChanges  - Add and commit changes" -ForegroundColor Magenta
    Write-Host "Get-DevStatus          - Show development environment status" -ForegroundColor Cyan
    Write-Host "Start-DevSession       - Quick setup for development" -ForegroundColor Cyan
    Write-Host "Set-DevEnvironment     - Setup environment variables" -ForegroundColor Cyan
    Write-Host "Add-Package            - Install npm package" -ForegroundColor Blue
    Write-Host "Remove-Package         - Uninstall npm package" -ForegroundColor Blue
    Write-Host "Show-DevCommands       - Show this help" -ForegroundColor White
}

# Auto-run on script load
Write-Host "🎉 MyProject PowerShell Development Environment Loaded!" -ForegroundColor Green
Write-Host "Run 'Show-DevCommands' to see available commands" -ForegroundColor Cyan
Write-Host "Run 'Start-DevSession' to begin development" -ForegroundColor Yellow
