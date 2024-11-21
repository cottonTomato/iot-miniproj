import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettierPlugin from 'eslint-config-prettier';

export default tsEslint.config(
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['node_modules', 'dist'],
    languageOptions: {
      ecmaVersion: 2017,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ['**/drizzle.config.ts'],
  },
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  prettierPlugin,
  {
    rules: {
      'prefer-const': 'warn',
      'no-shadow': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-shadow': 'warn',
    },
  }
);
