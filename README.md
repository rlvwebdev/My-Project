# Next.js Modern Template

A comprehensive, production-ready Next.js starter template built with TypeScript, Tailwind CSS, and optimized for AI-assisted development with GitHub Copilot and Claude AI.

## 🏁 **New Project Setup (Start Here!)**

**👋 Setting up a new project? Follow these 3 simple steps:**

### 1️⃣ Get the Template
```bash
# Option A: Clone this repository
git clone <repository-url> my-new-project
cd my-new-project

# Option B: Use "Use this template" button on GitHub
# Option C: Download ZIP and extract
```

### 2️⃣ Rename Everything Automatically
```bash
# Install dependencies
npm install

# Run the interactive rename script
npm run rename
# Follow prompts to enter your project name, description, etc.

# OR use command line arguments:
# npm run rename -- --name "My App" --description "My description"
```

### 3️⃣ Start Developing
```bash
# Start the development server
npm run dev

# Open http://localhost:3000
# Your renamed project is ready! 🎉
```

**✅ That's it! The rename script updates package.json, README.md, environment files, configurations, and all references automatically.**

---

## 🚀 Features

- **⚡ Next.js 15.4.2** with App Router and Turbopack for lightning-fast development
- **🔷 TypeScript** with strict type checking and comprehensive type definitions
- **🎨 Tailwind CSS 4** with custom design system and dark mode support
- **🧩 Component Library** with pre-built, accessible UI components
- **🛠️ Development Tools** - ESLint, Prettier, Jest testing framework
- **🤖 AI-Optimized** - Structured for seamless GitHub Copilot and Claude AI integration
- **📱 Responsive Design** - Mobile-first approach with modern layouts
- **⚡ Performance Optimized** - Built with production best practices
- **🔧 PowerShell Scripts** - Windows-optimized development commands

## 📦 What's Included

### Core Technologies
- **Next.js 15.4.2** - React framework with App Router
- **React 19.1.0** - Latest React with new features
- **TypeScript 5.x** - Static type checking
- **Tailwind CSS 4** - Utility-first CSS framework

### Development Tools
- **ESLint** - Code linting with Next.js config
- **Prettier** - Code formatting with Tailwind plugin
- **Jest** - Testing framework with React Testing Library
- **Turbopack** - Fast bundler for development

### UI Components
- **Button** - Multiple variants and sizes
- **Input** - Form inputs with validation states
- **LoadingSpinner** - Loading indicators
- **Extensible** - Easy to add more components

### Utilities
- **Class Name Utilities** - `cn()` function for conditional classes
- **Date Formatting** - Internationalization-ready date utils
- **Form Validation** - Email, URL, and custom validators
- **Performance Helpers** - Debounce, throttle, and retry functions

## 🏗️ Project Structure

\`\`\`
├── .github/
│   └── copilot-instructions.md    # GitHub Copilot configuration
├── .vscode/
│   └── tasks.json                 # VS Code tasks for development
├── public/                        # Static assets
├── scripts/
│   └── dev-commands.ps1          # PowerShell development utilities
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── globals.css           # Global styles with design tokens
│   │   ├── layout.tsx            # Root layout component
│   │   └── page.tsx              # Homepage with template showcase
│   ├── components/               # Reusable UI components
│   │   ├── Button/               # Button component with variants
│   │   ├── Input/                # Input component with validation
│   │   ├── LoadingSpinner/       # Loading spinner component
│   │   └── index.ts              # Component exports
│   ├── lib/
│   │   └── config.ts             # App configuration and constants
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   └── utils/
│       └── index.ts              # Utility functions
├── .env.example                  # Environment variables template
├── .gitignore                    # Git ignore rules
├── package.json                  # Dependencies and scripts
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
\`\`\`

## 🚀 Quick Start

### Step 1: Get the Template

Choose one of these methods to start your new project:

#### Option A: Clone this Repository
```bash
# Clone the template
git clone <repository-url> my-new-project
cd my-new-project

# Remove the original git history
rm -rf .git
git init
```

#### Option B: Download as ZIP
1. Click the "Code" button on GitHub
2. Select "Download ZIP"
3. Extract to your desired location
4. Rename the folder to your project name

#### Option C: Use as GitHub Template
1. Click "Use this template" on GitHub
2. Create your new repository
3. Clone your new repository

### Step 2: Rename Your Project

**🎯 This is the most important step!** Use our automated scripts to rename everything:

#### Method 1: Interactive Node.js Script (Recommended)
```bash
# Install dependencies first
npm install

# Run the interactive rename script
npm run rename

# Follow the prompts to enter:
# - Your project name
# - Project description
# - Your name (optional)
# - Repository URL (optional)
```

#### Method 2: Command Line with Arguments
```bash
# Rename with all details in one command
npm run rename -- --name "My Awesome App" --description "An amazing web application" --author "Your Name" --repository "https://github.com/yourusername/your-repo.git"
```

#### Method 3: PowerShell (Windows Users)
```powershell
# Use the PowerShell script
npm run rename:powershell

