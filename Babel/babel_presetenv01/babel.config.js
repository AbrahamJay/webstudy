module.exports = {
  presets: [["@babel/env", {
    targets: {
      "chrome": "38"
    },
    useBuiltIns: 'usage',
    corejs: 3,
    // modules: false
  }]],
  plugins: []
}
