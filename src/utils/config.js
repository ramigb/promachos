import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import os from 'os';

/**
 * Configuration manager for Promachos
 */
export class ConfigManager {
  constructor(projectPath = process.cwd()) {
    this.projectPath = projectPath;
    this.projectConfigPath = path.join(projectPath, '.promachos', 'config.yaml');
    this.userConfigPath = path.join(os.homedir(), '.config', 'promachos', 'config.yaml');
  }

  /**
   * Get merged configuration (project > user > defaults)
   */
  getConfig() {
    const defaults = this.getDefaultConfig();
    const userConfig = this.loadUserConfig();
    const projectConfig = this.loadProjectConfig();

    return {
      ...defaults,
      ...userConfig,
      ...projectConfig
    };
  }

  /**
   * Get default configuration
   */
  getDefaultConfig() {
    return {
      project: {
        name: path.basename(this.projectPath),
        type: 'unknown',
        language: 'english'
      },
      behavior: {
        verbosity: 'balanced',
        explain_reasoning: true,
        ask_before_execute: true,
        max_retries: 3
      },
      output: {
        format: 'markdown',
        save_artifacts: true,
        include_metrics: true
      },
      cli: {
        auto_copy_clipboard: false,
        auto_open_browser: false,
        show_progress: true,
        colored_output: true
      }
    };
  }

  /**
   * Load user configuration
   */
  loadUserConfig() {
    try {
      if (fs.existsSync(this.userConfigPath)) {
        const content = fs.readFileSync(this.userConfigPath, 'utf8');
        return yaml.load(content) || {};
      }
    } catch (error) {
      console.warn(`Warning: Could not load user config: ${error.message}`);
    }
    return {};
  }

  /**
   * Load project configuration
   */
  loadProjectConfig() {
    try {
      if (fs.existsSync(this.projectConfigPath)) {
        const content = fs.readFileSync(this.projectConfigPath, 'utf8');
        return yaml.load(content) || {};
      }
    } catch (error) {
      console.warn(`Warning: Could not load project config: ${error.message}`);
    }
    return {};
  }

  /**
   * Save project configuration
   */
  saveProjectConfig(config) {
    try {
      const promachosDir = path.dirname(this.projectConfigPath);
      if (!fs.existsSync(promachosDir)) {
        fs.mkdirSync(promachosDir, { recursive: true });
      }

      const yamlContent = yaml.dump(config, {
        indent: 2,
        sortKeys: false,
        lineWidth: -1
      });

      fs.writeFileSync(this.projectConfigPath, yamlContent, 'utf8');
      return true;
    } catch (error) {
      console.error(`Error saving project config: ${error.message}`);
      return false;
    }
  }

