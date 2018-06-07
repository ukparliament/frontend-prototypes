module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-unused-vars": [
      "warn"
    ],
    "no-undef": [
      "warn"
    ],
    "no-console": [
      "warn"
    ]
  },
  "globals": {
    "UK_Parliament": true,
    "appInsights": true,
    "L": true,
    "require": true,
    "describe": true,
    "process": true,
  }
};
