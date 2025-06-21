/**
 * Promachos Framework - Main module
 * Exports core functionality for programmatic use
 */

export { ProjectDetector } from './utils/detector.js';
export { ConfigManager } from './utils/config.js';
export { buildFramework } from './commands/build.js';

// Command exports for potential API use
export { initCommand } from './commands/init.js';
export { startCommand } from './commands/start.js';
export { buildCommand } from './commands/build.js';
export { statusCommand } from './commands/status.js';
export { configCommand } from './commands/config.js';

/**
 * Main Promachos class for programmatic use
 */
export class Promachos {
  constructor(projectPath = process.cwd()) {
    this.projectPath = projectPath;
    this.detector = new ProjectDetector(projectPath);
    this.config = new ConfigManager(projectPath);
  }

  /**
   * Initialize Promachos in the project directory
   */
  async init(options = {}) {
    return await initCommand({
      auto: options.auto || false,
      type: options.type,
      force: options.force || false
    });
  }

  /**
   * Build the framework prompt
   */
  async build(options = {}) {
    return await buildFramework({
      minimal: options.minimal || false,
      output: options.output
    });
  }

  /**
   * Get project status
   */
  async getStatus() {
    // Implementation would mirror statusCommand but return data instead of console output
    // This allows programmatic access to status information
    if (!this.config.isInitialized()) {
      throw new Error('Promachos not initialized');
    }

    const config = this.config.getConfig();
    // Return status object similar to statusCommand but structured for API use
    return {
      initialized: true,
      project: config.project,
      // ... other status information
    };
  }

  /**
   * Detect project information
   */
  async detectProject() {
    const [projectType, metadata] = await Promise.all([
      this.detector.detectProjectType(),
      this.detector.getProjectMetadata()
    ]);

    return { projectType, metadata };
  }

  /**
   * Check if initialized
   */
  isInitialized() {
    return this.config.isInitialized();
  }
}

export default Promachos;