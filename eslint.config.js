import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    // shadcn/ui components and its generated hooks are vendored: they are added
    // via `npx shadcn add` and re-generated from upstream, so local edits get
    // lost. eslint-plugin-react-hooks v7 brings the React Compiler rules, and
    // upstream shadcn trips three of them -- setState-in-effect in carousel and
    // use-mobile, and Math.random() during render in sidebar's skeleton width.
    // Exempt the vendored paths rather than fork them; the rules stay enforced
    // on everything hand-written here.
    files: ["src/components/ui/**", "src/hooks/use-mobile.tsx"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
);
