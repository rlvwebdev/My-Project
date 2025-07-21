# My Project - Enterprise-Grade Next.js Development Template

A comprehensive, production-ready Next.js starter template meticulously crafted for modern web development. Built with TypeScript, Tailwind CSS 4, and specifically optimized for AI-assisted development workflows using GitHub Copilot and Claude AI. This template serves as the foundation for scalable, maintainable, and high-performance web applications with a complete development ecosystem.

## �️ Template Architecture & Composition

### Core Framework Stack

**Next.js 15.4.2 with App Router**
- Server-side rendering (SSR) and static site generation (SSG)
- React 19.1.0 with latest concurrent features
- Turbopack for lightning-fast development builds
- Built-in performance optimizations and code splitting
- Edge runtime support for global deployment

**TypeScript 5.x with Strict Configuration**
- Complete type safety across the entire application
- Advanced type inference and error detection
- Strict null checks and comprehensive type definitions
- Interface-first development approach
- Generic components for maximum reusability

**Tailwind CSS 4 Design System**
- Utility-first CSS framework with custom design tokens
- Responsive design patterns with mobile-first approach
- Custom component variants and utility classes
- Dark mode support with CSS variables
- Performance optimized with JIT compilation

### Development Ecosystem

**Code Quality & Formatting**
- ESLint with Next.js, React, and TypeScript configurations
- Prettier with Tailwind CSS plugin for consistent formatting
- Pre-commit hooks with Husky for automated quality checks
- TypeScript strict mode with comprehensive error reporting
- Import sorting and unused import detection

**Testing Infrastructure**
- Jest testing framework with React Testing Library
- Component testing patterns and utilities
- Snapshot testing for UI consistency
- Code coverage reporting and thresholds
- Mock patterns for external dependencies

**Development Tooling**
- VS Code workspace with optimized settings
- PowerShell development scripts for Windows environments
- Automated project renaming and configuration
- Live reload with hot module replacement
- Bundle analysis and performance monitoring

### AI-Assisted Development Framework

**GitHub Copilot Integration**
- Comprehensive instruction set in `.github/copilot-instructions.md`
- Context-aware code generation patterns
- Component and type generation templates
- Best practices enforcement through AI guidance
- Workflow optimization suggestions

**Claude AI Compatibility**
- Structured project organization for semantic understanding
- Detailed documentation and code comments
- Clear naming conventions and file structure
- Comprehensive type definitions for context awareness
- Modular architecture for focused AI assistance

## 📦 Component Library Architecture

### Base Component System

Our component library follows a systematic approach to UI development:

**Component Structure Pattern**
```
src/components/[ComponentName]/
├── index.ts              # Clean exports
├── [ComponentName].tsx   # Main component implementation
├── types.ts              # Component-specific types (if complex)
└── styles.css           # Component-specific styles (if needed)
```

**Implemented Components**

1. **Button Component** (`src/components/Button/`)
   - Multiple variants: primary, secondary, outline, ghost, destructive
   - Size variations: small, medium, large
   - Loading states and disabled states
   - Icon support and flexible content
   - Full accessibility with ARIA attributes

2. **Input Component** (`src/components/Input/`)
   - Text, email, password, number input types
   - Validation states: default, error, success
   - Label and helper text integration
   - Controlled and uncontrolled patterns
   - Form integration with proper error handling

3. **Card Component** (`src/components/Card/`)
   - Flexible container with header, body, footer sections
   - Shadow and border variants
   - Responsive behavior patterns
   - Content composition flexibility

4. **Navigation Component** (`src/components/Navigation/`)
   - Responsive navigation patterns
   - Mobile-first hamburger menu
   - Active state management
   - Dropdown and nested navigation support

5. **Layout Component** (`src/components/Layout/`)
   - Page layout containers and wrappers
   - Responsive grid systems
   - Sidebar and main content areas
   - Header and footer integration

6. **Form Component** (`src/components/Form/`)
   - Form wrapper with validation context
   - Field groups and form sections
   - Error handling and display patterns
   - Submit and reset functionality

