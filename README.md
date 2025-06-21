<div align="center">
  <img src="assets/logo.png" alt="Promachos Logo" width="200" height="200">
  
  # PROMACHOS
  ### Human-AI Collaboration Protocol
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Framework Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/ramigb/promachos)
  [![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)](https://nodejs.org/)
  
  *A standardized protocol for consistent, trackable, and collaborative work between humans and AI agents*
</div>

---

## 🎯 What is Promachos?

**Promachos** is a collaboration protocol that establishes a standardized "contract" between humans and AI agents. Think of it as the "Git workflow" for AI-assisted development - providing structure, consistency, and accountability for teams working with LLMs.

### 🚨 The Problem We Solve

**The AI Collaboration "Wild West":**
- Teams improvise different ways to work with AI
- No standard handoff procedures between team members
- Context gets lost between AI sessions
- Inconsistent quality of AI assistance
- No audit trail of AI decisions and changes
- Difficult to scale AI adoption across organizations

### 🎯 The Promachos Solution

**A standardized protocol that provides:**

- 🤝 **Consistent Collaboration** - Standard structure for human-AI interaction
- 🔄 **Seamless Handoffs** - Team members can pick up where others left off
- 📊 **Progress Continuity** - Maintain context across multiple AI sessions
- 📋 **Audit Trail** - Track all AI decisions and changes
- ⚙️ **Team Standards** - Enforce consistent AI assistance quality
- 🏢 **Organizational Governance** - Scalable framework for enterprise AI adoption
- 🤖 **AI Agent Integration** - Auto-discovery for Claude, Copilot, Cursor, etc.

### ✨ Protocol Features

- 🚀 **Zero-Friction Onboarding** - `promachos init` establishes the protocol
- 🔍 **Smart Context Detection** - Auto-discovers project structure and needs
- 📊 **State Management** - Persistent tracking of AI collaboration progress
- 📋 **Universal AI Compatibility** - Works with ChatGPT, Claude, Copilot, etc.
- 🎨 **Flexible Implementation** - Adapts to any team workflow
- 💻 **Cross-Platform** - Consistent experience across environments

## 🚀 Quick Start

### Installation

```bash
# Install globally (recommended)
npm install -g promachos

# Verify installation
promachos --version

# Or use without installation
npx promachos init
```

**Requirements**: Node.js 16+ and npm 7+. See [INSTALL.md](INSTALL.md) for detailed installation instructions.

### Establish the Protocol (30 seconds)

```bash
# In your project directory
cd /path/to/your/project
promachos init --auto     # Establish protocol structure
promachos start --copy    # Generate structured AI prompt
```

Paste the generated prompt into any AI assistant. The AI now understands your project structure, history, and collaboration expectations.

### The Protocol in Action

**Before Promachos:**
```
Human: "Hey ChatGPT, can you help me refactor this React component?"
AI: "Sure! Can you share the code and tell me what you want to change?"
Human: *copies random files, loses context*
```

**With Promachos:**
```
Human: *pastes structured prompt*
AI: "I see you're working on the auth module (65% complete). Based on the context, you were implementing OAuth integration. The tests are failing on line 47. Should I continue where you left off or would you like me to review the current progress first?"
```

## 📖 Protocol Commands

### Establish Protocol Structure
```bash
promachos init                    # Interactive protocol setup
promachos init --auto             # Auto-detect project and establish protocol
promachos init --type react       # Specify project type for protocol
```

### Generate Collaboration Prompt
```bash
promachos start                   # Create structured AI prompt
promachos start --copy            # Copy to clipboard
promachos start --browser         # Open browser with prompt
promachos start --minimal         # Compact prompt for token limits
```

### Monitor Collaboration State
```bash
promachos status                  # Show current protocol state
promachos status --json           # Machine-readable output
promachos status --verbose        # Detailed collaboration history
```

### Configure Protocol Behavior
```bash
promachos config                         # Show protocol configuration
promachos config behavior.verbosity     # Get AI interaction preference
promachos config cli.auto_copy true     # Set collaboration preference
promachos config --edit                 # Open protocol config in editor
```

### Export Protocol State
```bash
promachos build                   # Build complete protocol prompt
promachos build --minimal         # Token-optimized version
promachos build --output ./collaboration-state.txt
```

## 📂 Protocol Structure

After establishing the protocol, Promachos creates:

```
your-project/
├── .promachos/                      # Protocol state directory
│   ├── config.yaml                  # Collaboration rules & preferences
│   ├── project.md                   # Standardized project description
│   ├── context.md                   # Human-AI interaction history
│   ├── progress.json                # Quantified collaboration progress
│   ├── tasks.json                   # Structured task tracking
│   ├── artifacts/                   # AI-generated outputs
│   │   └── build_*/                 # Protocol state snapshots
│   └── logs/                        # Collaboration audit trail
└── [your project files]             # Your actual codebase
```

### Protocol Files Explained

| File | Purpose | Who Updates |
|------|---------|-------------|
| `config.yaml` | AI behavior rules & team preferences | Humans |
| `project.md` | Structured project context | Humans + AI |
| `context.md` | Decision history & key insights | AI (supervised) |
| `progress.json` | Quantified progress metrics | AI |
| `tasks.json` | Structured task breakdown | Humans + AI |

## 🤖 AI Agent Integration

### Auto-Discovery for Coding Assistants

When you run `promachos init`, it creates an AI instructions file in your project root that coding assistants automatically discover:

- **Claude Code**: Creates `CLAUDE.md` with protocol instructions
- **GitHub Copilot**: Creates `COPILOT.md` for Copilot awareness
- **ChatGPT**: Creates `CHATGPT.md` for GPT integration
- **Cursor**: Creates `CURSOR.md` for Cursor IDE
- **Generic**: Creates `AI_ASSISTANT.md` for any AI tool

### How It Works

1. **Automatic Detection**: AI agents see the instructions file immediately
2. **Protocol Awareness**: The AI understands it should follow Promachos Protocol
3. **State Management**: AI knows where to find and update protocol files
4. **Consistent Behavior**: Same quality regardless of which AI tool you use

### Example: Claude Code

When Claude Code opens a project with Promachos:
```
Claude: "I see CLAUDE.md - I acknowledge the Promachos Protocol is active. 
Let me check .promachos/progress.json... You're 45% complete on the auth module. 
Should I continue where the last session left off?"
```

## 🎯 Supported Collaboration Contexts

Promachos establishes protocols for:

- **Frontend Projects**: React, Vue, Angular, Svelte, Next.js
- **Backend Systems**: Node.js, Express, Python, Django, Flask
- **Mobile Development**: React Native, Flutter
- **Languages**: JavaScript, TypeScript, Python, Java, Go, Rust, PHP, Ruby
- **Any codebase**: Universal protocol adaptable to any technology

## 💡 Team Collaboration Examples

### Scenario 1: Team Handoff
```bash
# Developer A (Monday)
$ cd user-auth-feature
$ promachos init --auto
$ promachos start --copy
[Works with AI assistant, makes progress]

# Developer B (Tuesday)  
$ promachos start
📊 Protocol State: user-auth-feature
📊 Previous Context: OAuth integration 60% complete
📊 Last Session: Added JWT middleware, tests failing
📋 Structured handoff prompt ready!
```

### Scenario 2: Multi-Session Complex Work
```bash
# Week 1: Architecture Planning
$ promachos start
AI: "I see this is a new e-commerce platform. Let's start with the database schema..."

# Week 2: Implementation
$ promachos start  
AI: "Continuing from last week's architecture. The user service is complete. Should I proceed with the payment integration as planned?"

# Week 3: Testing & Refinement
$ promachos start
AI: "The payment system is now integrated. I notice 3 remaining test failures. Based on our progress tracking, we're 85% complete..."
```

### Scenario 3: Code Review with AI
```bash
$ promachos start
AI: "I see 47 changed files since last session. The authentication module looks good, but I notice potential security issues in the password reset flow. Should I provide specific recommendations?"
```

## ⚙️ Protocol Configuration

### Collaboration Rules (`.promachos/config.yaml`)
```yaml
project:
  name: my-app
  type: react
  framework: React

behavior:
  verbosity: balanced           # How detailed should AI responses be?
  explain_reasoning: true       # Should AI explain its decisions?
  ask_before_execute: true      # Require human approval for changes?
  max_context_size: 8000        # Token limit for AI context

collaboration:
  update_progress: true         # AI should update progress.json
  track_decisions: true         # Log important decisions to context.md
  require_task_breakdown: true  # AI must break work into tasks

quality:
  code_review_level: standard   # thoroughness of AI code review
  test_requirements: true       # AI must consider test coverage
  documentation_level: standard # level of documentation expected
```

### Team Standards (`~/.config/promachos/config.yaml`)
Organization-wide collaboration standards that apply to all projects.

### Protocol Governance
```yaml
# Example enterprise configuration
governance:
  require_approval: ["database_changes", "security_updates"]
  audit_trail: true
  compliance_mode: "strict"
  allowed_ai_models: ["gpt-4", "claude-3"]
```

## 🔧 Advanced Protocol Usage

### Custom Collaboration Patterns
```bash
promachos init --type custom
# Then define custom collaboration rules in .promachos/project.md
```

### Team Workflow Integration
```bash
# In package.json (team standard)
{
  "scripts": {
    "ai": "promachos start --copy",
    "ai-handoff": "promachos status --verbose",
    "ai-review": "promachos start --minimal"
  }
}
```

### Enterprise Integration
```javascript
import { Promachos } from 'promachos';

// Programmatic protocol management
const promachos = new Promachos('./project');
await promachos.init({ 
  auto: true,
  governance: 'enterprise',
  auditLevel: 'strict'
});

const collaborationState = await promachos.build({ minimal: true });
// Send to approved AI models only
```

## 🎨 Protocol Optimization

Promachos optimizes collaboration for different contexts:

- **Standard Protocol**: ~3,000-4,000 tokens (full context & history)
- **Minimal Protocol**: ~2,000-2,500 tokens (essential context only)
- **Smart Context**: Automatically includes relevant previous decisions
- **Token Budget**: Respects AI model limits while preserving critical context

## 🤝 Collaboration Best Practices

### For Teams Adopting Promachos:

1. **Establish Protocol**: Use `promachos init` consistently across team
2. **Maintain State**: Let AI update protocol files after significant work
3. **Document Decisions**: Important choices get saved to `context.md`
4. **Regular Status**: Use `promachos status` for team standups
5. **Clean Handoffs**: Always run `promachos start` when taking over work

### For AI Assistants:

When you receive a Promachos prompt, you should:
1. **Acknowledge Protocol**: Confirm you understand the structured context
2. **Check Progress**: Review current status and previous decisions
3. **Follow Rules**: Respect the collaboration preferences in config.yaml
4. **Update State**: Maintain progress.json and context.md throughout work
5. **Structured Output**: Save deliverables to artifacts/ directory

## 🏢 Enterprise & Team Adoption

### Why Organizations Choose Promachos

**Governance & Compliance:**
- Audit trails for all AI interactions
- Standardized approval workflows
- Compliance with security policies
- Risk management for AI-generated code

**Team Efficiency:**
- Consistent AI assistance quality
- Reduced onboarding time for AI tools
- Knowledge preservation across team members
- Measurable productivity improvements

**Scalability:**
- Organization-wide standards
- Integration with existing workflows
- Support for multiple AI models
- Cross-project collaboration patterns

### Implementation Roadmap

**Phase 1**: Pilot team adopts Promachos protocol
**Phase 2**: Establish organization-wide standards
**Phase 3**: Integration with CI/CD and governance tools
**Phase 4**: Custom enterprise features and compliance

## 🛠️ Protocol Development

### Contributing to the Protocol
```bash
git clone https://github.com/ramigb/promachos.git
cd promachos
npm install
chmod +x bin/promachos.js

# Test protocol implementation
./bin/promachos.js init --auto
```

### Protocol Evolution
1. Fork the repository
2. Propose protocol improvements
3. Test with real team scenarios
4. Submit detailed pull request
5. Community review and adoption

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by teams struggling with inconsistent AI collaboration
- Built for the era of AI-assisted software development
- Designed to bring order to the "Wild West" of AI tooling
- Thank you to early adopters who helped refine the protocol

---

<div align="center">
  
  ### The Future of Human-AI Collaboration Starts Here
  
  **Promachos Protocol**: *Making AI collaboration predictable, trackable, and scalable*

</div>