#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { initCommand } from '../src/commands/init.js';
import { startCommand } from '../src/commands/start.js';
import { buildCommand } from '../src/commands/build.js';
import { statusCommand } from '../src/commands/status.js';
import { configCommand } from '../src/commands/config.js';

console.log(chalk.cyan(`
╔═══════════════════════════════════════╗
║        PROMACHOS CLI v1.0.0           ║
║    AI-Powered Project Framework       ║
╚═══════════════════════════════════════╝
`));

program
  .name('promachos')
  .description('AI-powered project management framework for LLMs')
  .version('1.0.0');

// Init command
program
  .command('init')
  .description('Initialize Promachos in current directory')
  .option('-a, --auto', 'Auto-detect project settings')
  .option('-t, --type <type>', 'Project type (react, node, python, etc.)')
  .option('-f, --force', 'Overwrite existing configuration')
  .action(initCommand);

// Start command
program
  .command('start')
  .description('Start a new Promachos session')
  .option('-c, --copy', 'Copy prompt to clipboard')
  .option('-b, --browser', 'Open in browser')
  .option('-m, --minimal', 'Use minimal mode (no markdown)')
  .action(startCommand);

// Build command
program
  .command('build')
  .description('Build the framework prompt')
  .option('-o, --output <path>', 'Output file path')
  .option('-m, --minimal', 'Minimal build without markdown')
  .action(buildCommand);

// Status command
program
  .command('status')
  .description('Show project status and progress')
  .option('-j, --json', 'Output as JSON')
  .option('-v, --verbose', 'Verbose output')
  .action(statusCommand);

// Config command
program
  .command('config')
  .description('Manage configuration')
  .argument('[key]', 'Configuration key to get/set')
  .argument('[value]', 'Value to set (if provided)')
  .option('-e, --edit', 'Open config in editor')
  .action(configCommand);

// Global error handler
program.on('command:*', () => {
  console.error(chalk.red(`Invalid command: ${program.args.join(' ')}`));
  console.log(chalk.yellow('Use --help to see available commands'));
  process.exit(1);
});

program.parse();