7. **Typography Component** (`src/components/Typography/`)
   - Heading hierarchy (H1-H6)
   - Paragraph and text utilities
   - Text styling and emphasis
   - Responsive typography scaling

8. **Table Component** (`src/components/Table/`)
   - Responsive table layouts
   - Sorting and filtering capabilities
   - Pagination integration patterns
   - Data formatting utilities

9. **LoadingSpinner Component** (`src/components/LoadingSpinner/`)
   - Multiple loading animation styles
   - Size and color variations
   - Overlay and inline patterns
   - Accessible loading states

10. **Additional Utility Components**
    - **Accordion**: Collapsible content sections
    - **Carousel**: Image and content sliders
    - **Dropdown**: Menu and selection components
    - **SearchBar**: Search input with suggestions
    - **Tabs**: Tabbed interface patterns
    - **Lists**: Ordered and unordered list styles
    - **Display**: Content display utilities

### Component Development Workflow

**Creating New Components**
1. Use the PowerShell `New-Component` function for template generation
2. Follow the established naming conventions (PascalCase)
3. Implement TypeScript interfaces for all props
4. Include accessibility attributes and ARIA labels
5. Add responsive design considerations
6. Export through the component index file

**Component Testing Strategy**
- Unit tests for component logic and rendering
- Integration tests for form interactions
- Visual regression testing for UI consistency
- Accessibility testing with automated tools
- Performance testing for large component trees

## 🔄 Development Workflow & Methodologies

### Git Workflow & Branch Strategy

**Branch Naming Conventions**
- `feature/description` - New features and enhancements
- `fix/issue-description` - Bug fixes and corrections
- `refactor/area` - Code refactoring and improvements
- `docs/section` - Documentation updates
- `chore/task` - Maintenance and tooling updates

**Commit Message Standards**
Following Conventional Commits specification:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Formatting and style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### PowerShell Development Environment

**Core Development Commands**
```powershell
# Environment setup and initialization
Start-DevSession          # Complete development environment setup
Initialize-Project        # First-time project initialization
Set-DevEnvironment       # Configure environment variables

# Development server management
Start-DevServer          # Launch Next.js development server
Stop-DevServer           # Gracefully stop development server
Restart-DevServer        # Clean restart with cache clearing

# Code quality and testing
Test-CodeQuality         # Run all quality checks (lint, type, format)
Fix-CodeIssues          # Automatically fix linting and formatting
Test-Types              # TypeScript type checking
Run-Tests               # Execute Jest test suite

# Project management
New-Component           # Generate new component template
Add-Package             # Install npm packages with dependency updates
Clean-Project           # Clean build artifacts and node_modules
Reset-Dependencies      # Fresh dependency installation

# Git workflow integration
New-Branch              # Create and switch to new feature branch
Commit-Changes          # Staged commit with conventional format
Push-Feature            # Push feature branch to remote
Create-PullRequest      # Open GitHub PR from current branch
```

**Development Session Flow**
1. **Initialize**: `Start-DevSession` - Sets up complete environment
2. **Develop**: `Start-DevServer` - Begin development with hot reload
3. **Quality**: `Test-CodeQuality` - Continuous quality checking
4. **Test**: `Run-Tests` - Execute test suite during development
5. **Commit**: `Commit-Changes` - Structured commit process
6. **Deploy**: Integration with CI/CD pipeline

### AI-Assisted Development Patterns

**GitHub Copilot Workflow**
- Context-aware code suggestions based on component patterns
- Automatic TypeScript interface generation
- Form validation and error handling patterns
- Responsive design utility class suggestions
- Test case generation for components

**Claude AI Integration**
- Comprehensive project understanding through semantic search
- File structure navigation and modification
- Bulk refactoring and pattern updates
- Documentation generation and maintenance
- Architecture decision support

### Code Organization Philosophy

**Feature-Based Architecture**
```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── features/           # Feature-specific code (future expansion)
├── lib/                # Utility functions and configurations
├── types/              # Global TypeScript definitions
└── utils/              # Helper functions and utilities
```

