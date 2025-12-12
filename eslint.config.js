import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import { reactRules, typescriptRules, baseRules } from './config/index.js';
import vitest from 'eslint-plugin-vitest';
import testingLibrary from 'eslint-plugin-testing-library';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    plugins: {
      react
    },
    rules: {
      ...baseRules,
      ...typescriptRules,
      ...reactRules
    }
  },
  {
    files: ['**/*.{test,spec}.{ts,tsx}', '**/tests/**/*.{ts,tsx}'],
    plugins: {
      vitest,
      'testing-library': testingLibrary
    },
    languageOptions: {
      globals: {
        ...globals.node
      }
    },
    rules: {
      ...(vitest.configs.recommended?.rules || {}),
      ...(testingLibrary.configs.react?.rules || {})
    }
  }
]);
