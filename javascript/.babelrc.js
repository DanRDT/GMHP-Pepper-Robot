module.exports = function (api) {
  api.cache(true)

  const presets = ['@babel/preset-env']
  // const presets = ['babel-preset-es2015']
  // es2015
  // babel-preset-es2015

  return {
    presets,
  }
}
