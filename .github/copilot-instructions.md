# GitHub Copilot Instructions for MyProject

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Next.js frontend application for MyProject, built with TypeScript, Tailwind CSS, and modern React patterns. The project is optimized for AI-assisted development with granular control over how Claude AI and GitHub Copilot interact.

## Code Style & Conventions

### TypeScript
- Use strict TypeScript with explicit types
- Prefer interfaces over types for object definitions
- Use generic types appropriately for reusable components
- Always define return types for functions
- Use proper type guards and assertions

### React & Next.js
- Use functional components with hooks exclusively
- Prefer App Router over Pages Router
- Use server components by default, add 'use client' only when necessary
- Implement proper error boundaries and loading states
- Follow Next.js 15+ best practices for performance optimization

### File Structure
- Place components in `src/components/` with index.ts exports
- Use feature-based organization: `src/features/[feature-name]/`
- Place utilities in `src/lib/` or `src/utils/`
- Type definitions go in `src/types/`
- API routes in `src/app/api/`

### Naming Conventions
- Use PascalCase for components and interfaces
- Use camelCase for functions, variables, and properties
- Use kebab-case for file names and directories
- Use SCREAMING_SNAKE_CASE for constants
- Prefix custom hooks with 'use'

### Styling
- Use Tailwind CSS classes primarily
- Create custom components for repeated patterns
- Use CSS modules for complex custom styles
- Implement responsive design mobile-first
- Follow accessibility best practices (WCAG 2.1)

## AI Interaction Guidelines

### When Suggesting Code
1. Always provide complete, runnable code snippets
2. Include proper imports and exports
3. Add TypeScript types for all props and return values
4. Include basic error handling where appropriate
5. Add comments for complex logic or business rules

### Component Creation
- Generate components with proper TypeScript interfaces
- Include default props and prop validation
- Implement proper loading and error states
- Add accessibility attributes (aria-labels, roles, etc.)
- Include basic unit test structure when requested

### API Integration
- Use fetch with proper error handling
- Implement loading states and error boundaries
- Use proper TypeScript types for API responses
- Include retry logic for failed requests
- Follow REST/GraphQL conventions consistently

### State Management
- Prefer built-in React state (useState, useReducer) for local state
- Suggest external state management (Zustand, Redux) only for complex global state
- Use React Query/TanStack Query for server state management
- Implement optimistic updates where appropriate

### Performance Optimization
- Suggest React.memo for expensive components
- Use useMemo and useCallback judiciously
- Implement proper code splitting with dynamic imports
- Optimize images with Next.js Image component
- Use streaming and Suspense for better UX

## Development Workflow

### Git Conventions
- Use conventional commits (feat:, fix:, docs:, style:, refactor:, test:, chore:)
- Create feature branches from main
- Include issue numbers in commit messages
- Write clear, descriptive commit messages

### Testing Strategy
- Write unit tests for utility functions
- Create integration tests for API routes
- Use React Testing Library for component tests
- Implement E2E tests with Playwright for critical paths
- Maintain >80% code coverage for business logic

### Code Quality
- Run ESLint and fix all warnings before committing
- Use Prettier for consistent formatting
- Implement pre-commit hooks with Husky
- Use TypeScript strict mode
- Regular dependency updates and security audits

## Windows PowerShell Specific
- Use PowerShell-compatible commands when suggesting terminal operations
- Prefer `npm` over other package managers for consistency
- Use proper Windows path separators in scripts
- Consider Windows-specific environment variables
- Test cross-platform compatibility for path operations

## Security Considerations
- Never hardcode sensitive data or API keys
- Use environment variables for configuration
- Implement proper input validation and sanitization
- Follow OWASP security guidelines
- Use HTTPS and secure headers

## Deployment & DevOps
- Optimize for Vercel deployment (primary platform)
- Include proper build scripts and environment setup
- Implement proper logging and monitoring
- Use proper caching strategies
- Follow 12-factor app principles

## Claude AI Integration Notes
- When working with Claude, break down complex tasks into smaller, manageable chunks
- Provide clear context about the current working directory and file structure
- Use semantic search and file reading tools effectively
- Leverage terminal commands for setup and package management
- Always test generated code before finalizing changes

---

**Last Updated:** July 2025
**Project Version:** 1.0.0
**Next.js Version:** 15.4.2
