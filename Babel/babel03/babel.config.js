module.exports = {
  presets: [
    [
      '@babel/env'
      // {
      //   "useBuiltIns": "usage"
      // }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2
      }
    ]
  ]
}