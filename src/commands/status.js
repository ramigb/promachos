import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { ConfigManager } from '../utils/config.js';

export async function statusCommand(options) {
  const configManager = new ConfigManager();

  // Check if initialized
  if (!configManager.isInitialized()) {
    console.log(chalk.red('❌ Promachos is not initialized in this directory.'));
    console.log(chalk.yellow('Run: promachos init'));
    return;
  }

  try {
    const config = configManager.getConfig();
    const promachosDir = path.join(configManager.projectPath, '.promachos');
    
    const status = await gatherStatus(promachosDir, config);

    if (options.json) {
      console.log(JSON.stringify(status, null, 2));
      return;
    }

    displayStatus(status, options.verbose);

  } catch (error) {
    console.error(chalk.red(`❌ Error: ${error.message}`));
    process.exit(1);
  }
}

/**
 * Gather all status information
 */
async function gatherStatus(promachosDir, config) {
  const status = {
    project: {
      name: config.project.name,
      type: config.project.type,
      framework: config.project.framework,
      initialized: new Date(fs.statSync(promachosDir).birthtime).toISOString()
    },
    files: await checkFiles(promachosDir),
    progress: await loadProgress(promachosDir),
    tasks: await loadTasks(promachosDir),
    artifacts: await checkArtifacts(promachosDir),
    context: await getContextSummary(promachosDir)
  };

  return status;
}

/**
 * Check which files exist
 */
async function checkFiles(promachosDir) {
  const files = {
    'config.yaml': checkFile(promachosDir, 'config.yaml'),
    'project.md': checkFile(promachosDir, 'project.md'),
    'progress.json': checkFile(promachosDir, 'progress.json'),
    'tasks.json': checkFile(promachosDir, 'tasks.json'),
    'context.md': checkFile(promachosDir, 'context.md')
  };

  return files;
}

/**
 * Check if a file exists and get its info
 */
function checkFile(promachosDir, filename) {
  const filepath = path.join(promachosDir, filename);
  if (fs.existsSync(filepath)) {
    const stats = fs.statSync(filepath);
    return {
      exists: true,
      size: stats.size,
      modified: stats.mtime.toISOString()
    };
  }
  return { exists: false };
}

/**
 * Load progress information
 */
async function loadProgress(promachosDir) {
  try {
    const progressPath = path.join(promachosDir, 'progress.json');
    if (fs.existsSync(progressPath)) {
      const progress = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
      return {
        status: progress.status || 'unknown',
        completion: progress.completion_percentage || 0,
        phase: progress.current_phase || 'unknown',
        lastUpdated: progress.last_updated,
        metrics: progress.metrics || {}
      };
    }
  } catch (error) {
    return { error: error.message };
  }
  return { status: 'no data' };
}

/**
 * Load tasks information
 */
async function loadTasks(promachosDir) {
  try {
    const tasksPath = path.join(promachosDir, 'tasks.json');
    if (fs.existsSync(tasksPath)) {
      const tasks = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));
      
      const taskStats = {
        total: 0,
        completed: 0,
        inProgress: 0,
        pending: 0
      };

      if (tasks.tasks && Array.isArray(tasks.tasks)) {
        taskStats.total = tasks.tasks.length;
        
        tasks.tasks.forEach(task => {
          switch (task.status) {
            case 'completed':
              taskStats.completed++;
              break;
            case 'in_progress':
              taskStats.inProgress++;
              break;
            case 'pending':
            default:
              taskStats.pending++;
              break;
          }
        });
      }

      return taskStats;
    }
  } catch (error) {
    return { error: error.message };
  }
  return { total: 0, completed: 0, inProgress: 0, pending: 0 };
}

/**
 * Check artifacts directory
 */
async function checkArtifacts(promachosDir) {
  try {
    const artifactsDir = path.join(promachosDir, 'artifacts');
    if (fs.existsSync(artifactsDir)) {
      const items = fs.readdirSync(artifactsDir);
      const builds = items.filter(item => item.startsWith('build_'));
      
      return {
        totalItems: items.length,
        builds: builds.length,
        latest: builds.length > 0 ? builds.sort().pop() : null
      };
    }
  } catch (error) {
    return { error: error.message };
  }
  return { totalItems: 0, builds: 0, latest: null };
}

/**
 * Get context summary
 */
async function getContextSummary(promachosDir) {
  try {
    const contextPath = path.join(promachosDir, 'context.md');
    if (fs.existsSync(contextPath)) {
      const content = fs.readFileSync(contextPath, 'utf8');
      const lines = content.split('\n').filter(line => line.trim());
      
      return {
        lines: lines.length,
        lastModified: fs.statSync(contextPath).mtime.toISOString(),
        hasContent: content.length > 100 // More than just the template
      };
    }
  } catch (error) {
    return { error: error.message };
  }
  return { lines: 0, hasContent: false };
}

