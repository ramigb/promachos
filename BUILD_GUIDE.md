# Build System Guide

## Overview
The Promachos framework includes a build system that compiles the entire framework into a single, token-efficient file that can be easily copied into project folders or pasted into chat LLMs.

## Building the Framework

### Commands
```bash
python3 build.py                    # Standard build with markdown formatting
python3 build.py --no-markdown      # Ultra-minified build without markdown
```

### Output
The build script generates files in `artifacts/build_YYYYMMDD_HHMMSS/`:
- Standard build: `promachos_framework_YYYYMMDD.md`
- Ultra-minified: `promachos_framework_YYYYMMDD.txt`

Output contains:
- Core framework instructions
- All prompt templates
- Configuration templates
- Initial data structure templates
- Usage instructions

### Token Optimization
The build process:
- Removes unnecessary whitespace
- Eliminates redundant headers
- Strips comments
- Minimizes JSON/YAML formatting
- Standard build: ~2,600 tokens
- Ultra-minified: ~2,300 tokens (removes all markdown formatting)
- Unoptimized: ~5,000+ tokens

## Using the Compiled Framework

### Option 1: In Chat LLMs
1. Run `python3 build.py` or `python3 build.py --no-markdown`
2. Navigate to `artifacts/build_YYYYMMDD_HHMMSS/`
3. Open the generated file (.md or .txt)
4. Copy the entire content
5. Paste at the beginning of your chat with the LLM
6. Follow with your project-specific instructions

### Option 2: In Project Folders
1. Run `python3 build.py` or `python3 build.py --no-markdown`
2. Copy the generated file from `artifacts/build_*/` to your project folder
3. Reference it when prompting your LLM:
   ```
   Please read promachos_framework_20250621.md and follow this framework for our project.
   ```

### Option 3: As a System Prompt
For LLMs that support system prompts:
1. Use the compiled framework content as the system prompt
2. This ensures consistent behavior across all conversations

## Customization

### Before Building
Edit these files to customize the framework:
- `core.md` - Modify framework behavior
- `prompts/*.md` - Adjust prompt templates
- `config.yaml` - Change default configurations

### Build Script Options
The `build.py` script can be modified to:
- Include/exclude specific sections
- Adjust minification level
- Add custom templates
- Generate different output formats

## Best Practices

1. **Regular Builds**: Rebuild after framework updates
2. **Version Control**: Keep compiled outputs in version control
3. **Documentation**: Include build date in filename
4. **Testing**: Test compiled framework with your LLM
5. **Optimization**: Monitor token usage and adjust as needed

## Troubleshooting

### Build Errors
- Ensure Python 3.x is installed
- Install required packages: `pip install pyyaml`
- Check file permissions

### Token Count Too High
- Review and shorten prompt templates
- Remove non-essential sections
- Use more aggressive minification

### Missing Content
- Verify all source files exist
- Check file paths in build.py
- Ensure proper file encoding (UTF-8)