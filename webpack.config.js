const path = require('path');

module.exports = {
    entry: './js/all.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'webpack.bundle.js'
    },
     devServer: {
        contentBase: './dist',
    },
};