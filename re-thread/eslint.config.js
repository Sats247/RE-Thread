import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/services/mock/*', '@/services/mock/*'],
              message: 'Illegal import: components, hooks, and stores must NEVER import from services/mock/*. Use services/index.ts instead.',
            },
          ],
        },
      ],
    },
  },
  {
    // Specific restriction: services/index.ts is the ONLY file allowed to import from services/mock/*
    files: ['src/services/mock/**', 'src/services/index.ts', 'src/main.tsx'],
    rules: {
      'no-restricted-imports': 'off',
    },
  }
);
