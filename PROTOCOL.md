# Promachos Collaboration Protocol Specification

## Overview

The Promachos Protocol is a standardized framework for human-AI collaboration that establishes consistent, trackable, and accountable interactions between teams and AI assistants.

## Problem Statement

Without standardized protocols, AI collaboration suffers from:
- **Inconsistent Quality**: Different team members get varying levels of AI assistance
- **Lost Context**: No systematic way to maintain project state across sessions
- **Poor Handoffs**: Difficulty transferring AI-assisted work between team members
- **No Audit Trail**: Limited visibility into AI decisions and contributions
- **Scaling Challenges**: Hard to establish organization-wide AI governance

## Protocol Components

### 1. Structure (`/.promachos/`)

The protocol establishes a standardized directory structure:

```
project/
├── .promachos/                    # Protocol state directory
│   ├── config.yaml               # Collaboration rules & AI behavior
│   ├── project.md                # Structured project context
│   ├── context.md                # Decision history & key insights
│   ├── progress.json             # Quantified progress metrics
│   ├── tasks.json                # Structured task breakdown
│   ├── artifacts/                # AI-generated outputs
│   │   └── build_*/              # Timestamped protocol builds
│   └── logs/                     # Collaboration audit trail
└── [project files]               # Actual codebase/content
```

### 2. Configuration Contract (`config.yaml`)

Defines collaboration rules and AI behavior:

```yaml
project:
  name: string              # Project identifier
  type: string              # Project category (react, python, etc.)
  framework: string         # Technology framework

behavior:
  verbosity: enum           # minimal, balanced, detailed
  explain_reasoning: bool   # Should AI explain decisions?
  ask_before_execute: bool  # Require human approval?
  max_context_size: int     # Token limit for AI context

collaboration:
  update_progress: bool     # AI should update progress.json
  track_decisions: bool     # Log decisions to context.md
  require_task_breakdown: bool  # AI must structure work

quality:
  code_review_level: enum   # thoroughness of reviews
  test_requirements: bool   # AI must consider testing
  documentation_level: enum # expected documentation detail
```

### 3. State Management

**Progress Tracking (`progress.json`)**
```json
{
  "status": "string",           # Current project phase
  "completion_percentage": 0,   # Quantified progress
  "current_phase": "string",    # Active work area
  "last_updated": "ISO-8601",   # Timestamp
  "metrics": {}                 # Project-specific metrics
}
```

**Task Structure (`tasks.json`)**
```json
{
  "tasks": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "status": "pending|in_progress|completed",
      "priority": "low|medium|high",
      "dependencies": ["task_id"],
      "estimated_effort": "string",
      "assigned_to": "human|ai|both"
    }
  ]
}
```

**Context History (`context.md`)**
- Decision rationale and reasoning
- Key insights and lessons learned
- Important changes and their impact
- Handoff notes for team continuity

### 4. Collaboration Workflow

**Session Initialization**
1. AI acknowledges Promachos protocol
2. Loads collaboration rules from config.yaml
3. Reviews current state (progress, context, tasks)
4. Identifies handoff context if applicable
5. Establishes session goals within protocol

**Work Execution**
1. Follows established collaboration rules
2. Updates progress indicators in real-time
3. Documents decisions in context.md
4. Saves deliverables to artifacts/
5. Maintains task status in tasks.json

**Session Conclusion**
1. Updates progress.json with completion status
2. Documents key decisions in context.md
3. Prepares handoff notes for next session/teammate
4. Saves protocol state for continuity

## Protocol Benefits

### For Teams
- **Consistent Quality**: Standardized AI assistance across team members
- **Seamless Handoffs**: Any team member can continue AI-assisted work
- **Knowledge Preservation**: Institutional memory maintained across sessions
- **Improved Collaboration**: Clear expectations for human-AI interaction

### For Organizations
- **Governance**: Audit trails and approval workflows
- **Compliance**: Risk management for AI-generated content
- **Scalability**: Organization-wide standards for AI adoption
- **Quality Control**: Consistent standards for AI assistance

### For AI Assistants
- **Clear Expectations**: Defined behavior and output requirements
- **Context Continuity**: Systematic state management across sessions
- **Quality Standards**: Structured approach to assistance quality
- **Accountability**: Clear responsibility for protocol compliance

## Implementation Levels

### Individual Developer
- Personal AI assistance standardization
- Project continuity across sessions
- Structured approach to AI collaboration

### Team Adoption
- Shared collaboration standards
- Team member handoff capabilities
- Consistent AI assistance quality

### Organization Deployment
- Enterprise governance and compliance
- Cross-team collaboration patterns
- AI usage audit trails and metrics

## Protocol Evolution

The Promachos Protocol is designed to evolve with:
- New AI capabilities and models
- Changing team collaboration needs
- Enterprise governance requirements
- Industry best practices

## Compliance Levels

**Basic**: Core structure and state management
**Standard**: Full workflow and documentation
**Enterprise**: Governance, audit trails, and compliance features

## Getting Started

1. **Install Protocol Implementation**: `npm install -g promachos`
2. **Initialize Project**: `promachos init --auto`
3. **Generate AI Prompt**: `promachos start --copy`
4. **Begin Collaboration**: Paste structured prompt into AI assistant

The protocol is tool-agnostic and works with any AI assistant that can follow structured instructions.