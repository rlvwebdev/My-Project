#!/usr/bin/env node

/**
 * Project Rename Script - Cross-platform Node.js version
 * Usage: node scripts/rename-project.js --name "YourProjectName" --description "Your description"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name) => {
  const index = args.findIndex(arg => arg === `--${name}`);
  return index !== -1 && index + 1 < args.length ? args[index + 1] : null;
};

const newName = getArg('name');
const newDescription = getArg('description') || 'A modern Next.js application';
const newAuthor = getArg('author');
const newRepository = getArg('repository');
const showHelp = args.includes('--help') || args.includes('-h');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`)
};

// Show help
if (showHelp) {
  console.log(`
${colors.bright}Next.js Project Rename Tool${colors.reset}

${colors.cyan}Usage:${colors.reset}
  node scripts/rename-project.js --name "ProjectName" [options]

${colors.cyan}Options:${colors.reset}
  --name        ${colors.yellow}(required)${colors.reset} New project name
  --description Project description (default: "A modern Next.js application")
  --author      Author name
  --repository  Git repository URL
  --help, -h    Show this help message

${colors.cyan}Examples:${colors.reset}
  node scripts/rename-project.js --name "My Awesome App"
  
  node scripts/rename-project.js --name "My App" --description "My description" --author "John Doe"
  
  node scripts/rename-project.js --name "My App" --repository "https://github.com/user/repo.git"

${colors.cyan}What gets updated:${colors.reset}
  • package.json (name, description, author, repository)
  • README.md (project title and descriptions)
  • Environment variables (.env.example, .env.local)
  • Configuration files (src/lib/config.ts)
  • App files (layout.tsx, page.tsx if they contain project references)
  • VS Code workspace files
  • GitHub Copilot instructions
  • Git remote (if repository provided)

${colors.yellow}Note:${colors.reset} A backup will be created before making changes.
`);
  process.exit(0);
}

// Validation
if (!newName) {
  log.error('Project name is required. Usage: node scripts/rename-project.js --name "YourProjectName"');
  log.info('Use --help for more information');
  process.exit(1);
}

// Convert name to different formats
const projectNameKebab = newName
  .replace(/\s+/g, '-')
  .replace(/[^a-zA-Z0-9\-]/g, '')
  .toLowerCase();

const projectNameCamel = newName
  .replace(/\s+/g, '')
  .replace(/[^a-zA-Z0-9]/g, '')
  .replace(/^./, str => str.toLowerCase())
  .replace(/[A-Z]/g, letter => letter.toLowerCase());

const projectNamePascal = newName
  .replace(/\s+/g, '')
  .replace(/[^a-zA-Z0-9]/g, '')
  .replace(/^./, str => str.toUpperCase());

console.log('\n🚀 Starting project rename process...');
log.info(`📝 New project name: ${newName}`);
log.info(`🔗 Kebab case: ${projectNameKebab}`);
log.info(`🐪 Camel case: ${projectNameCamel}`);
log.info(`📐 Pascal case: ${projectNamePascal}`);

// Helper functions
const fileExists = (filePath) => {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
};

const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
};

const writeFile = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  } catch {
    return false;
  }
};

const createBackup = () => {
  const backupDir = `backup-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)}`;
  
  try {
    fs.mkdirSync(backupDir, { recursive: true });
    
    const filesToBackup = [
      'package.json',
      'README.md',
      '.env.example',
      'src/lib/config.ts'
    ];
    
    filesToBackup.forEach(file => {
      if (fileExists(file)) {
        const content = readFile(file);
        if (content) {
          const backupFile = path.join(backupDir, path.basename(file));
          writeFile(backupFile, content);
        }
      }
    });
    
    log.success(`Backup created in ${backupDir}`);
    return backupDir;
  } catch (error) {
    log.warning('Could not create backup directory');
    return null;
  }
};

// Create backup
log.info('💾 Creating backup of current configuration...');
const backupDir = createBackup();

// Update package.json
log.info('📦 Updating package.json...');
try {
  const packageJsonContent = readFile('package.json');
  if (packageJsonContent) {
    const packageJson = JSON.parse(packageJsonContent);
    
    packageJson.name = projectNameKebab;
    packageJson.description = newDescription;
    
    if (newAuthor) {
      packageJson.author = newAuthor;
    }
    
    if (newRepository) {
      packageJson.repository = {
        type: 'git',
        url: newRepository
      };
    }
    
    writeFile('package.json', JSON.stringify(packageJson, null, 2));
    log.success('package.json updated');
  }
} catch (error) {
  log.error('Failed to update package.json');
}

// Update README.md
log.info('📖 Updating README.md...');
try {
  let readmeContent = readFile('README.md');
  if (readmeContent) {
    readmeContent = readmeContent
      .replace(/# Next\.js Modern Template/g, `# ${newName}`)
      .replace(/A comprehensive, production-ready Next\.js starter template.*?rapid development\./g, newDescription)
      .replace(/MyProject/g, newName)
      .replace(/my-nextjs-project/g, projectNameKebab);
    
    writeFile('README.md', readmeContent);
    log.success('README.md updated');
  }
} catch (error) {
  log.error('Failed to update README.md');
}

// Update .env.example
log.info('🔧 Updating .env.example...');
try {
  let envContent = readFile('.env.example');
  if (envContent) {
    envContent = envContent
      .replace(/NEXT_PUBLIC_APP_NAME=.*/g, `NEXT_PUBLIC_APP_NAME=${newName}`)
      .replace(/MyProject/g, newName);
    
    writeFile('.env.example', envContent);
    log.success('.env.example updated');
  }
} catch (error) {
  log.error('Failed to update .env.example');
}

