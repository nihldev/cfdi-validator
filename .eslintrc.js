{
  "env": {
      "browser": true,
      "es6": true
    },
    "extends": [
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "prettier/@typescript-eslint",
      "eslint:recommended",
    ],
    "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaFeatures": {
        "project": "./tsconfig.json"
      },
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "plugins": [
      "prettier",
      "json",
    ]
}
