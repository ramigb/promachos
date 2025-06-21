#!/usr/bin/env node
/**
 * Basic CLI functionality test
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runTest() {
  console.log('🧪 Testing Promachos CLI...\n');

  const cliPath = join(__dirname, 'bin', 'promachos.js');
  
  try {
    // Test 1: Version command
    console.log('1. Testing version command...');
    const { stdout: version } = await execAsync(`node ${cliPath} --version`);
    if (version.includes('1.0.0')) {
      console.log('   ✅ Version command works');
    } else {
      throw new Error('Version command failed');
    }

    // Test 2: Help command
    console.log('2. Testing help command...');
    const { stdout: help } = await execAsync(`node ${cliPath} --help`);
    if (help.includes('Commands:') && help.includes('init')) {
      console.log('   ✅ Help command works');
    } else {
      throw new Error('Help command failed');
    }

    console.log('\n🎉 All tests passed! CLI is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

runTest();