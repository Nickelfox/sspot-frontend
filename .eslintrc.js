// eslint-disable-next-line no-undef
module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    window: true,
    module: true
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:jest/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module",
    es6: true,
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-react"]
    }
  },
  plugins: ["react"],
  rules: {
    quotes: 0,
    curly: 0,
    semi: 0,
    "react/prop-types": 0,
    "no-unsafe-finally": 0,
    "prettier/prettier": 0,
    "keyword-spacing": 0,
    "jsx-quotes": 0,
    "consistent-this": 0,
    "eol-last": 0,
    "new-parens": 0,
    "no-array-constructor": 0,
    "no-empty-character-class": 0,
    "no-new-object": 0,
    "no-spaced-func": 0,
    "no-trailing-spaces": 0,
    "no-mixed-spaces-and-tabs": 0,
    "space-infix-ops": 0,
    "space-unary-ops": 0,
    "no-console": "warn"
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src", "./", "./src"],
        extensions: [".js", ".jsx"]
      }
    },
    react: {
      version: "detect"
    }
  }
}
