# Sample Artifact

**Created**: 2024-01-01 12:00:00
**Type**: Example
**Task**: Demonstrate artifact structure

## Description
This is an example artifact showing how LLM outputs should be saved in the artifacts directory.

## Content
When the LLM creates any output (code, documents, analysis results), it should:
1. Create a timestamped directory
2. Save the output with a descriptive filename
3. Include metadata about the creation

## Example Code Output
```python
def example_function():
    """This is how code artifacts might look"""
    return "Hello from the prompting framework!"
```

## Metadata
- Session ID: example-session-001
- Related Task: task-001
- Status: Completed
- Time Spent: 0.5 hours

---
*This file demonstrates the artifact structure. Real artifacts will contain actual project outputs.*
