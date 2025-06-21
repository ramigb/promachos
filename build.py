#!/usr/bin/env python3
"""
Build script to compile Promachos framework into a single, token-efficient file.
Usage: 
    python build.py                    # Standard build with markdown
    python build.py --no-markdown      # Ultra-minified without markdown formatting
"""

import os
import sys
import json
import yaml
import re
from datetime import datetime

def minify_content(content, remove_markdown=False):
    """Remove unnecessary whitespace and comments while preserving structure."""
    if remove_markdown:
        # Remove all markdown formatting
        content = re.sub(r'^#+\s+', '', content, flags=re.MULTILINE)  # Remove headers
        content = re.sub(r'\*\*([^*]+)\*\*', r'\1', content)  # Remove bold
        content = re.sub(r'\*([^*]+)\*', r'\1', content)  # Remove italic
        content = re.sub(r'`([^`]+)`', r'\1', content)  # Remove inline code
        content = re.sub(r'```[^`]*```', '', content, flags=re.DOTALL)  # Remove code blocks
        content = re.sub(r'^\s*[-*]\s+', '', content, flags=re.MULTILINE)  # Remove bullet points
        content = re.sub(r'^\s*\d+\.\s+', '', content, flags=re.MULTILINE)  # Remove numbered lists
        content = re.sub(r'\[([^\]]+)\]\([^)]+\)', r'\1', content)  # Remove links
        content = re.sub(r'^>\s+', '', content, flags=re.MULTILINE)  # Remove blockquotes
        
    # Remove multiple blank lines
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    # Remove trailing whitespace
    content = re.sub(r'[ \t]+$', '', content, flags=re.MULTILINE)
    # Remove markdown comments
    content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    return content.strip()

