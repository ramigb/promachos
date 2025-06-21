import chalk from 'chalk';
import inquirer from 'inquirer';
import { ConfigManager } from '../utils/config.js';
import { spawn } from 'child_process';
import os from 'os';

export async function configCommand(key, value, options) {
  const configManager = new ConfigManager();

  // Check if initialized for project-level operations
  const isInitialized = configManager.isInitialized();

  if (options.edit) {
    return await editConfigInEditor(configManager, isInitialized);
  }

  if (!key) {
    return await showAllConfig(configManager);
  }

  if (value === undefined) {
    return await getConfigValue(configManager, key);
  }

  return await setConfigValue(configManager, key, value, isInitialized);
}

/**
 * Show all configuration
 */
async function showAllConfig(configManager) {
  console.log(chalk.blue('⚙️  Promachos Configuration\n'));

  try {
    const config = configManager.getConfig();
    
    console.log(chalk.green('📁 Project Configuration'));
    displayConfigSection(config.project, 'project');
    
    console.log(chalk.green('\n🤖 Behavior Configuration'));
    displayConfigSection(config.behavior, 'behavior');
    
    console.log(chalk.green('\n📤 Output Configuration'));
    displayConfigSection(config.output, 'output');
    
    console.log(chalk.green('\n💻 CLI Configuration'));
    displayConfigSection(config.cli, 'cli');

    console.log(chalk.blue('\n📍 Configuration Sources:'));
    console.log(`   ${chalk.bold('Project:')} ${configManager.projectConfigPath}`);
    console.log(`   ${chalk.bold('User:')} ${configManager.userConfigPath}`);
    
    console.log(chalk.yellow('\n💡 Tips:'));
    console.log('   • promachos config behavior.verbosity detailed');
    console.log('   • promachos config cli.auto_copy_clipboard true');
    console.log('   • promachos config --edit (opens in editor)');

  } catch (error) {
    console.error(chalk.red(`❌ Error loading config: ${error.message}`));
  }
}

/**
 * Display a configuration section
 */
function displayConfigSection(section, sectionName) {
  if (!section || typeof section !== 'object') {
    console.log(`   ${chalk.gray('No configuration available')}`);
    return;
  }

  Object.entries(section).forEach(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      console.log(`   ${chalk.bold(key)}:`);
      Object.entries(value).forEach(([subKey, subValue]) => {
        console.log(`     ${chalk.cyan(subKey)}: ${formatValue(subValue)}`);
      });
    } else {
      console.log(`   ${chalk.cyan(key)}: ${formatValue(value)}`);
    }
  });
}

/**
 * Format configuration value for display
 */
function formatValue(value) {
  if (typeof value === 'boolean') {
    return value ? chalk.green('true') : chalk.red('false');
  }
  if (typeof value === 'string') {
    return chalk.yellow(`"${value}"`);
  }
  if (Array.isArray(value)) {
    return chalk.magenta(`[${value.join(', ')}]`);
  }
  return chalk.white(String(value));
}

/**
 * Get a specific configuration value
 */
async function getConfigValue(configManager, key) {
  try {
    const value = configManager.get(key);
    
    if (value === undefined) {
      console.log(chalk.yellow(`⚠️  Configuration key "${key}" not found`));
      console.log(chalk.gray('Use "promachos config" to see all available keys'));
      return;
    }

    console.log(chalk.green(`✅ ${key}:`), formatValue(value));
    
  } catch (error) {
    console.error(chalk.red(`❌ Error getting config: ${error.message}`));
  }
}

/**
 * Set a configuration value
 */
async function setConfigValue(configManager, key, value, isInitialized) {
  try {
    // Parse value to appropriate type
    const parsedValue = parseConfigValue(value);
    
    // Determine scope
    let scope = 'project';
    if (!isInitialized) {
      console.log(chalk.yellow('⚠️  No project initialized. Setting user-level configuration.'));
      scope = 'user';
    }

    // Ask for confirmation for sensitive settings
    if (await shouldConfirmSetting(key, parsedValue)) {
      const { confirmed } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirmed',
        message: `Set ${key} = ${formatValue(parsedValue)}?`,
        default: true
      }]);
      
      if (!confirmed) {
        console.log(chalk.gray('Cancelled.'));
        return;
      }
    }

    // Set the value
    const success = configManager.set(key, parsedValue, scope);
    
    if (success) {
      console.log(chalk.green(`✅ Set ${key} = ${formatValue(parsedValue)}`));
      console.log(chalk.gray(`Scope: ${scope}`));
    } else {
      console.error(chalk.red('❌ Failed to save configuration'));
    }
    
  } catch (error) {
    console.error(chalk.red(`❌ Error setting config: ${error.message}`));
  }
}

/**
 * Parse string value to appropriate type
 */
function parseConfigValue(value) {
  // Boolean values
  if (value === 'true') return true;
  if (value === 'false') return false;
  
  // Number values
  if (/^\d+$/.test(value)) return parseInt(value, 10);
  if (/^\d+\.\d+$/.test(value)) return parseFloat(value);
  
  // Array values (comma-separated)
  if (value.includes(',')) {
    return value.split(',').map(v => v.trim());
  }
  
  // String values
  return value;
}

/**
 * Check if we should confirm certain settings
 */
async function shouldConfirmSetting(key, value) {
  const sensitiveKeys = [
    'behavior.ask_before_execute',
    'project.type',
    'project.name'
  ];
  
  return sensitiveKeys.includes(key);
}

/**
 * Open configuration in external editor
 */
async function editConfigInEditor(configManager, isInitialized) {
  const configPath = isInitialized ? 
    configManager.projectConfigPath : 
    configManager.userConfigPath;

  // Ensure config file exists
  if (!isInitialized) {
    console.log(chalk.yellow('⚠️  No project initialized. Opening user configuration.'));
    const userConfig = configManager.loadUserConfig();
    if (Object.keys(userConfig).length === 0) {
      // Create default user config
      configManager.saveUserConfig(configManager.getDefaultConfig());
    }
  }

  // Determine editor
  const editor = process.env.EDITOR || 
                 process.env.VISUAL || 
                 (os.platform() === 'win32' ? 'notepad' : 'nano');

  console.log(chalk.blue(`📝 Opening ${configPath} in ${editor}...`));

  try {
    const editorProcess = spawn(editor, [configPath], {
      stdio: 'inherit'
    });

    editorProcess.on('exit', (code) => {
      if (code === 0) {
        console.log(chalk.green('✅ Configuration updated'));
        console.log(chalk.gray('Run "promachos config" to verify changes'));
      } else {
        console.log(chalk.yellow('⚠️  Editor exited with code'), code);
      }
    });

    editorProcess.on('error', (error) => {
      console.error(chalk.red(`❌ Error opening editor: ${error.message}`));
      console.log(chalk.yellow(`💡 Try setting EDITOR environment variable or editing manually:`));
      console.log(chalk.cyan(configPath));
    });

  } catch (error) {
    console.error(chalk.red(`❌ Error: ${error.message}`));
  }
}