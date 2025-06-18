<div align="center">
  <img src="logo.png" alt="Promachos Logo" width="200" height="200">
  
  # PROMACHOS
  ### LLM Prompting Framework
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Framework Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/yourusername/prompting-framework)
  
  *A structured approach for LLMs to work on projects systematically*
</div>

---

## 🎯 Overview

**Promachos** is a powerful framework that provides a structured approach for Large Language Models (LLMs) to work on projects systematically. By separating configuration, project details, progress tracking, and outputs into distinct files, it ensures better organization and optimal context management.

### ✨ Key Features

- 📁 **Organized Structure** - Clear separation of concerns with dedicated files for each aspect
- 🔄 **Progress Tracking** - Automated tracking of project progress and task completion
- 🎨 **Customizable** - Flexible configuration to match your project needs
- 📝 **Context Preservation** - Maintains conversation history across sessions
- 🚀 **Quick Onboarding** - Get started in minutes with our streamlined setup

## 📂 Directory Structure
```
prompting-framework/
├── onboard.md               # Quick LLM onboarding (start here)
├── config.yaml              # User configuration
├── core.md                  # Core framework logic & system instructions
├── project.md               # Current project description
├── project_progress.json    # Structured progress tracking
├── context.md               # Conversation history/memory
├── tasks.json               # Task breakdown and status
├── prompts/                 # Reusable prompt templates
│   ├── analyze.md
│   ├── create.md
│   └── debug.md
├── artifacts/               # LLM outputs
│   └── [timestamp]/         # Organized by session
├── logs/                    # For debugging
│   └── errors.log
└── README.md               # This file
```

## 🚀 Getting Started

### 1️⃣ Configure Your Project
Edit `config.yaml` to set your preferences:
- Project type and language
- Behavior preferences
- Output format

### 2️⃣ Define Your Project
Update `project.md` with:
- Project objectives
- Requirements
- Success criteria
- Timeline

### 3️⃣ Using the Framework
When prompting your LLM:
1. Ask it to read the onboard.md file first
2. Or provide this quick prompt:

**Quick start:**
```bash
# Ask your LLM:
Please read onboard.md in this prompting framework directory to get started.
```

**Detailed start:**
```bash
# For a comprehensive setup:
Please read the core.md file in this project to understand the framework, 
then load project.md to see what we're working on. Follow the framework 
guidelines for all work on this project.
```

### 4️⃣ Progress Tracking
The LLM will automatically:
- Update `project_progress.json` with progress
- Maintain task status in `tasks.json`
- Save outputs to `artifacts/` directory
- Keep conversation context in `context.md`

## 📄 File Descriptions

### 📋 onboard.md
Quick onboarding guide for LLMs. Start here for fastest setup - contains the essential workflow and file references in a concise, LLM-optimized format.

### ⚙️ config.yaml
User-specific configuration for the project. Modify this to control how the LLM behaves.

### 🧠 core.md
System instructions for the LLM. This file contains the framework logic and operational guidelines.

### 📊 project.md
Your project description. Update this with your specific project details.

### 📈 project_progress.json
Automatically updated by the LLM to track progress, including completion percentage, phases, and metrics.

### 💭 context.md
Maintains conversation history and key decisions across sessions.

### ✅ tasks.json
Detailed task tracking with status, priorities, and dependencies.

### 📝 prompts/
Reusable templates for common operations:
- `analyze.md`: For analyzing code or documents
- `create.md`: For generating new content
- `debug.md`: For troubleshooting issues

### 💾 artifacts/
All LLM outputs are saved here, organized by timestamp.

### 🔍 logs/
Error logs and debugging information.

## 💡 Best Practices

1. **Regular Updates**: Ensure the LLM updates progress files after each work session
2. **Clear Project Definition**: The clearer your project.md, the better the results
3. **Configuration Tuning**: Adjust config.yaml based on your needs
4. **Task Breakdown**: Encourage the LLM to break large projects into smaller tasks
5. **Context Preservation**: Review context.md periodically to ensure important information is retained

## 🎨 Customization

Feel free to:
- Add more prompt templates in the `prompts/` directory
- Extend the configuration options in `config.yaml`
- Modify the progress tracking structure in JSON files
- Add additional metadata fields as needed

## 🔧 Troubleshooting

If issues arise:
1. Check `logs/errors.log` for error messages
2. Verify all files are properly formatted (valid YAML/JSON)
3. Ensure the LLM has read the core.md instructions
4. Review the context.md for any missed information

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this framework
- Inspired by the need for better LLM project organization

## 📊 Version

- **Framework Version:** 1.0
- **Last Updated:** 2024-01-01

---

<div align="center">
  Made with ❤️ for better LLM workflows
</div>
