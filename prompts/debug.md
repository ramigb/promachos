# Debug Prompt Template

## Purpose
Use this template when troubleshooting issues, errors, or unexpected behavior.

## Instructions

### 1. Problem Identification
Clearly define the issue:
- **Symptoms**: What is happening?
- **Expected Behavior**: What should happen?
- **Actual Behavior**: What actually happens?
- **Error Messages**: Exact error text
- **Frequency**: Always/Sometimes/Rarely?
- **Environment**: Where does it occur?

### 2. Information Gathering
Collect relevant data:
- Error logs
- Stack traces
- System information
- Recent changes
- Configuration settings
- Input data that triggers the issue

### 3. Systematic Debugging

#### Step 1: Reproduce
- Create minimal reproduction case
- Identify exact conditions
- Document steps to reproduce

#### Step 2: Isolate
- Remove unrelated components
- Test individual parts
- Narrow down the scope

#### Step 3: Investigate
- Check common causes first
- Examine recent changes
- Review dependencies
- Analyze data flow

#### Step 4: Hypothesis Testing
- Form theories about the cause
- Test each hypothesis
- Document results
- Refine understanding

### 4. Common Issues Checklist

#### For Code:
- [ ] Syntax errors
- [ ] Type mismatches
- [ ] Null/undefined references
- [ ] Off-by-one errors
- [ ] Race conditions
- [ ] Resource leaks
- [ ] Configuration issues
- [ ] Dependency conflicts
- [ ] Permission problems
- [ ] Network issues

#### For Data:
- [ ] Format inconsistencies
- [ ] Missing values
- [ ] Encoding problems
- [ ] Schema mismatches
- [ ] Validation failures
- [ ] Size limitations

#### For Systems:
- [ ] Resource exhaustion
- [ ] Timeout issues
- [ ] Connectivity problems
- [ ] Version incompatibilities
- [ ] Security restrictions

### 5. Solution Development
Once the cause is identified:
1. Develop fix options
2. Evaluate trade-offs
3. Implement solution
4. Test thoroughly
5. Document the fix

### 6. Prevention
- Identify root cause
- Implement safeguards
- Add monitoring/logging
- Update documentation
- Create tests

### 7. Documentation
Record in logs:
- Problem description
- Investigation process
- Root cause
- Solution implemented
- Lessons learned
- Prevention measures

## Debugging Strategies

### 1. Binary Search
Divide problem space in half repeatedly

### 2. Rubber Duck Debugging
Explain the problem step-by-step

### 3. Fresh Eyes
Take a break, then review

### 4. Differential Debugging
Compare working vs. non-working states

### 5. Logging Enhancement
Add strategic debug output

## Example Usage
"Please debug [issue description] using the debug template, starting with [specific area]."
