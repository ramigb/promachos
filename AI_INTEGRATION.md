# AI Agent Integration Guide

## Overview

Promachos Protocol provides seamless integration with AI coding assistants through auto-discoverable instruction files. When you initialize a project with Promachos, it creates an AI-specific instructions file that coding agents automatically read and follow.

## Supported AI Assistants

### Claude (Anthropic)
- **File Created**: `CLAUDE.md`
- **Auto-Detection**: Claude Code immediately sees this file
- **Behavior**: Claude acknowledges the protocol and follows structured collaboration

### ChatGPT (OpenAI)
- **File Created**: `CHATGPT.md`
- **Auto-Detection**: When shared in conversation or via Code Interpreter
- **Behavior**: GPT understands protocol requirements and maintains state

### GitHub Copilot
- **File Created**: `COPILOT.md`
- **Auto-Detection**: Copilot Chat recognizes the instructions
- **Behavior**: Follows protocol guidelines for suggestions and edits

### Cursor IDE
- **File Created**: `CURSOR.md`
- **Auto-Detection**: Cursor's AI assistant reads on project open
- **Behavior**: Maintains protocol compliance in all interactions

### Generic/Multiple
- **File Created**: `AI_ASSISTANT.md`
- **Use Case**: When using multiple AI tools or unlisted assistants
- **Behavior**: Universal instructions any AI can follow

## How It Works

### 1. Initialization

When you run `promachos init`, you're asked which AI assistant you'll primarily use:

```bash
$ promachos init
? Which AI assistant will you primarily use? 
  > Claude (Anthropic)
    ChatGPT (OpenAI)
    GitHub Copilot
    Cursor
    Other/Multiple
```

### 2. File Creation

Based on your selection, Promachos creates:

**In Project Root:**
- `CLAUDE.md` (or appropriate AI file) - Instructions for the AI agent

**In .promachos/ Directory:**
- `README.md` - Protocol directory guide
- All protocol state files

### 3. AI Discovery

When an AI agent accesses your project:

1. **Sees Instructions File**: The AI immediately notices `CLAUDE.md`
2. **Reads Protocol Requirements**: Understands it should follow Promachos
3. **Loads Current State**: Checks `.promachos/` for context
4. **Acknowledges Protocol**: Confirms it will follow the structure
5. **Begins Collaboration**: Works within protocol constraints

### 4. Example Interaction

**Without Promachos:**
```
Human: "Help me refactor this auth module"
AI: "Sure! Can you show me the code and explain what changes you want?"
[Context lost between sessions]
```

**With Promachos:**
```
Human: [Opens project with Claude Code]
Claude: "I see CLAUDE.md - I acknowledge the Promachos Protocol is active.
         Checking .promachos/progress.json... 
         You're 65% complete with the auth module refactoring.
         Last session we completed JWT implementation but tests were failing.
         Should I continue debugging the test failures?"
```

## Instructions File Structure

The AI instructions file contains:

```markdown
# 🤖 AI Assistant Instructions - Promachos Protocol Active

## Quick Start for AI Assistants
1. Acknowledge Protocol
2. Load Context
3. Follow Rules

## Protocol Files Location
- `.promachos/config.yaml` - Behavior rules
- `.promachos/project.md` - Project context
- `.promachos/context.md` - Decision history
- [etc...]

## Your Responsibilities
1. Update Progress
2. Document Decisions
3. Track Tasks
4. Save Outputs

## Collaboration Rules
[Specific to project configuration]
```

## Configuration

### Setting AI Assistant

**During Init:**
```bash
promachos init  # Interactive prompt
```

**Auto Mode:**
```bash
promachos init --auto  # Defaults to Claude
```

**Config File:**
```yaml
project:
  ai_assistant: claude  # claude, chatgpt, copilot, cursor, generic
```

### Changing AI Assistant

To switch AI assistants after initialization:

1. Edit `.promachos/config.yaml`
2. Change `ai_assistant` value
3. Manually rename the instructions file
4. Or re-run `promachos init --force`

## Best Practices

### For Developers

1. **Choose Primary AI**: Select the AI you use most often
2. **Generic for Teams**: Use "generic" if team uses different AIs
3. **Keep Updated**: Ensure AI instructions reflect current project state
4. **Review AI Work**: Verify AI follows protocol correctly

### For AI Assistants

When you see a Promachos instructions file:

1. **Always Acknowledge**: Confirm you've seen the protocol
2. **Load Full Context**: Read all protocol files before starting
3. **Update Continuously**: Maintain state files during work
4. **Document Decisions**: Use context.md for important choices
5. **Structured Output**: Follow artifact naming conventions

## Advanced Integration

### Custom AI Instructions

Edit the generated instructions file to add:
- Project-specific guidelines
- Coding standards
- Security requirements
- Performance constraints

### Multiple AI Assistants

If using multiple AIs:
1. Choose "generic" during init
2. Create `AI_ASSISTANT.md`
3. All AIs will follow same protocol
4. Ensures consistency across tools

### CI/CD Integration

```yaml
# .github/workflows/ai-review.yml
- name: Check AI Protocol Compliance
  run: |
    promachos status --json
    # Verify AI has updated required files
```

## Troubleshooting

### AI Doesn't See Instructions

1. Ensure file is in project root
2. File must be named correctly (CLAUDE.md, etc.)
3. Some AIs need explicit mention of the file

### AI Ignores Protocol

1. Remind AI about Promachos Protocol
2. Point to specific instruction file
3. Verify AI has access to .promachos/ directory

### State Not Updating

1. Check AI has write permissions
2. Remind AI to update protocol files
3. Verify JSON files are valid

## Future Enhancements

- IDE plugin integration
- Real-time protocol monitoring
- AI performance metrics
- Cross-AI handoff improvements
- Protocol compliance scoring

## Summary

The AI agent integration makes Promachos Protocol truly seamless:
- Zero-friction for AI assistants
- Automatic protocol awareness
- Consistent behavior across tools
- Maintained state between sessions
- True human-AI collaboration