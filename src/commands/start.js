import chalk from 'chalk';
import ora from 'ora';
import clipboardy from 'clipboardy';
import open from 'open';
import { ConfigManager } from '../utils/config.js';
import { buildFramework } from './build.js';

export async function startCommand(options) {
  console.log(chalk.blue('🚀 Starting Promachos session...\n'));

  const configManager = new ConfigManager();

  // Check if initialized
  if (!configManager.isInitialized()) {
    console.log(chalk.red('❌ Promachos is not initialized in this directory.'));
    console.log(chalk.yellow('Run: promachos init'));
    return;
  }

  try {
    const config = configManager.getConfig();
    
    // Show session info
    console.log(chalk.green('📊 Session Info:'));
    console.log(`   ${chalk.bold('Project:')} ${config.project.name}`);
    console.log(`   ${chalk.bold('Type:')} ${config.project.type}`);
    if (config.project.framework) {
      console.log(`   ${chalk.bold('Framework:')} ${config.project.framework}`);
    }

    // Build the framework
    const spinner = ora('Building framework prompt...').start();
    
    const buildOptions = {
      minimal: options.minimal || false,
      output: null // Use default artifacts location
    };

    const result = await buildFramework(buildOptions, true); // true = silent mode
    
    if (!result.success) {
      spinner.fail('Failed to build framework');
      console.error(chalk.red(result.error));
      return;
    }

    spinner.succeed(`Framework built (${result.size.toLocaleString()} chars, ~${result.tokens.toLocaleString()} tokens)`);

    // Prepare the session prompt
    const sessionPrompt = generateSessionPrompt(config, result.content);

    // Handle clipboard copy
    if (options.copy || config.cli.auto_copy_clipboard) {
      try {
        await clipboardy.write(sessionPrompt);
        console.log(chalk.green('📋 Prompt copied to clipboard!'));
      } catch (error) {
        console.log(chalk.yellow('⚠️  Could not copy to clipboard'));
      }
    }

    // Handle browser opening
    if (options.browser || config.cli.auto_open_browser) {
      console.log(chalk.blue('🌐 Opening browser...'));
      try {
        await open('https://chat.openai.com'); // Default to ChatGPT
      } catch (error) {
        console.log(chalk.yellow('⚠️  Could not open browser'));
      }
    }

    // Show usage instructions
    console.log(chalk.cyan('\n💬 Ready to start your AI session!'));
    
    if (!options.copy && !config.cli.auto_copy_clipboard) {
      console.log(chalk.gray('\nPrompt saved to:'), chalk.yellow(result.outputPath));
      console.log(chalk.gray('Copy the content and paste it into your AI assistant.'));
    } else {
      console.log(chalk.gray('The prompt is in your clipboard - just paste it into your AI assistant!'));
    }

    console.log(chalk.blue('\n🎯 Quick Commands:'));
    console.log(`   ${chalk.cyan('promachos status')} - Check progress`);
    console.log(`   ${chalk.cyan('promachos build')} - Rebuild framework`);

    // Show token count warning if large
    if (result.tokens > 8000) {
      console.log(chalk.yellow('\n⚠️  Large prompt detected. Consider using --minimal flag for smaller models.'));
    }

  } catch (error) {
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    process.exit(1);
  }
}

/**
 * Generate the complete session prompt
 */
function generateSessionPrompt(config, frameworkContent) {
  const projectContext = getProjectContext(config);
  
  return `I'm working on a project with the Promachos AI framework. Here's the complete context:

${frameworkContent}

---

## Current Project Context

**Project:** ${config.project.name}
**Type:** ${config.project.type}
${config.project.framework ? `**Framework:** ${config.project.framework}` : ''}

${projectContext}

---

Please acknowledge that you understand the Promachos framework and are ready to help with my ${config.project.type} project "${config.project.name}". 

Start by checking any existing progress in my .promachos/ directory and let me know what we should work on next.`;
}

/**
 * Get additional project context
 */
function getProjectContext(config) {
  let context = '';

  // Add metadata if available
  if (config.project.metadata) {
    const meta = config.project.metadata;
    context += `**Project Size:** ${meta.files?.toLocaleString() || 'Unknown'} files, ${meta.lines?.toLocaleString() || 'Unknown'} lines\n`;
    
    if (meta.languages && meta.languages.length > 0) {
      context += `**Languages:** ${meta.languages.map(l => `${l.language} (${l.percentage}%)`).join(', ')}\n`;
    }
  }

  // Add behavior preferences
  context += `\n**AI Behavior Preferences:**\n`;
  context += `- Verbosity: ${config.behavior.verbosity}\n`;
  context += `- Explain reasoning: ${config.behavior.explain_reasoning ? 'Yes' : 'No'}\n`;
  context += `- Ask before executing: ${config.behavior.ask_before_execute ? 'Yes' : 'No'}\n`;

  return context;
}