# Or run directly
.\scripts\rename-project-clean.ps1 -NewName "My Awesome App" -NewDescription "An amazing web application"
```

### Step 3: Set Up Environment Variables

```bash
# The rename script creates .env.local, but you should customize it
# Edit .env.local with your specific values:

NEXT_PUBLIC_APP_NAME="Your App Name"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="https://your-api.com"
# Add other environment variables as needed
```

### Step 4: Start Development

```bash
# Start the development server
npm run dev

# Your app will be available at http://localhost:3000
```

### Step 5: Verify Everything Works

1. **Check the homepage** - Should show your new project name
2. **Verify package.json** - Should have your project details
3. **Test components** - Button, Input, and LoadingSpinner should work
4. **Run quality checks**:
   ```bash
   npm run lint      # Check for code issues
   npm run type-check # Verify TypeScript
   npm run format    # Format code
   ```

### Step 6: Set Up Git and Deploy

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Set up project from Next.js template"

# Add your remote repository
git remote add origin https://github.com/yourusername/your-repo.git

# Push to GitHub
git push -u origin main
```

## 🎯 **Common Next Steps After Setup**

After your project is renamed and running, here's what most developers do next:

### 🏗️ **Customize Your App**
1. **Update the homepage** (`src/app/page.tsx`) with your content
2. **Modify the layout** (`src/app/layout.tsx`) with your branding
3. **Add your own components** to `src/components/`
4. **Update global styles** in `src/app/globals.css`

### ⚙️ **Configure for Your Needs**
1. **Set up authentication** (NextAuth.js, Clerk, etc.)
2. **Add a database** (PostgreSQL, MongoDB, etc.)
3. **Configure external APIs** in environment variables
4. **Set up error tracking** (Sentry, LogRocket, etc.)

### 🚀 **Deploy Your App**
```bash
# Deploy to Vercel (easiest)
npm i -g vercel
vercel

# Or build for other platforms
npm run build
```

### 🛠️ **Development Workflow**
```bash
# Daily development commands
npm run dev          # Start development
npm run lint         # Check code quality
npm run type-check   # Verify TypeScript
npm run test         # Run tests (when added)
```

## 📜 Available Scripts

