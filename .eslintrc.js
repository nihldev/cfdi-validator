{
  "env": {
      "browser": true,
      "es6": true
    },
    "extends": [
      "plugin:@typescript-eslint/recommended",
      "plugin:css-modules/recommended",
      "prettier",
      "prettier/@typescript-eslint",
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaFeatures": {
        "project": "./tsconfig.json",
        "jsx": true
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "plugins": [
      "react",
      "prettier",
      "html",
      "json",
      "css-modules"
    ],
    "settings": {
      "react": {
        "version": "detect"
      }
    }
}
