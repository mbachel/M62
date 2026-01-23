module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    env: {
        browser: true,
        es2022: true,
        node: true
    },
    settings: {
        react: {
            version: "detect"
        }
    },
    ignorePatterns: ["build", "dist", "node_modules"]
};