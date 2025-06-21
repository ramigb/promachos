import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { ConfigManager } from '../utils/config.js';

export async function buildCommand(options) {
  console.log(chalk.blue('🔨 Building Promachos framework...\n'));

  const result = await buildFramework(options);
  
  if (result.success) {
    console.log(chalk.green('✅ Framework built successfully!'));
    console.log(`📄 Output: ${chalk.cyan(result.outputPath)}`);
    console.log(`📊 Size: ${result.size.toLocaleString()} characters (~${result.tokens.toLocaleString()} tokens)`);
    console.log(`💡 Mode: ${result.mode}`);
  } else {
    console.error(chalk.red('❌ Build failed:'), result.error);
    process.exit(1);
  }
}

/**
 * Build the framework (used by both build and start commands)
 */
export async function buildFramework(options = {}, silent = false) {
  const configManager = new ConfigManager();
  let spinner;

  if (!silent) {
    spinner = ora('Building framework...').start();
  }

  try {
    // Check if initialized
    if (!configManager.isInitialized()) {
      throw new Error('Promachos not initialized. Run: promachos init');
    }

    const config = configManager.getConfig();
    const projectPath = configManager.projectPath;
    
    // Build the framework content
    const frameworkContent = await buildFrameworkContent(config, options.minimal || false);
    
    // Create output directory
    const artifactsDir = path.join(projectPath, '.promachos', 'artifacts');
    const buildDir = path.join(artifactsDir, `build_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}`);
    
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }

    // Determine output file
    const extension = options.minimal ? '.txt' : '.md';
    const filename = `promachos_framework_${new Date().toISOString().slice(0, 10)}${extension}`;
    const outputPath = options.output || path.join(buildDir, filename);

    // Write the framework file
    fs.writeFileSync(outputPath, frameworkContent, 'utf8');

    // Calculate metrics
    const size = frameworkContent.length;
    const tokens = Math.round(size / 4); // Rough estimate
    const mode = options.minimal ? 'Ultra-minimal (no markdown)' : 'Standard (with markdown)';

    if (!silent && spinner) {
      spinner.succeed('Framework built');
    }

    return {
      success: true,
      outputPath,
      content: frameworkContent,
      size,
      tokens,
      mode
    };

  } catch (error) {
    if (!silent && spinner) {
      spinner.fail('Build failed');
    }
    
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Build the complete framework content
 */
async function buildFrameworkContent(config, minimal = false) {
  const projectPath = config.project?.path || process.cwd();
  const promachosDir = path.join(projectPath, '.promachos');
  
  const sections = [];

  // Header
  if (!minimal) {
    sections.push('# PROMACHOS Framework - Session Build');
    sections.push(`# Generated: ${new Date().toISOString()}`);
    sections.push('# Use this prompt with your AI assistant\n');
  } else {
    sections.push('PROMACHOS Framework - Session Build');
    sections.push(`Generated: ${new Date().toISOString()}`);
    sections.push('Use this prompt with your AI assistant\n');
  }

  // Core framework instructions
  sections.push(minimal ? 'CORE FRAMEWORK' : '## CORE FRAMEWORK');
  sections.push(await loadCoreInstructions(minimal));

  // Project description
  sections.push(minimal ? '\nPROJECT DESCRIPTION' : '\n## PROJECT DESCRIPTION');
  sections.push(await loadProjectDescription(promachosDir, minimal));

  // Current progress
  sections.push(minimal ? '\nCURRENT PROGRESS' : '\n## CURRENT PROGRESS');
  sections.push(await loadProgress(promachosDir, minimal));

  // Tasks
  sections.push(minimal ? '\nTASKS' : '\n## TASKS');
  sections.push(await loadTasks(promachosDir, minimal));

  // Context
  sections.push(minimal ? '\nCONTEXT HISTORY' : '\n## CONTEXT HISTORY');
  sections.push(await loadContext(promachosDir, minimal));

  // Configuration
  sections.push(minimal ? '\nCONFIGURATION' : '\n## CONFIGURATION');
  sections.push(formatConfiguration(config, minimal));

  // Working instructions
  sections.push(minimal ? '\nWORKING INSTRUCTIONS' : '\n## WORKING INSTRUCTIONS');
  sections.push(generateWorkingInstructions(config, minimal));

  return sections.join('\n');
}

/**
 * Load core framework instructions
 */
async function loadCoreInstructions(minimal) {
  try {
    // Try to load from the original framework files
    const frameworkPath = process.cwd(); // Assuming we're in the framework directory
    const corePath = path.join(frameworkPath, 'core.md');
    
    if (fs.existsSync(corePath)) {
      let content = fs.readFileSync(corePath, 'utf8');
      if (minimal) {
        content = stripMarkdown(content);
      }
      return content;
    }
  } catch (error) {
    // Fallback to embedded instructions
  }

  // Fallback core instructions
  const core = `
You are operating within the Promachos framework designed for systematic project work.

Core Principles:
1. Project-Driven Approach - Work within current project context
2. Configuration Awareness - Respect user preferences  
3. Context Management - Maintain conversation history
4. Task Decomposition - Break work into manageable pieces
5. Progress Tracking - Update progress systematically

Workflow:
1. Check existing progress and context
2. Understand current project state
3. Suggest next steps based on priorities
4. Execute work systematically
5. Update progress and context
6. Save outputs to artifacts directory

Always update .promachos/progress.json and .promachos/context.md after significant work.
`;

  return minimal ? stripMarkdown(core) : core;
}

/**
 * Load project description
 */
async function loadProjectDescription(promachosDir, minimal) {
  try {
    const projectPath = path.join(promachosDir, 'project.md');
    if (fs.existsSync(projectPath)) {
      let content = fs.readFileSync(projectPath, 'utf8');
      if (minimal) {
        content = stripMarkdown(content);
      }
      return content;
    }
  } catch (error) {
    // Handle error
  }
  return 'No project description available. Please update .promachos/project.md';
}

/**
 * Load current progress
 */
async function loadProgress(promachosDir, minimal) {
  try {
    const progressPath = path.join(promachosDir, 'progress.json');
    if (fs.existsSync(progressPath)) {
      const progress = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
      
      if (minimal) {
        return `Status: ${progress.status || 'unknown'}
Completion: ${progress.completion_percentage || 0}%
Phase: ${progress.current_phase || 'unknown'}
Last Updated: ${progress.last_updated || 'never'}`;
      } else {
        return `\`\`\`json
${JSON.stringify(progress, null, 2)}
\`\`\``;
      }
    }
  } catch (error) {
    // Handle error
  }
  return 'No progress data available';
}

/**
 * Load tasks
 */
async function loadTasks(promachosDir, minimal) {
  try {
    const tasksPath = path.join(promachosDir, 'tasks.json');
    if (fs.existsSync(tasksPath)) {
      const tasks = JSON.parse(fs.readFileSync(tasksPath, 'utf8'));
      
      if (minimal) {
        if (tasks.tasks && tasks.tasks.length > 0) {
          return tasks.tasks.map(task => 
            `${task.status === 'completed' ? '✓' : '○'} ${task.title || task.description || 'Untitled task'}`
          ).join('\n');
        }
        return 'No tasks defined';
      } else {
        return `\`\`\`json
${JSON.stringify(tasks, null, 2)}
\`\`\``;
      }
    }
  } catch (error) {
    // Handle error
  }
  return 'No tasks available';
}

/**
 * Load context history
 */
async function loadContext(promachosDir, minimal) {
  try {
    const contextPath = path.join(promachosDir, 'context.md');
    if (fs.existsSync(contextPath)) {
      let content = fs.readFileSync(contextPath, 'utf8');
      if (minimal) {
        content = stripMarkdown(content);
      }
      return content;
    }
  } catch (error) {
    // Handle error
  }
  return 'No context history available';
}

/**
 * Format configuration
 */
function formatConfiguration(config, minimal) {
  const relevantConfig = {
    project: {
      name: config.project.name,
      type: config.project.type,
      framework: config.project.framework
    },
    behavior: config.behavior
  };

  if (minimal) {
    return `Project: ${config.project.name} (${config.project.type})
Verbosity: ${config.behavior.verbosity}
Explain reasoning: ${config.behavior.explain_reasoning}
Ask before execute: ${config.behavior.ask_before_execute}`;
  } else {
    return `\`\`\`yaml
${JSON.stringify(relevantConfig, null, 2)}
\`\`\``;
  }
}

/**
 * Generate working instructions
 */
function generateWorkingInstructions(config, minimal) {
  const instructions = `
Remember to:
1. Check progress.json to see current status
2. Review tasks.json for pending work
3. Update context.md with key decisions
4. Save important outputs to artifacts/
5. Respect the ${config.behavior.verbosity} verbosity setting
6. ${config.behavior.explain_reasoning ? 'Explain your reasoning' : 'Keep explanations brief'}
7. ${config.behavior.ask_before_execute ? 'Ask permission before making changes' : 'Proceed with confidence'}

Focus on the current project: ${config.project.name} (${config.project.type})
`;

  return minimal ? stripMarkdown(instructions) : instructions;
}

/**
 * Strip markdown formatting for minimal mode
 */
function stripMarkdown(content) {
  return content
    .replace(/^#+\s+/gm, '') // Remove headers
    .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]+)\*/g, '$1') // Remove italic
    .replace(/`([^`]+)`/g, '$1') // Remove inline code
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/^\s*[-*]\s+/gm, '') // Remove bullet points
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered lists
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/^>\s+/gm, '') // Remove blockquotes
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Remove multiple blank lines
    .trim();
}