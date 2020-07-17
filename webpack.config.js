const path = require('path');

module.exports = {
    entry: './src/all.js',
    output: {
        path: path.resolve(__dirname, ''),
        filename: 'webpack.bundle.js'
    },
     devServer: {
         contentBase:  path.join(__dirname, '/'),
           },

};