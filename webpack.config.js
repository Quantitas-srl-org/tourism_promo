const path = require('path');

module.exports = {
  entry: ['./assets/js/scroll-timeline.js', './assets/js/script.webpack.js', './assets/js/cookie-eu-banner.js'],
  mode: 'development',
  output: {
    filename: 'script.js',
    path: path.resolve(__dirname, 'assets/js'),
  },
};