### Development
- \`npm run dev\` - Start development server with Turbopack
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run dev:clean\` - Clean build cache and restart dev server

### Project Management
- \`npm run rename\` - Rename project with CLI prompts (cross-platform)
- \`npm run rename:powershell\` - Use PowerShell rename script (Windows)

### Code Quality
- \`npm run lint\` - Run ESLint
- \`npm run lint:fix\` - Fix ESLint issues automatically
- \`npm run format\` - Format code with Prettier
- \`npm run format:check\` - Check code formatting
- \`npm run type-check\` - Run TypeScript type checking

### Testing
- \`npm run test\` - Run Jest tests
- \`npm run test:watch\` - Run tests in watch mode
- \`npm run test:coverage\` - Run tests with coverage report

### Analysis
- \`npm run analyze\` - Analyze bundle size

## 🔄 Renaming Your Project

This template includes automated scripts to rename your project and update all references:

### Method 1: Cross-Platform (Node.js)

\`\`\`bash
# Interactive prompts
npm run rename

# Or with arguments
npm run rename -- --name "My Awesome App" --description "My app description"

# With all options
npm run rename -- --name "My Awesome App" --description "My app description" --author "Your Name" --repository "https://github.com/user/repo.git"
\`\`\`

### Method 2: PowerShell (Windows)

\`\`\`powershell
# Using npm script
npm run rename:powershell

# Or directly
.\\scripts\\rename-project.ps1 -NewName "My Awesome App" -NewDescription "My app description"

# With all options
.\\scripts\\rename-project.ps1 -NewName "My Awesome App" -NewDescription "My app description" -NewAuthor "Your Name" -NewRepository "https://github.com/user/repo.git"
\`\`\`

### Method 3: PowerShell Development Commands

\`\`\`powershell
# Load development commands
. .\\scripts\\dev-commands.ps1

# Use the rename function
Rename-Project -NewName "My Awesome App" -NewDescription "My app description"
\`\`\`

### What Gets Updated

The rename scripts automatically update:

- ✅ **package.json** - name, description, author, repository
- ✅ **README.md** - project title and descriptions  
- ✅ **.env.example** - app name environment variable
- ✅ **.env.local** - app name environment variable (if exists)
- ✅ **src/lib/config.ts** - app configuration
- ✅ **src/app/layout.tsx** - page titles (if contains project name)
- ✅ **src/app/page.tsx** - page content (if contains project name)
- ✅ **.github/copilot-instructions.md** - AI instructions
- ✅ **\*.code-workspace** - VS Code workspace files
- ✅ **Git remote URL** - if provided
- ✅ **Clean install of dependencies**

A backup is automatically created before any changes are made.

## 🎯 **Why Use This Template?**

**Perfect for developers who want to:**
- ⚡ **Start coding immediately** - No setup, everything pre-configured
- 🤖 **Work with AI tools** - Optimized for GitHub Copilot and Claude AI  
- 🏗️ **Build production apps** - Enterprise-ready architecture
- 🎨 **Create beautiful UIs** - Modern design system included
- 🧪 **Write quality code** - Testing, linting, formatting built-in
- 🚀 **Deploy anywhere** - Vercel, Netlify, Docker ready

## 🔄 **What Makes Our Rename Different?**

Unlike other templates where you manually find-and-replace project names:

- 🎯 **One command** renames everything consistently
- 🛡️ **Safe operation** with automatic backups
- 🧠 **Smart detection** of where your project name should go
- 🔧 **Format conversion** (kebab-case, camelCase, PascalCase)
- ⚙️ **Dependencies refresh** for clean start
- 📋 **Clear feedback** showing exactly what was updated

**No more hunting through files to update project references!**

## 🔧 PowerShell Development Commands

For Windows developers, source the PowerShell script for enhanced commands:

\`\`\`powershell
# Load development commands
. .\\scripts\\dev-commands.ps1

# Available commands:
Initialize-Project     # Setup project environment
Start-Dev             # Start development server
Check-Quality         # Run all quality checks
New-Component <name>  # Create new component template
Show-Help            # Display all available commands
\`\`\`

## 🎨 Design System

The template includes a comprehensive design system with:

### Color Palette
- **Primary** - Main brand colors
- **Secondary** - Supporting colors
- **Muted** - Subtle text and backgrounds
- **Accent** - Highlight colors
- **Destructive** - Error states

### Component Variants
- **Buttons** - Primary, Secondary, Outline, Ghost, Destructive
- **Inputs** - Default, Error, Success states
- **Sizes** - Small, Medium, Large variants

### Dark Mode
Automatic dark mode support with proper color token switching.

## 🧩 Adding Components

Create new components using the template structure:

\`\`\`bash
# Using PowerShell script
New-Component MyComponent

# Or manually create:
src/components/MyComponent/
├── MyComponent.tsx
└── index.ts
\`\`\`

Example component structure:

\`\`\`tsx
import React from 'react';
import { cn } from '@/utils';

export interface MyComponentProps {
  children: React.ReactNode;
  className?: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('my-component', className)} {...props}>
      {children}
    </div>
  );
};

export default MyComponent;
\`\`\`

## 🤖 AI-Assisted Development

This template is optimized for AI coding assistants:

### GitHub Copilot
- Custom instructions in \`.github/copilot-instructions.md\`
- Consistent code patterns for better suggestions
- TypeScript-first approach for improved context

### Claude AI / VS Code Integration
- Well-structured project organization
- Comprehensive type definitions
- Clear file naming conventions
- Detailed documentation

### Best Practices
- Use descriptive component and function names
- Include TypeScript interfaces for all props
- Add JSDoc comments for complex functions
- Follow consistent file structure patterns

## 🚀 Deployment

### Vercel (Recommended)

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
\`\`\`

### Netlify

\`\`\`bash
# Build command
npm run build

# Publish directory
out/
\`\`\`

### Docker

\`\`\`dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

## 🔒 Environment Variables

Copy \`.env.example\` to \`.env.local\` and configure:

\`\`\`bash
# Application
NEXT_PUBLIC_APP_NAME="Your App Name"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# API Configuration
NEXT_PUBLIC_API_URL="https://api.yourdomain.com"

# Authentication (if using NextAuth.js)
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-secret-key"

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS="true"
\`\`\`

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com) for design system inspiration
- [Vercel](https://vercel.com) for deployment platform

---

**Happy coding! 🚀**
├── jest.config.js                # Jest testing configuration
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```
- **Optimized for AI Development** with comprehensive Copilot instructions
- **Windows PowerShell Integration** with custom development commands

## 🛠️ Prerequisites

- Node.js 18+ 
- npm (comes with Node.js)
- Git
- Windows PowerShell 5.1+
- VS Code with recommended extensions

## 📦 Installation

1. **Clone the repository** (if not already done):
```powershell
git clone <repository-url>
cd miscpay_app
```

2. **Install dependencies**:
```powershell
npm install
```

3. **Set up environment variables**:
```powershell
Copy-Item .env.example .env.local
# Edit .env.local with your actual values
```

4. **Load PowerShell development commands**:
```powershell
. .\scripts\dev-commands.ps1
```

## 🎯 Quick Start

