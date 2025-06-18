# LLM Prompting Framework

## Overview
This framework provides a structured approach for LLMs to work on projects systematically. It separates configuration, project details, progress tracking, and outputs into distinct files for better organization and context management.

## Directory Structure
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

## Getting Started

### 1. Configure Your Project
Edit `config.yaml` to set your preferences:
- Project type and language
- Behavior preferences
- Output format

### 2. Define Your Project
Update `project.md` with:
- Project objectives
- Requirements
- Success criteria
- Timeline

### 3. Using the Framework
When prompting your LLM:
1. Ask it to read the onboard.md file first
2. Or provide this quick prompt:

Quick start:
```
Please read onboard.md in this prompting framework directory to get started.
```

Detailed start:
```
Please read the core.md file in this project to understand the framework, 
then load project.md to see what we're working on. Follow the framework 
guidelines for all work on this project.
```

### 4. Progress Tracking
The LLM will automatically:
- Update `project_progress.json` with progress
- Maintain task status in `tasks.json`
- Save outputs to `artifacts/` directory
- Keep conversation context in `context.md`

## File Descriptions

### onboard.md
Quick onboarding guide for LLMs. Start here for fastest setup - contains the essential workflow and file references in a concise, LLM-optimized format.

### config.yaml
User-specific configuration for the project. Modify this to control how the LLM behaves.

### core.md
System instructions for the LLM. This file contains the framework logic and operational guidelines.

### project.md
Your project description. Update this with your specific project details.

### project_progress.json
Automatically updated by the LLM to track progress, including completion percentage, phases, and metrics.

### context.md
Maintains conversation history and key decisions across sessions.

### tasks.json
Detailed task tracking with status, priorities, and dependencies.

### prompts/
Reusable templates for common operations:
- `analyze.md`: For analyzing code or documents
- `create.md`: For generating new content
- `debug.md`: For troubleshooting issues

### artifacts/
All LLM outputs are saved here, organized by timestamp.

### logs/
Error logs and debugging information.

## Best Practices

1. **Regular Updates**: Ensure the LLM updates progress files after each work session
2. **Clear Project Definition**: The clearer your project.md, the better the results
3. **Configuration Tuning**: Adjust config.yaml based on your needs
4. **Task Breakdown**: Encourage the LLM to break large projects into smaller tasks
5. **Context Preservation**: Review context.md periodically to ensure important information is retained

## Customization

Feel free to:
- Add more prompt templates in the `prompts/` directory
- Extend the configuration options in `config.yaml`
- Modify the progress tracking structure in JSON files
- Add additional metadata fields as needed

## Troubleshooting

If issues arise:
1. Check `logs/errors.log` for error messages
2. Verify all files are properly formatted (valid YAML/JSON)
3. Ensure the LLM has read the core.md instructions
4. Review the context.md for any missed information

## Version
Framework Version: 1.0
Last Updated: 2024-01-01
