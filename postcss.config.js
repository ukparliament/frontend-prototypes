module.exports = {
  plugins: [
    require('autoprefixer')({ grid: true, browsers: ['>1%'] }),
    require('cssnano')
  ]
}
