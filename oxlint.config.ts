import { defineConfig } from "oxlint"

export default defineConfig({
  plugins: [
    "eslint",
    "typescript",
    "unicorn",
    "react",
    "react-perf",
    "oxc",
    "import",
    "jsx-a11y",
    "promise",
  ],
})
