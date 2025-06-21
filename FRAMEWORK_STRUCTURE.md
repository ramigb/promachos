# Framework Structure and Separation of Concerns

## Overview
This document defines how the Promachos framework maintains separation between framework core files and user project files, enabling framework updates without affecting user artifacts.

## Directory Structure

### Framework Core (Immutable)
These files constitute the framework and should NOT be modified by users:
```
prompting-framework/
├── core.md                  # Core framework logic
├── onboard.md              # Quick start guide
├── prompts/                # Framework prompt templates
│   ├── analyze.md
│   ├── create.md
│   └── debug.md
├── FRAMEWORK_STRUCTURE.md  # This file
└── build.py                # Build script
```

### User Space (Mutable)
These files/directories are user-specific and preserved during framework updates:
```
prompting-framework/
├── config.yaml             # User configuration
├── project.md              # User project description
├── project_progress.json   # Project progress tracking
├── context.md              # Conversation history
├── tasks.json              # Task tracking
├── artifacts/              # User outputs
│   └── [timestamp]/
├── logs/                   # User logs
│   └── errors.log
└── prompts/custom/         # User custom prompts (optional)
```

## Update Mechanism

### Framework Updates
When updating the framework:
1. Only framework core files are replaced
2. User space files remain untouched
3. New framework features are backward compatible

### User Data Preservation
The following are NEVER modified during framework updates:
- config.yaml (user settings)
- project.md (project description)
- All JSON tracking files
- artifacts/ directory
- logs/ directory
- Any custom user prompts

## Best Practices

### For Framework Developers
1. Never modify user space files in framework updates
2. Maintain backward compatibility
3. Document breaking changes clearly
4. Version framework releases

### For Users
1. Keep custom modifications in user space
2. Don't modify framework core files
3. Use custom prompts directory for extensions
4. Back up artifacts regularly

## File Categories

### Read-Only (Framework)
- core.md
- onboard.md
- prompts/*.md (except custom/)
- FRAMEWORK_STRUCTURE.md

### Read-Write (User)
- config.yaml
- project.md
- *.json files
- context.md
- artifacts/**
- logs/**
- prompts/custom/**

## Migration Guide

When updating from one framework version to another:

1. **Backup Current Project**
   ```bash
   cp -r prompting-framework/ prompting-framework-backup/
   ```

2. **Update Framework Core**
   - Replace core.md
   - Replace onboard.md
   - Replace prompts/ (except custom/)
   
3. **Preserve User Data**
   - Keep all user space files intact
   - Merge any new config options if needed

4. **Verify Compatibility**
   - Check CHANGELOG.md for breaking changes
   - Test with existing project files