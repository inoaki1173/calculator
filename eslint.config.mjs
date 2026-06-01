import { defineConfig } from 'eslint/config'
import tseslint from '@electron-toolkit/eslint-config-ts'
import eslintConfigPrettier from '@electron-toolkit/eslint-config-prettier'
import eslintPluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default defineConfig(
  { ignores: ['**/node_modules', '**/dist', '**/out'] },
  tseslint.configs.recommended,
  eslintPluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        extraFileExtensions: ['.vue'],
        parser: tseslint.parser
      }
    }
  },
  {
    files: ['**/*.{mjs,ts,mts,tsx,vue}'],
    rules: {
      'vue/require-default-prop': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts'
          }
        }
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            // static-fields
            'public-static-field',
            'protected-instance-field',
            'private-static-field',
            // static-methods
            'public-static-method',
            'protected-static-method',
            'private-static-method',
            // instance-fields
            'public-instance-field',
            'protected-instance-field',
            'private-instance-field',
            // constructors
            'public-constructor',
            'protected-constructor',
            'private-constructor',
            // getters / setters
            'public-accessor',
            'protected-accessor',
            'private-accessor',
            // methods
            'public-method',
            'protected-method',
            'private-method'
          ]
        }
      ]
    }
  },
  eslintConfigPrettier
)
