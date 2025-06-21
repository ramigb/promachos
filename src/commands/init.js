import chalk from 'chalk';
import inquirer from 'inquirer';
import ora from 'ora';
import { ProjectDetector } from '../utils/detector.js';
import { ConfigManager } from '../utils/config.js';

export async function initCommand(options) {
  console.log(chalk.blue('🚀 Initializing Promachos in current directory...\n'));

  const configManager = new ConfigManager();
  
  // Check if already initialized
  if (configManager.isInitialized() && !options.force) {
    console.log(chalk.yellow('⚠️  Promachos is already initialized in this directory.'));
    console.log(chalk.gray('Use --force to reinitialize.'));
    return;
  }

  try {
    // Start project analysis
    const spinner = ora('Analyzing project...').start();
    const detector = new ProjectDetector();
    
    // Detect project type and metadata
    const [projectType, metadata] = await Promise.all([
      detector.detectProjectType(),
      detector.getProjectMetadata()
    ]);
    
    spinner.succeed('Project analysis complete');

    // Show detection results
    console.log(chalk.green('\n📊 Project Analysis Results:'));
    console.log(`   ${chalk.bold('Name:')} ${metadata.name}`);
    console.log(`   ${chalk.bold('Type:')} ${projectType.type} ${projectType.framework ? `(${projectType.framework})` : ''}`);
    console.log(`   ${chalk.bold('Files:')} ${metadata.size.files.toLocaleString()}`);
    console.log(`   ${chalk.bold('Lines:')} ${metadata.size.lines.toLocaleString()}`);
    
    if (metadata.languages.length > 0) {
      console.log(`   ${chalk.bold('Languages:')} ${metadata.languages.map(l => `${l.language} (${l.percentage}%)`).join(', ')}`);
    }

    // Interactive configuration if not auto mode
    let config = {
      project: {
        name: metadata.name,
        type: options.type || projectType.type,
        language: 'english',
        framework: projectType.framework,
        metadata: {
          files: metadata.size.files,
          lines: metadata.size.lines,
          languages: metadata.languages
        }
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

    // Interactive setup unless auto mode
    if (!options.auto) {
      console.log(chalk.blue('\n🔧 Configuration Setup:'));
      
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Project name:',
          default: metadata.name
        },
        {
          type: 'list',
          name: 'projectType',
          message: 'What type of project is this?',
          choices: [
            { name: `${projectType.type} (auto-detected)`, value: projectType.type },
            { name: 'Web Application', value: 'web-app' },
            { name: 'API/Backend', value: 'api' },
            { name: 'Library/Package', value: 'library' },
            { name: 'Mobile App', value: 'mobile' },
            { name: 'Desktop App', value: 'desktop' },
            { name: 'Data Science', value: 'data-science' },
            { name: 'DevOps/Infrastructure', value: 'devops' },
            { name: 'Other', value: 'other' }
          ],
          default: 0
        },
        {
          type: 'list',
          name: 'verbosity',
          message: 'How verbose should the AI assistant be?',
          choices: [
            { name: 'Minimal - Brief responses', value: 'minimal' },
            { name: 'Balanced - Standard detail', value: 'balanced' },
            { name: 'Detailed - Comprehensive explanations', value: 'detailed' }
          ],
          default: 1
        },
        {
          type: 'confirm',
          name: 'explainReasoning',
          message: 'Should the AI explain its reasoning?',
          default: true
        },
        {
          type: 'confirm',
          name: 'askBeforeExecute',
          message: 'Ask for permission before making changes?',
          default: true
        },
        {
          type: 'confirm',
          name: 'autoCopy',
          message: 'Automatically copy prompts to clipboard?',
          default: false
        }
      ]);

      // Update config with answers
      config.project.name = answers.projectName;
      config.project.type = answers.projectType;
      config.behavior.verbosity = answers.verbosity;
      config.behavior.explain_reasoning = answers.explainReasoning;
      config.behavior.ask_before_execute = answers.askBeforeExecute;
      config.cli.auto_copy_clipboard = answers.autoCopy;
    }

    // Initialize project
    const initSpinner = ora('Creating Promachos structure...').start();
    
    const success = configManager.initializeProject(config);
    
    if (success) {
      initSpinner.succeed('Promachos initialized successfully!');
      
      console.log(chalk.green('\n✅ Setup Complete!'));
      console.log(chalk.gray('\nCreated:'));
      console.log(chalk.gray('  .promachos/'));
      console.log(chalk.gray('  ├── config.yaml'));
      console.log(chalk.gray('  ├── project.md'));
      console.log(chalk.gray('  ├── context.md'));
      console.log(chalk.gray('  ├── progress.json'));
      console.log(chalk.gray('  ├── tasks.json'));
      console.log(chalk.gray('  ├── artifacts/'));
      console.log(chalk.gray('  └── logs/'));

      console.log(chalk.blue('\n🚀 Next Steps:'));
      console.log(`   1. ${chalk.cyan('promachos start')} - Generate your first AI prompt`);
      console.log(`   2. Edit ${chalk.cyan('.promachos/project.md')} to describe your goals`);
      console.log(`   3. ${chalk.cyan('promachos status')} - Check your progress`);

      // Show project-specific recommendations
      if (projectType.type !== 'unknown') {
        console.log(chalk.yellow('\n💡 Recommendations for your project:'));
        showProjectRecommendations(projectType.type, projectType.framework);
      }

    } else {
      initSpinner.fail('Failed to initialize Promachos');
      process.exit(1);
    }

  } catch (error) {
    console.error(chalk.red(`\n❌ Error: ${error.message}`));
    process.exit(1);
  }
}

/**
 * Show project-specific recommendations
 */
function showProjectRecommendations(type, framework) {
  const recommendations = {
    'react': [
      'Consider using the analyze command to check component structure',
      'Focus on component reusability and prop validation',
      'Monitor bundle size and performance'
    ],
    'nodejs': [
      'Review API endpoint structure and error handling',
      'Check for security best practices',
      'Monitor dependencies for vulnerabilities'
    ],
    'python': [
      'Use type hints for better code documentation',
      'Follow PEP 8 style guidelines',
      'Consider adding automated testing'
    ],
    'nextjs': [
      'Optimize for Core Web Vitals',
      'Review SSR/SSG usage patterns',
      'Check SEO implementation'
    ]
  };

  const tips = recommendations[type] || recommendations[framework] || [
    'Regular code reviews and refactoring',
    'Maintain good documentation',
    'Implement proper testing strategies'
  ];

  tips.forEach((tip, index) => {
    console.log(`   ${index + 1}. ${tip}`);
  });
}