### Using PowerShell Commands (Recommended)

After loading the development commands script:

```powershell
# Start development session (runs checks and shows status)
Start-DevSession

# Start the development server
Start-DevServer

# Show all available commands
Show-DevCommands
```

### Using npm Scripts

```powershell
# Development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Format code
npm run format
```

## 🧰 Development Tools

### PowerShell Commands

The project includes comprehensive PowerShell commands for Windows development:

- `Start-DevServer` - Start development server with Turbopack
- `Build-App` - Build for production
- `Test-Lint` - Run ESLint
- `Fix-Lint` - Fix ESLint issues
- `Test-Types` - Run TypeScript type checking
- `Get-DevStatus` - Show development environment status
- `New-Branch` - Create new Git branch
- `Add-Package` - Install npm packages
- `Start-DevSession` - Quick development setup

### VS Code Integration

The project is optimized for VS Code with:

- Workspace settings for optimal TypeScript and Tailwind experience
- Recommended extensions automatically suggested
- Task definitions for common operations
- PowerShell terminal integration

### AI-Assisted Development

- **Comprehensive Copilot instructions** in `.github/copilot-instructions.md`
- **Granular control** over AI code generation
- **Context-aware suggestions** for Next.js, TypeScript, and Tailwind
- **Best practices enforcement** through AI guidance

## 📁 Project Structure

```
miscpay_app/
├── .github/
│   └── copilot-instructions.md    # AI development guidelines
├── .vscode/
│   └── tasks.json                 # VS Code tasks
├── scripts/
│   └── dev-commands.ps1           # PowerShell development commands
├── src/
│   ├── app/                       # Next.js App Router
│   ├── components/                # Reusable components
│   ├── lib/                       # Utility functions
│   └── types/                     # TypeScript type definitions
├── public/                        # Static assets
├── .env.example                   # Environment variables template
├── .env.local                     # Local environment variables
├── .prettierrc                    # Prettier configuration
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🎨 Styling

This project uses **Tailwind CSS 4** for styling:

- **Utility-first** approach for rapid development
- **Responsive design** with mobile-first breakpoints
- **Custom components** for repeated patterns
- **Dark mode** support ready
- **VS Code IntelliSense** for class suggestions

## 🧪 Testing

Testing framework ready with Jest:

```powershell
# Run tests
npm run test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main

### Other Platforms

The app is built as a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Any Node.js hosting provider

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

- **NEXT_PUBLIC_APP_NAME** - Application name
- **NEXT_PUBLIC_BASE_URL** - Base URL for the application
- **NEXTAUTH_SECRET** - NextAuth.js secret (when auth is added)
- **DATABASE_URL** - Database connection string

### VS Code Settings

The project includes optimized VS Code settings:

- **Format on save** enabled
- **Auto-fix ESLint** on save
- **TypeScript import suggestions** enhanced
- **Tailwind CSS IntelliSense** configured
- **PowerShell** as default terminal

## 🤝 AI Development Guidelines

This project is optimized for AI-assisted development:

### GitHub Copilot
- Custom instructions in `.github/copilot-instructions.md`
- Context-aware code suggestions
- Best practices enforcement
- Component and type generation

### Claude AI Integration
- Comprehensive workspace understanding
- File structure awareness
- PowerShell command integration
- Development workflow optimization

## 📚 Scripts Reference

### Development
- `npm run dev` - Start development server
- `npm run dev:clean` - Clean .next and start dev server

### Build & Deploy
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run analyze` - Analyze bundle size

### Code Quality
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting

### Testing
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

## 🔄 Workflow

### Daily Development

1. **Load development environment**:
   ```powershell
   . .\scripts\dev-commands.ps1
   Start-DevSession
   ```

2. **Start development**:
   ```powershell
   Start-DevServer
   ```

3. **Create feature branch**:
   ```powershell
   New-Branch "feature/new-feature"
   ```

4. **Commit changes**:
   ```powershell
   Commit-Changes "feat: add new feature"
   ```

### Code Quality Checks

Before committing, run:
```powershell
Test-Types    # TypeScript check
Test-Lint     # ESLint check
Format-Code   # Prettier format
```

## 🆘 Troubleshooting

### Common Issues

1. **PowerShell execution policy**:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **Node modules issues**:
   ```powershell
   Reset-Dependencies  # or npm run dev:clean
   ```

3. **TypeScript errors**:
   ```powershell
   Test-Types  # Check for type errors
   ```

4. **Environment variables not loaded**:
   ```powershell
   Set-DevEnvironment  # Recreate .env.local
   ```

## 📖 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)

## 🤖 AI Development

This project is specifically optimized for AI-assisted development. The comprehensive Copilot instructions ensure consistent, high-quality code generation that follows project conventions and best practices.

---

**Happy Coding with AI! 🚀**