  /**
   * Save user configuration
   */
  saveUserConfig(config) {
    try {
      const configDir = path.dirname(this.userConfigPath);
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }

      const yamlContent = yaml.dump(config, {
        indent: 2,
        sortKeys: false,
        lineWidth: -1
      });

      fs.writeFileSync(this.userConfigPath, yamlContent, 'utf8');
      return true;
    } catch (error) {
      console.error(`Error saving user config: ${error.message}`);
      return false;
    }
  }

  /**
   * Get a specific configuration value
   */
  get(key) {
    const config = this.getConfig();
    return this.getNestedValue(config, key);
  }

  /**
   * Set a specific configuration value
   */
  set(key, value, scope = 'project') {
    const config = scope === 'user' ? this.loadUserConfig() : this.loadProjectConfig();
    this.setNestedValue(config, key, value);
    
    if (scope === 'user') {
      return this.saveUserConfig(config);
    } else {
      return this.saveProjectConfig(config);
    }
  }

  /**
   * Get nested value from object using dot notation
   */
  getNestedValue(obj, key) {
    return key.split('.').reduce((current, prop) => {
      return current && current[prop] !== undefined ? current[prop] : undefined;
    }, obj);
  }

  /**
   * Set nested value in object using dot notation
   */
  setNestedValue(obj, key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((current, prop) => {
      if (!current[prop] || typeof current[prop] !== 'object') {
        current[prop] = {};
      }
      return current[prop];
    }, obj);
    target[lastKey] = value;
  }

  /**
   * Check if Promachos is initialized in current directory
   */
  isInitialized() {
    return fs.existsSync(path.join(this.projectPath, '.promachos'));
  }

  /**
   * Create initial project structure
   */
  initializeProject(config) {
    const promachosDir = path.join(this.projectPath, '.promachos');
    
    // Create .promachos directory
    if (!fs.existsSync(promachosDir)) {
      fs.mkdirSync(promachosDir, { recursive: true });
    }

    // Create subdirectories
    const dirs = ['artifacts', 'logs'];
    dirs.forEach(dir => {
      const dirPath = path.join(promachosDir, dir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
    });

    // Save configuration
    this.saveProjectConfig(config);

    // Create initial files
    this.createInitialFiles(promachosDir, config);

    return true;
  }

  /**
   * Create initial project files
   */
  createInitialFiles(promachosDir, config) {
    // Create project.md
    const projectMd = path.join(promachosDir, 'project.md');
    if (!fs.existsSync(projectMd)) {
      const projectContent = this.generateProjectMd(config);
      fs.writeFileSync(projectMd, projectContent, 'utf8');
    }

    // Create context.md
    const contextMd = path.join(promachosDir, 'context.md');
    if (!fs.existsSync(contextMd)) {
      const contextContent = `# Project Context for ${config.project.name}\n\nInitialized on ${new Date().toISOString()}\n\n## Key Decisions\n\n## Session History\n\n`;
      fs.writeFileSync(contextMd, contextContent, 'utf8');
    }

    // Create progress.json
    const progressJson = path.join(promachosDir, 'progress.json');
    if (!fs.existsSync(progressJson)) {
      const progress = {
        status: 'initialized',
        completion_percentage: 0,
        current_phase: 'planning',
        last_updated: new Date().toISOString(),
        metrics: {}
      };
      fs.writeFileSync(progressJson, JSON.stringify(progress, null, 2), 'utf8');
    }

    // Create tasks.json
    const tasksJson = path.join(promachosDir, 'tasks.json');
    if (!fs.existsSync(tasksJson)) {
      const tasks = { tasks: [] };
      fs.writeFileSync(tasksJson, JSON.stringify(tasks, null, 2), 'utf8');
    }

    // Create AI instructions file in project root
    this.createAIInstructions(config);
  }

  /**
   * Create AI assistant instructions file
   */
  createAIInstructions(config) {
    // Determine the filename based on AI assistant preference
    const aiAssistant = config.project.ai_assistant || 'claude';
    const fileNames = {
      'claude': 'CLAUDE.md',
      'chatgpt': 'CHATGPT.md',
      'copilot': 'COPILOT.md',
      'cursor': 'CURSOR.md',
      'generic': 'AI_ASSISTANT.md'
    };
    
    const fileName = fileNames[aiAssistant] || 'AI_ASSISTANT.md';
    const aiInstructionsPath = path.join(this.projectPath, fileName);
    
    const content = `# 🤖 AI Assistant Instructions - Promachos Protocol Active

**IMPORTANT**: This project uses the Promachos Protocol for human-AI collaboration. Please read and follow these instructions carefully.

## Quick Start for AI Assistants

1. **Acknowledge Protocol**: Start by saying "I acknowledge the Promachos Protocol is active in this project"
2. **Load Context**: Read the protocol files in \`.promachos/\` directory
3. **Follow Rules**: Adhere to the collaboration contract defined in the protocol

## Protocol Files Location

All protocol files are in the \`.promachos/\` directory:

- **\`.promachos/config.yaml\`** - Your behavior rules and collaboration preferences
- **\`.promachos/project.md\`** - Project context and objectives  
- **\`.promachos/context.md\`** - Previous decisions and session history
- **\`.promachos/progress.json\`** - Current progress metrics
- **\`.promachos/tasks.json\`** - Task breakdown and status
- **\`.promachos/artifacts/\`** - Your outputs go here

## Your Responsibilities

1. **Update Progress**: After completing work, update \`.promachos/progress.json\`
2. **Document Decisions**: Log important decisions in \`.promachos/context.md\`
3. **Track Tasks**: Update task status in \`.promachos/tasks.json\`
4. **Save Outputs**: Place all generated code/docs in \`.promachos/artifacts/\`

## Key Commands

When working on this project, you can suggest these commands to the human:

\`\`\`bash
# Check current status
promachos status

# Generate fresh context
promachos start

# See your progress  
promachos status --verbose
\`\`\`

## Collaboration Rules

Based on \`.promachos/config.yaml\`, you should:
- Verbosity: ${config.behavior.verbosity}
- Explain reasoning: ${config.behavior.explain_reasoning ? 'Yes' : 'No'}
- Ask before major changes: ${config.behavior.ask_before_execute ? 'Yes' : 'No'}

## Starting Your Work

1. First, read \`.promachos/project.md\` to understand the project
2. Check \`.promachos/progress.json\` to see current status
3. Review \`.promachos/context.md\` for previous decisions
4. Look at \`.promachos/tasks.json\` for pending work
5. Begin working systematically, updating protocol files as you go

## Important Notes

- This is a ${config.project.type} project${config.project.framework ? ` using ${config.project.framework}` : ''}
- Always maintain the protocol structure
- Enable seamless handoffs by documenting your work
- Follow the collaboration contract strictly

---

*This file was auto-generated by Promachos Protocol v1.0.0*
*For more information: https://github.com/ramigb/promachos*`;

    fs.writeFileSync(aiInstructionsPath, content, 'utf8');
    
    // Also create a .promachos/README.md for agents that look there
    const promachosReadmePath = path.join(this.projectPath, '.promachos', 'README.md');
    const promachosReadme = `# Promachos Protocol Directory

This directory contains the Promachos Protocol state for human-AI collaboration.

## Files

- **config.yaml** - Collaboration rules and AI behavior preferences
- **project.md** - Project description and objectives
- **context.md** - Decision history and session notes
- **progress.json** - Quantified progress tracking
- **tasks.json** - Task breakdown and status
- **artifacts/** - AI-generated outputs
- **logs/** - Error and audit logs

## For AI Assistants

Please read these files in order:
1. config.yaml - Understand behavior rules
2. project.md - Understand project goals
3. progress.json - Check current status
4. context.md - Review previous decisions
5. tasks.json - See pending work

Then update these files as you work to maintain protocol compliance.`;

    fs.writeFileSync(promachosReadmePath, promachosReadme, 'utf8');
  }

  /**
   * Generate project.md content
   */
  generateProjectMd(config) {
    return `# ${config.project.name}

## Project Overview
- **Type**: ${config.project.type}
- **Created**: ${new Date().toLocaleDateString()}
- **Framework**: Promachos v1.0.0

## Objectives
Define your primary project goals here:
- 

## Requirements
List your key requirements:
- 

## Success Criteria
What does success look like?
- 

## Timeline
- Phase 1: Planning
- Phase 2: Implementation  
- Phase 3: Testing & Review

## Notes
Add any additional context or constraints here.
`;
  }
}