def load_file(filepath, remove_markdown=False):
    """Load and minify file content."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        return minify_content(content, remove_markdown)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return ""

def build_framework(remove_markdown=False):
    """Build the framework into a single file."""
    output = []
    
    # Parse command line arguments
    no_markdown = remove_markdown or ('--no-markdown' in sys.argv)
    
    # Header
    if not no_markdown:
        output.append(f"# PROMACHOS Framework - Compiled Build")
        output.append(f"# Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        output.append("# Copy this entire content to use the framework in your project\n")
    else:
        output.append(f"PROMACHOS Framework - Compiled Build")
        output.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        output.append("Copy this entire content to use the framework in your project\n")
    
    # Core framework instructions
    if not no_markdown:
        output.append("## CORE FRAMEWORK")
    else:
        output.append("CORE FRAMEWORK")
    core_content = load_file('core.md', no_markdown)
    # Remove redundant headers from core
    core_content = re.sub(r'^# Core Framework Instructions\n', '', core_content)
    output.append(core_content)
    output.append("")
    
    # Prompt templates
    if not no_markdown:
        output.append("## PROMPT TEMPLATES")
    else:
        output.append("PROMPT TEMPLATES")
    prompts_dir = 'prompts'
    if os.path.exists(prompts_dir):
        for filename in ['analyze.md', 'create.md', 'debug.md']:
            filepath = os.path.join(prompts_dir, filename)
            if os.path.exists(filepath):
                if not no_markdown:
                    output.append(f"\n### {filename.replace('.md', '').upper()} TEMPLATE")
                else:
                    output.append(f"\n{filename.replace('.md', '').upper()} TEMPLATE")
                content = load_file(filepath, no_markdown)
                output.append(content)
    
    # Configuration template
    if not no_markdown:
        output.append("\n## CONFIGURATION TEMPLATE")
        output.append("```yaml")
    else:
        output.append("\nCONFIGURATION TEMPLATE")
    if os.path.exists('config.yaml'):
        with open('config.yaml', 'r') as f:
            config = yaml.safe_load(f)
            # Create minimal config with essential fields only
            minimal_config = {
                'project': {
                    'name': 'your-project-name',
                    'type': config.get('project', {}).get('type', 'general'),
                    'language': config.get('project', {}).get('language', 'english')
                },
                'behavior': {
                    'verbosity': config.get('behavior', {}).get('verbosity', 'balanced'),
                    'explain_reasoning': config.get('behavior', {}).get('explain_reasoning', True),
                    'ask_before_execute': config.get('behavior', {}).get('ask_before_execute', True)
                },
                'output': {
                    'format': config.get('output', {}).get('format', 'markdown'),
                    'save_artifacts': config.get('output', {}).get('save_artifacts', True)
                }
            }
            output.append(yaml.dump(minimal_config, default_flow_style=False, sort_keys=False).strip())
    if not no_markdown:
        output.append("```")
    
    # Project template
    if not no_markdown:
        output.append("\n## PROJECT TEMPLATE")
        output.append("```markdown")
        output.append("# Project: [Your Project Name]")
        output.append("## Objectives")
        output.append("- Primary goal of the project")
        output.append("## Requirements")
        output.append("- List key requirements")
        output.append("## Success Criteria")
        output.append("- Define what success looks like")
        output.append("```")
    else:
        output.append("\nPROJECT TEMPLATE")
        output.append("Project: [Your Project Name]")
        output.append("Objectives:")
        output.append("Primary goal of the project")
        output.append("Requirements:")
        output.append("List key requirements")
        output.append("Success Criteria:")
        output.append("Define what success looks like")
    
    # Initial data structures
    if not no_markdown:
        output.append("\n## INITIAL DATA STRUCTURES")
        output.append("\n### project_progress.json")
        output.append("```json")
    else:
        output.append("\nINITIAL DATA STRUCTURES")
        output.append("\nproject_progress.json")
    progress_template = {
        "status": "not_started",
        "completion_percentage": 0,
        "current_phase": "planning",
        "last_updated": "ISO-8601 timestamp",
        "metrics": {}
    }
    output.append(json.dumps(progress_template, indent=2))
    if not no_markdown:
        output.append("```")
        output.append("\n### tasks.json")
        output.append("```json")
    else:
        output.append("\ntasks.json")
    tasks_template = {
        "tasks": []
    }
    output.append(json.dumps(tasks_template, indent=2))
    if not no_markdown:
        output.append("```")
    
    # Usage instructions
    if not no_markdown:
        output.append("\n## USAGE INSTRUCTIONS")
    else:
        output.append("\nUSAGE INSTRUCTIONS")
    output.append("1. Create a new directory for your project")
    output.append("2. Create these files:")
    output.append("   config.yaml (use template above)")
    output.append("   project.md (describe your project)")
    output.append("   project_progress.json (use template)")
    output.append("   tasks.json (use template)")
    output.append("   context.md (empty initially)")
    output.append("3. Create directories: artifacts/, logs/")
    output.append("4. Provide this compiled framework to your LLM")
    output.append("5. Ask LLM to work within this framework structure")
    
    # Join all sections
    compiled_content = '\n'.join(output)
    
    # Create artifacts directory if it doesn't exist
    artifacts_dir = 'artifacts'
    if not os.path.exists(artifacts_dir):
        os.makedirs(artifacts_dir)
    
    # Create build subdirectory with timestamp
    build_dir = os.path.join(artifacts_dir, f"build_{datetime.now().strftime('%Y%m%d_%H%M%S')}")
    os.makedirs(build_dir, exist_ok=True)
    
    # Write to output file
    file_extension = '.txt' if no_markdown else '.md'
    output_filename = f"promachos_framework_{datetime.now().strftime('%Y%m%d')}{file_extension}"
    output_path = os.path.join(build_dir, output_filename)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(compiled_content)
    
    # Calculate token estimate (rough approximation: 1 token ≈ 4 characters)
    char_count = len(compiled_content)
    token_estimate = char_count // 4
    
    print(f"✅ Framework compiled successfully!")
    print(f"📄 Output file: {output_path}")
    print(f"📊 Size: {char_count:,} characters (~{token_estimate:,} tokens)")
    print(f"💡 Mode: {'Ultra-minified (no markdown)' if no_markdown else 'Standard (with markdown)'}")
    print(f"💡 Tip: Copy the contents of {output_filename} to use in your project")

if __name__ == "__main__":
    build_framework()