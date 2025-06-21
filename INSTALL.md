# Promachos Installation Guide

## Requirements

- **Node.js**: Version 16.0.0 or higher
- **npm**: Version 7.0.0 or higher (comes with Node.js)

## Installation Methods

### Method 1: Global Installation (Recommended)

Install Promachos globally to use it anywhere:

```bash
npm install -g promachos
```

After installation, verify it works:

```bash
promachos --version
promachos --help
```

### Method 2: Use with npx (No Installation)

Run Promachos without installing:

```bash
npx promachos init
npx promachos start
```

### Method 3: Local Development Installation

For development or testing:

```bash
# Clone the repository
git clone https://github.com/ramigb/promachos.git
cd promachos

# Install dependencies
npm install

# Install globally from source
npm install -g .

# Or test locally
npm start -- --help
```

## Quick Start After Installation

1. **Navigate to your project**:
   ```bash
   cd /path/to/your/project
   ```

2. **Initialize Promachos Protocol**:
   ```bash
   promachos init --auto
   ```

3. **Start collaborating with AI**:
   ```bash
   promachos start --copy
   ```

4. **Paste the copied prompt into your AI assistant** (ChatGPT, Claude, etc.)

## Verification

Test your installation:

```bash
# Check version
promachos --version

# Test initialization in a temporary directory
mkdir test-promachos
cd test-promachos
echo '{"name": "test"}' > package.json
promachos init --auto
promachos status
cd ..
rm -rf test-promachos
```

## Troubleshooting

### Command Not Found
```bash
# Check if npm global bin is in your PATH
npm config get prefix
# Add to your shell profile if needed:
# export PATH=$PATH:$(npm config get prefix)/bin
```

### Permission Issues (Unix/Linux/macOS)
```bash
# Fix npm permissions
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g promachos
```

### Windows PowerShell Execution Policy
```powershell
# If you get execution policy errors
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Node.js Version Issues
```bash
# Check Node.js version
node --version

# Install Node.js 16+ if needed
# Visit: https://nodejs.org/
```

## Uninstallation

To remove Promachos:

```bash
npm uninstall -g promachos
```

## Getting Help

- **CLI Help**: `promachos --help`
- **Command Help**: `promachos init --help`
- **Documentation**: [https://github.com/ramigb/promachos](https://github.com/ramigb/promachos)
- **Issues**: [https://github.com/ramigb/promachos/issues](https://github.com/ramigb/promachos/issues)

## Update

Update to the latest version:

```bash
npm update -g promachos
```

Check for updates:

```bash
npm outdated -g promachos
```