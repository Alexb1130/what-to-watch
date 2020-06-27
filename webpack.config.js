const path = require('path');
const publicPath = path.join(__dirname, 'public');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

module.exports = {
    mode: `development`,
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: publicPath,
        publicPath: "/"
    },
    devServer: {
        contentBase: publicPath,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    devtool: 'source-maps',
    plugins: [
        new MomentLocalesPlugin()
    ]
};
