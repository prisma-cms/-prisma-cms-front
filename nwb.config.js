module.exports = {
  type: 'react-app',
  npm: {
    esModules: false,
    umd: false
  },
  babel: {
    "presets": [
      "es2015",
      "stage-0",
      "react",
      // "react-hmre"
    ],
    "plugins": [
      // "transform-runtime",
      "transform-class-properties"
    ]
  }
}