// Update src/lib/config.ts
log.info('⚙️ Updating configuration file...');
try {
  let configContent = readFile('src/lib/config.ts');
  if (configContent) {
    configContent = configContent
      .replace(/process\.env\.NEXT_PUBLIC_APP_NAME \|\| 'MyProject'/g, `process.env.NEXT_PUBLIC_APP_NAME || '${newName}'`)
      .replace(/description: 'A modern Next\.js application template'/g, `description: '${newDescription}'`);
    
    writeFile('src/lib/config.ts', configContent);
    log.success('Configuration file updated');
  }
} catch (error) {
  log.error('Failed to update configuration file');
}

// Update app layout and pages
log.info('🎨 Updating app layout and pages...');

// Update layout.tsx
if (fileExists('src/app/layout.tsx')) {
  let layoutContent = readFile('src/app/layout.tsx');
  if (layoutContent && (layoutContent.includes('MyProject') || layoutContent.includes('Next.js Modern Template'))) {
    layoutContent = layoutContent
      .replace(/MyProject/g, newName)
      .replace(/Next\.js Modern Template/g, newName);
    
    writeFile('src/app/layout.tsx', layoutContent);
    log.success('layout.tsx updated');
  }
}

// Update page.tsx
if (fileExists('src/app/page.tsx')) {
  let pageContent = readFile('src/app/page.tsx');
  if (pageContent && pageContent.includes('Next.js')) {
    pageContent = pageContent.replace(/Next\.js.*?Template/g, newName);
    writeFile('src/app/page.tsx', pageContent);
    log.success('page.tsx updated');
  }
}

// Update .env.local if it exists
if (fileExists('.env.local')) {
  log.info('🔐 Updating .env.local...');
  let envLocalContent = readFile('.env.local');
  if (envLocalContent) {
    envLocalContent = envLocalContent
      .replace(/NEXT_PUBLIC_APP_NAME=.*/g, `NEXT_PUBLIC_APP_NAME=${newName}`)
      .replace(/MyProject/g, newName);
    
    writeFile('.env.local', envLocalContent);
    log.success('.env.local updated');
  }
}

// Update workspace files
log.info('🏢 Updating workspace configuration...');
try {
  const workspaceFiles = fs.readdirSync('.').filter(file => file.endsWith('.code-workspace'));
  workspaceFiles.forEach(workspaceFile => {
    let workspaceContent = readFile(workspaceFile);
    if (workspaceContent) {
      workspaceContent = workspaceContent.replace(/MyProject/g, newName);
      writeFile(workspaceFile, workspaceContent);
      log.success(`Workspace file ${workspaceFile} updated`);
    }
  });
} catch (error) {
  log.warning('Could not update workspace files');
}

// Update GitHub Copilot instructions
if (fileExists('.github/copilot-instructions.md')) {
  log.info('🤖 Updating GitHub Copilot instructions...');
  let copilotContent = readFile('.github/copilot-instructions.md');
  if (copilotContent) {
    copilotContent = copilotContent
      .replace(/MyProject/g, newName)
      .replace(/# GitHub Copilot Instructions for MyProject/g, `# GitHub Copilot Instructions for ${newName}`);
    
    writeFile('.github/copilot-instructions.md', copilotContent);
    log.success('GitHub Copilot instructions updated');
  }
}

// Clean up dependencies
log.info('🧹 Cleaning up dependencies...');
try {
  if (fs.existsSync('node_modules')) {
    fs.rmSync('node_modules', { recursive: true, force: true });
    log.success('node_modules removed');
  }
  
  if (fs.existsSync('package-lock.json')) {
    fs.unlinkSync('package-lock.json');
    log.success('package-lock.json removed');
  }
} catch (error) {
  log.warning('Could not clean up all dependency files');
}

// Reinstall dependencies
log.info('📥 Reinstalling dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  log.success('Dependencies reinstalled successfully');
} catch (error) {
  log.warning('npm install completed with warnings');
}

// Update git remote if provided
if (newRepository && fs.existsSync('.git')) {
  log.info('🔗 Updating git remote...');
  try {
    execSync(`git remote set-url origin ${newRepository}`, { stdio: 'inherit' });
    log.success(`Git remote updated to ${newRepository}`);
  } catch (error) {
    log.warning('Could not update git remote');
  }
}

// Summary
console.log('\n🎉 Project rename completed successfully!');
log.success(`📁 Project name: ${newName}`);
log.success(`📝 Description: ${newDescription}`);
if (backupDir) {
  log.success(`🗂️ Backup created: ${backupDir}`);
}

console.log('\nNext steps:');
console.log('1. Review the updated files');
console.log('2. Update any custom references in your code');
console.log('3. Commit your changes to git');
console.log('4. Update your deployment configuration if needed');
console.log('\n');

console.log('To start development server: npm run dev');
console.log('To run quality checks: npm run lint && npm run type-check');
console.log('');