**Separation of Concerns**
- **Presentation**: Components handle UI rendering and user interaction
- **Logic**: Custom hooks manage state and business logic
- **Data**: API layers handle external data communication
- **Styling**: Tailwind classes with component-specific overrides
- **Types**: Comprehensive TypeScript definitions for type safety

### Performance Optimization Strategy

**Bundle Optimization**
- Dynamic imports for code splitting
- Tree shaking for unused code elimination
- Image optimization with Next.js Image component
- Font optimization with next/font
- CSS optimization with Tailwind JIT compilation

**Runtime Performance**
- React.memo for expensive component re-renders
- useMemo and useCallback for computation optimization
- Virtualization for large lists and tables
- Lazy loading for below-the-fold content
- Service worker integration for offline capabilities

### Testing Strategy & Quality Assurance

**Multi-Level Testing Approach**
1. **Unit Testing**: Individual component and function testing
2. **Integration Testing**: Component interaction and API integration
3. **End-to-End Testing**: Complete user workflow validation
4. **Visual Regression Testing**: UI consistency across changes
5. **Performance Testing**: Load and stress testing capabilities

**Automated Quality Gates**
- Pre-commit hooks for code quality enforcement
- Continuous integration with automated testing
- Code coverage thresholds and reporting
- Dependency vulnerability scanning
- Performance budget monitoring

## 🎯 Project Setup & Onboarding

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** (LTS recommended)
- **npm** (comes with Node.js)
- **Git** for version control
- **Windows PowerShell 5.1+** (for Windows users)
- **VS Code** with recommended extensions

### Step 1: Clone and Setup

```bash
# Clone the repository
git clone https://github.com/rlvwebdev/My-Project.git
cd My-Project

# Install dependencies
npm install

# Copy environment variables template
cp .env.example .env.local
```

### Step 2: Configure Environment

Edit `.env.local` with your project-specific values:

```env
NEXT_PUBLIC_APP_NAME="My Project"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="https://api.example.com"
```

### Step 3: Start Development

```bash
# Start the development server
npm run dev

# Alternative: Use PowerShell commands (Windows)
# Load development commands
. .\scripts\dev-commands.ps1
Start-DevSession
```

Your application will be available at `http://localhost:3000`

### Step 4: Verify Installation

Run the following commands to ensure everything is working correctly:

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Code formatting
npm run format:check

# Run tests
npm run test
```

## 📜 Available npm Scripts

### Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run dev:clean` - Clean cache and restart development

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

### Testing

- `npm run test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report

### Analysis & Optimization

- `npm run analyze` - Analyze bundle size and composition
- `npm run build:analyze` - Build with bundle analysis

## 🎨 Design System & Theming

### Color Palette

Our design system includes a comprehensive color palette:

- **Primary Colors**: Main brand identity colors
- **Secondary Colors**: Supporting accent colors
- **Neutral Colors**: Text and background variations
- **Semantic Colors**: Success, warning, error, and info states
- **Dark Mode**: Complete dark theme support

### Typography Scale

- **Headings**: H1-H6 with responsive scaling
- **Body Text**: Multiple sizes for different contexts
- **Caption Text**: Small text for metadata and captions
- **Code Text**: Monospace fonts for code snippets

### Component Variants

Each component includes multiple variants:

- **Buttons**: Primary, secondary, outline, ghost, destructive
- **Inputs**: Default, success, warning, error states
- **Cards**: Default, elevated, outlined variations
- **Typography**: Various weights and sizes

### Responsive Design

All components are built with mobile-first responsive design:

- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Flexible Layouts**: CSS Grid and Flexbox patterns
- **Touch-Friendly**: Appropriate touch targets for mobile devices

## 🧪 Testing Strategy

### Testing Philosophy

Our testing approach follows the testing trophy methodology:

1. **Static Testing**: TypeScript, ESLint, Prettier
2. **Unit Testing**: Individual components and utilities
3. **Integration Testing**: Component interactions
4. **End-to-End Testing**: Complete user workflows (when implemented)

### Testing Utilities

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **MSW**: API mocking for integration tests
- **Testing Utilities**: Custom render functions and mocks

### Writing Tests

Example test structure for components:

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## 🚀 Deployment Options

### Vercel (Recommended)

Deploy to Vercel with zero configuration:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Other Platforms

The application can be deployed to various platforms:

**Netlify**
```bash
# Build command
npm run build

