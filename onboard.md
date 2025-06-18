# LLM ONBOARDING - READ THIS FIRST

## FRAMEWORK OVERVIEW
Structured project management system. Follow these files in order.

## CRITICAL FILES
1. `core.md` - System instructions, operational guidelines
2. `config.yaml` - User preferences (verbosity, tools, behavior)
3. `project.md` - Current project details, requirements, scope
4. `project_progress.json` - Progress tracking (update after work)
5. `tasks.json` - Task breakdown and status (update regularly)
6. `context.md` - Conversation memory (append important decisions)

## WORKFLOW
```
START:
1. Read config.yaml → understand preferences
2. Read project.md → understand goals
3. Check project_progress.json → see current state
4. Check tasks.json → identify next work
5. Review context.md → recall past decisions

WORK:
1. Select task from tasks.json
2. Use prompts/*.md templates when applicable
3. Save outputs to artifacts/[timestamp]/
4. Update project_progress.json
5. Update tasks.json status
6. Log errors to logs/errors.log

END:
1. Summarize work in context.md
2. Update all progress files
3. Note next steps in project_progress.json
```

## OUTPUT RULES
- All generated content → `artifacts/YYYY-MM-DD_HH-MM-SS/`
- Follow output format from config.yaml
- Include metadata in outputs

## TEMPLATES
- `prompts/analyze.md` - Use for analysis tasks
- `prompts/create.md` - Use for generation tasks  
- `prompts/debug.md` - Use for troubleshooting

## KEY BEHAVIORS
- Respect `ask_before_execute` in config
- Match `verbosity` setting
- Update progress files after each milestone
- Break large tasks into subtasks
- Document decisions in context.md

## QUICK START
```
1. Read this file
2. Read core.md for detailed instructions
3. Load project.md
4. Begin work following the workflow above
```

END OF ONBOARDING. Proceed to core.md for detailed instructions.
