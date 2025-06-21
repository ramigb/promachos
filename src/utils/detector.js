import fs from 'fs';
import path from 'path';

/**
 * Auto-detect project type and configuration
 */
export class ProjectDetector {
  constructor(projectPath = process.cwd()) {
    this.projectPath = projectPath;
  }

  /**
   * Detect project type based on files and dependencies
   */
  async detectProjectType() {
    const detections = [];

    // Check for specific files
    const fileChecks = {
      'package.json': this.detectNodeProject.bind(this),
      'requirements.txt': () => ({ type: 'python', confidence: 0.8 }),
      'Pipfile': () => ({ type: 'python', confidence: 0.9 }),
      'pyproject.toml': () => ({ type: 'python', confidence: 0.7 }),
      'Cargo.toml': () => ({ type: 'rust', confidence: 0.9 }),
      'go.mod': () => ({ type: 'go', confidence: 0.9 }),
      'pom.xml': () => ({ type: 'java-maven', confidence: 0.8 }),
      'build.gradle': () => ({ type: 'java-gradle', confidence: 0.8 }),
      'composer.json': () => ({ type: 'php', confidence: 0.8 }),
      'Gemfile': () => ({ type: 'ruby', confidence: 0.8 }),
      'mix.exs': () => ({ type: 'elixir', confidence: 0.9 }),
      'pubspec.yaml': () => ({ type: 'dart-flutter', confidence: 0.9 })
    };

    for (const [file, detector] of Object.entries(fileChecks)) {
      if (fs.existsSync(path.join(this.projectPath, file))) {
        const result = await detector();
        if (result) {
          detections.push(result);
        }
      }
    }

    // Return the detection with highest confidence
    if (detections.length === 0) {
      return { type: 'unknown', confidence: 0 };
    }

    return detections.sort((a, b) => b.confidence - a.confidence)[0];
  }

  /**
   * Detect Node.js project specifics
   */
  async detectNodeProject() {
    try {
      const packageJson = JSON.parse(
        fs.readFileSync(path.join(this.projectPath, 'package.json'), 'utf8')
      );

      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

      // Framework detection
      if (deps.react) {
        if (deps.next) return { type: 'nextjs', confidence: 0.95, framework: 'Next.js' };
        if (deps['react-native']) return { type: 'react-native', confidence: 0.95, framework: 'React Native' };
        return { type: 'react', confidence: 0.9, framework: 'React' };
      }

      if (deps.vue) return { type: 'vue', confidence: 0.9, framework: 'Vue.js' };
      if (deps['@angular/core']) return { type: 'angular', confidence: 0.9, framework: 'Angular' };
      if (deps.svelte) return { type: 'svelte', confidence: 0.9, framework: 'Svelte' };
      if (deps.express) return { type: 'node-express', confidence: 0.8, framework: 'Express.js' };
      if (deps.fastify) return { type: 'node-fastify', confidence: 0.8, framework: 'Fastify' };

      // Generic Node.js
      return { type: 'nodejs', confidence: 0.7, framework: 'Node.js' };
    } catch (error) {
      return { type: 'nodejs', confidence: 0.5 };
    }
  }

  /**
   * Get project metadata
   */
  async getProjectMetadata() {
    const metadata = {
      name: path.basename(this.projectPath),
      path: this.projectPath,
      size: await this.calculateProjectSize(),
      languages: await this.detectLanguages(),
      gitInfo: await this.getGitInfo()
    };

    return metadata;
  }

  /**
   * Calculate project size
   */
  async calculateProjectSize() {
    let fileCount = 0;
    let lineCount = 0;
    const extensions = new Map();

    const scanDirectory = (dir) => {
      try {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
          // Skip hidden directories and common non-code directories
          if (item.startsWith('.') || ['node_modules', 'dist', 'build', 'coverage'].includes(item)) {
            continue;
          }

          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            scanDirectory(fullPath);
          } else if (stat.isFile()) {
            const ext = path.extname(item);
            if (this.isCodeFile(ext)) {
              fileCount++;
              extensions.set(ext, (extensions.get(ext) || 0) + 1);

              try {
                const content = fs.readFileSync(fullPath, 'utf8');
                lineCount += content.split('\n').length;
              } catch {
                // Skip files that can't be read
              }
            }
          }
        }
      } catch {
        // Skip directories that can't be read
      }
    };

    scanDirectory(this.projectPath);

    return {
      files: fileCount,
      lines: lineCount,
      extensions: Object.fromEntries(extensions)
    };
  }

  /**
   * Detect programming languages
   */
  async detectLanguages() {
    const languageMap = {
      '.js': 'JavaScript',
      '.jsx': 'JavaScript (JSX)',
      '.ts': 'TypeScript',
      '.tsx': 'TypeScript (TSX)',
      '.py': 'Python',
      '.java': 'Java',
      '.cpp': 'C++',
      '.c': 'C',
      '.cs': 'C#',
      '.rb': 'Ruby',
      '.go': 'Go',
      '.rs': 'Rust',
      '.php': 'PHP',
      '.swift': 'Swift',
      '.kt': 'Kotlin',
      '.dart': 'Dart',
      '.ex': 'Elixir'
    };

    const size = await this.calculateProjectSize();
    const languages = [];

    for (const [ext, count] of Object.entries(size.extensions)) {
      if (languageMap[ext]) {
        languages.push({
          language: languageMap[ext],
          files: count,
          percentage: Math.round((count / size.files) * 100)
        });
      }
    }

    return languages.sort((a, b) => b.files - a.files);
  }

  /**
   * Get Git repository information
   */
  async getGitInfo() {
    try {
      if (!fs.existsSync(path.join(this.projectPath, '.git'))) {
        return null;
      }

      // Try to get remote URL
      const gitConfig = path.join(this.projectPath, '.git', 'config');
      if (fs.existsSync(gitConfig)) {
        const config = fs.readFileSync(gitConfig, 'utf8');
        const remoteMatch = config.match(/url = (.+)/);
        if (remoteMatch) {
          return {
            isGitRepo: true,
            remoteUrl: remoteMatch[1]
          };
        }
      }

      return { isGitRepo: true };
    } catch {
      return null;
    }
  }

  /**
   * Check if file extension indicates a code file
   */
  isCodeFile(ext) {
    const codeExtensions = [
      '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.cs',
      '.rb', '.go', '.rs', '.php', '.swift', '.kt', '.dart', '.ex', '.exs',
      '.html', '.css', '.scss', '.sass', '.less', '.vue', '.svelte',
      '.json', '.yaml', '.yml', '.toml', '.xml', '.sql'
    ];
    return codeExtensions.includes(ext.toLowerCase());
  }
}