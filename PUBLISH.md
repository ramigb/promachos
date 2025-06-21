# Publishing Checklist for Promachos

## Pre-Publishing Checklist

### ✅ Code Quality
- [x] All CLI commands work correctly
- [x] Global installation works (`npm install -g .`)
- [x] Tests pass (`npm test`)
- [x] No syntax errors or warnings
- [x] Dependencies are properly declared

### ✅ Package Configuration
- [x] `package.json` includes all required fields
- [x] `bin` field points to correct executable
- [x] `files` field includes only necessary files
- [x] Version number is appropriate
- [x] Keywords are relevant for discoverability

### ✅ Documentation
- [x] README.md is comprehensive and up-to-date
- [x] INSTALL.md provides clear installation instructions
- [x] PROTOCOL.md explains the collaboration protocol
- [x] All command help text is accurate

### ✅ File Structure
- [x] `.npmignore` excludes development files
- [x] `bin/promachos.js` is executable and has proper shebang
- [x] All source files use ES modules correctly
- [x] License file is present

## Publishing Steps

### 1. Final Testing
```bash
# Test local installation
npm install -g .
promachos --version
promachos --help

# Test in a new project
mkdir test-publish
cd test-publish
echo '{"name": "test"}' > package.json
promachos init --auto
promachos status
cd ..
rm -rf test-publish

# Run tests
npm test
```

### 2. Package Verification
```bash
# Check what will be published
npm pack --dry-run

# Verify package contents
npm pack
tar -tf promachos-1.0.0.tgz
rm promachos-1.0.0.tgz
```

### 3. Publishing to npm

#### First Time Setup
```bash
# Create npm account if needed
npm adduser

# Verify you're logged in
npm whoami
```

#### Publishing
```bash
# Publish to npm registry
npm publish

# Or publish with tag for beta testing
npm publish --tag beta
```

### 4. Post-Publishing Verification
```bash
# Test installation from npm
npm uninstall -g promachos
npm install -g promachos
promachos --version

# Verify on npm website
# Visit: https://www.npmjs.com/package/promachos
```

### 5. Update Documentation
- [ ] Update README.md with npm installation instructions
- [ ] Add npm badge to README
- [ ] Create GitHub release
- [ ] Update any external documentation

## Version Management

### Semantic Versioning
- **Patch** (1.0.1): Bug fixes, minor improvements
- **Minor** (1.1.0): New features, backwards compatible
- **Major** (2.0.0): Breaking changes

### Updating Version
```bash
# Patch version
npm version patch

# Minor version
npm version minor

# Major version
npm version major

# Then publish
npm publish
```

## Rollback Plan

If issues are discovered after publishing:

```bash
# Unpublish (only within 24 hours)
npm unpublish promachos@1.0.0

# Or deprecate
npm deprecate promachos@1.0.0 "This version has known issues"

# Publish fixed version
npm version patch
npm publish
```

## Monitoring

After publishing, monitor:
- Download statistics on npm
- GitHub issues and discussions
- User feedback and reviews
- Security vulnerabilities

## Success Metrics

Initial success indicators:
- [ ] 10+ downloads in first week
- [ ] No critical bugs reported
- [ ] Positive community feedback
- [ ] Documentation is clear to users

## Support Resources

- **npm Documentation**: https://docs.npmjs.com/
- **Semantic Versioning**: https://semver.org/
- **npm Best Practices**: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry