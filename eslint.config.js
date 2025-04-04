import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
    {
        ignores: ["dist", "node_modules", "public", ".vercel"]
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            import: importPlugin,
            "jsx-a11y": jsxA11y,
            prettier
        },
        settings: {
            react: {
                version: "detect"
            }
        },
        rules: {
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,
            ...prettier.configs.recommended.rules,
            indent: ["error", 4],
            "comma-dangle": ["error", "never"],
            "react/react-in-jsx-scope": "off",
            "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
            "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
            "no-use-before-define": ["error", { variables: false }],
            "react/prop-types": "off",
            "@typescript-eslint/no-unused-vars": ["error"],
            "no-unused-vars": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "import/prefer-default-export": "off",
            "react/function-component-definition": "off",
            "no-var": "error",
            "@typescript-eslint/no-explicit-any": "error",
            semi: ["error", "always"],
            "no-multiple-empty-lines": ["error", { max: 1 }],
            "no-trailing-spaces": ["error"],
            "no-console": ["error", { allow: ["warn", "error"] }],
            quotes: ["error", "double"],
            "no-shadow": "error",
            eqeqeq: ["error", "always"],
            "no-empty-function": ["error"],
            "react/display-name": "off",
            "eol-last": ["error", "always"],
            "prefer-const": "error",
            "arrow-body-style": ["error", "as-needed"],
            "no-duplicate-imports": "error",
            "consistent-return": "error",
            "no-undef": "error",
            "object-shorthand": ["error", "always"],
            camelcase: ["error", { properties: "always" }],
            "no-else-return": "error",
            "import/no-commonjs": "off",
            "import/export": "off",
            "import/extensions": [
                "off",
                "ignorePackages",
                {
                    ts: "never",
                    tsx: "never",
                    js: "never",
                    jsx: "never"
                }
            ],
            "import/no-cycle": "off",
            "import/no-unresolved": "off",
            "jsx-a11y/anchor-is-valid": "off",
            "prettier/prettier": ["error", { tabWidth: 4 }]
        }
    },
    {
        files: ["tests/components/**/*.{ts,tsx,js,jsx}"],
        rules: {
            "no-undef": "off"
        }
    },
    eslintConfigPrettier
];