/**
 * Display status in a formatted way
 */
function displayStatus(status, verbose) {
  console.log(chalk.blue('📊 Promachos Project Status\n'));

  // Project Info
  console.log(chalk.green('📁 Project Information'));
  console.log(`   ${chalk.bold('Name:')} ${status.project.name}`);
  console.log(`   ${chalk.bold('Type:')} ${status.project.type}`);
  if (status.project.framework) {
    console.log(`   ${chalk.bold('Framework:')} ${status.project.framework}`);
  }
  console.log(`   ${chalk.bold('Initialized:')} ${new Date(status.project.initialized).toLocaleDateString()}`);

  // Progress
  console.log(chalk.green('\n📈 Progress'));
  console.log(`   ${chalk.bold('Status:')} ${getStatusColor(status.progress.status)}`);
  console.log(`   ${chalk.bold('Completion:')} ${getProgressBar(status.progress.completion)} ${status.progress.completion}%`);
  console.log(`   ${chalk.bold('Current Phase:')} ${status.progress.phase}`);
  if (status.progress.lastUpdated) {
    console.log(`   ${chalk.bold('Last Updated:')} ${new Date(status.progress.lastUpdated).toLocaleDateString()}`);
  }

  // Tasks
  console.log(chalk.green('\n✅ Tasks'));
  console.log(`   ${chalk.bold('Total:')} ${status.tasks.total}`);
  console.log(`   ${chalk.bold('Completed:')} ${chalk.green(status.tasks.completed)}`);
  console.log(`   ${chalk.bold('In Progress:')} ${chalk.yellow(status.tasks.inProgress)}`);
  console.log(`   ${chalk.bold('Pending:')} ${chalk.gray(status.tasks.pending)}`);

  // Files
  console.log(chalk.green('\n📄 Files'));
  Object.entries(status.files).forEach(([filename, info]) => {
    const icon = info.exists ? '✅' : '❌';
    const size = info.exists ? ` (${formatBytes(info.size)})` : '';
    console.log(`   ${icon} ${filename}${size}`);
  });

  // Artifacts
  console.log(chalk.green('\n📦 Artifacts'));
  console.log(`   ${chalk.bold('Total Items:')} ${status.artifacts.totalItems}`);
  console.log(`   ${chalk.bold('Builds:')} ${status.artifacts.builds}`);
  if (status.artifacts.latest) {
    console.log(`   ${chalk.bold('Latest Build:')} ${status.artifacts.latest}`);
  }

  // Context
  console.log(chalk.green('\n💭 Context'));
  console.log(`   ${chalk.bold('Lines:')} ${status.context.lines}`);
  console.log(`   ${chalk.bold('Has Content:')} ${status.context.hasContent ? '✅' : '❌'}`);

  // Verbose information
  if (verbose) {
    console.log(chalk.green('\n🔍 Detailed Information'));
    
    if (status.progress.metrics && Object.keys(status.progress.metrics).length > 0) {
      console.log(`   ${chalk.bold('Metrics:')}`);
      Object.entries(status.progress.metrics).forEach(([key, value]) => {
        console.log(`     ${key}: ${value}`);
      });
    }

    console.log(`   ${chalk.bold('Config Location:')} .promachos/config.yaml`);
    console.log(`   ${chalk.bold('Artifacts Location:')} .promachos/artifacts/`);
  }

  // Quick actions
  console.log(chalk.blue('\n🚀 Quick Actions'));
  console.log(`   ${chalk.cyan('promachos start')} - Start new session`);
  console.log(`   ${chalk.cyan('promachos build')} - Rebuild framework`);
  
  if (status.tasks.pending > 0) {
    console.log(`   📋 You have ${status.tasks.pending} pending tasks`);
  }
  
  if (status.progress.completion < 100 && status.progress.completion > 0) {
    console.log(`   🎯 ${100 - status.progress.completion}% remaining to complete`);
  }
}

/**
 * Get colored status text
 */
function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'completed':
      return chalk.green(status);
    case 'in_progress':
    case 'active':
      return chalk.yellow(status);
    case 'planning':
      return chalk.blue(status);
    case 'error':
    case 'failed':
      return chalk.red(status);
    default:
      return chalk.gray(status);
  }
}

/**
 * Generate progress bar
 */
function getProgressBar(percentage, width = 20) {
  const filled = Math.round((percentage / 100) * width);
  const empty = width - filled;
  return chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(empty));
}

/**
 * Format bytes
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}