# Publish directory
out/
```

**Docker**
```dockerfile
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
```

### Environment Configuration

For production deployments, configure these environment variables:

- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_APP_URL` - Production URL
- `NEXT_PUBLIC_API_URL` - API endpoint URL
- `DATABASE_URL` - Database connection string (if using database)
- `NEXTAUTH_SECRET` - NextAuth.js secret (if using authentication)

## 🔧 Advanced Configuration

### Custom Tailwind Configuration

Extend the Tailwind configuration in `tailwind.config.ts`:

```typescript
// Add custom colors
colors: {
  brand: {
    50: '#f0f9ff',
    500: '#3b82f6',
    900: '#1e3a8a',
  },
}

// Add custom spacing
spacing: {
  '18': '4.5rem',
  '88': '22rem',
}

// Add custom breakpoints
screens: {
  '3xl': '1600px',
}
```

### TypeScript Configuration

The project uses strict TypeScript configuration. Key settings:

- `strict: true` - Enable all strict type checking options
- `noUncheckedIndexedAccess: true` - Prevent index access errors
- `exactOptionalPropertyTypes: true` - Strict optional property handling
- `noImplicitReturns: true` - Require explicit return statements

### ESLint Configuration

Custom ESLint rules are configured in `eslint.config.mjs`:

- Next.js recommended rules
- React hooks rules
- TypeScript recommended rules
- Import/export order rules
- Accessibility rules

## 🤝 Contributing Guidelines

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our coding standards
4. Write tests for new functionality
5. Run quality checks: `npm run lint && npm run type-check && npm run test`
6. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
7. Push to your branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Code Standards

- Follow TypeScript strict mode guidelines
- Write comprehensive tests for new components
- Include JSDoc comments for complex functions
- Follow the established component structure patterns
- Ensure accessibility compliance (WCAG 2.1)

### Pull Request Process

1. Update documentation for any new features
2. Ensure all tests pass and coverage is maintained
3. Update the README if needed
4. Request review from maintainers
5. Address feedback and iterate as needed

## 📚 Learning Resources

### Framework Documentation

- [Next.js Documentation](https://nextjs.org/docs) - Framework features and API
- [React Documentation](https://react.dev) - React concepts and patterns
- [TypeScript Handbook](https://www.typescriptlang.org/docs) - Type system and advanced features
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility classes and customization

### Best Practices

- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application/optimizing)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [TypeScript Best Practices](https://typescript-eslint.io/docs/linting/typed-linting/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🆘 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 3000
npx kill-port 3000

# Use different port
npm run dev -- -p 3001
```

**Module resolution errors**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
# Run type checking
npm run type-check

# Restart TypeScript server in VS Code
Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

**PowerShell execution policy (Windows)**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Getting Help

- Check the [GitHub Issues](https://github.com/rlvwebdev/My-Project/issues) for known problems
- Create a new issue with detailed reproduction steps
- Join our community discussions for questions and support
- Review the comprehensive documentation in this README

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org) - Amazing React framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [TypeScript Team](https://www.typescriptlang.org) - Type-safe JavaScript
- [Vercel](https://vercel.com) - Deployment and hosting platform
- [GitHub](https://github.com) - Code hosting and collaboration

---

## 📊 Project Statistics

- **Components**: 15+ pre-built UI components
- **Type Safety**: 100% TypeScript coverage
- **Testing**: Jest and React Testing Library setup
- **Code Quality**: ESLint + Prettier + Husky
- **Performance**: Optimized for Core Web Vitals
- **Accessibility**: WCAG 2.1 compliance ready
- **Development**: PowerShell scripts for Windows optimization

**Built with ❤️ for modern web development**

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
