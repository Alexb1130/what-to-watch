const path = require('path');
const publicPath = path.join(__dirname, 'public');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
            },
            {
                test: /\.module\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]__[sha1:hash:hex:7]'
                            }
                        }
                    }
                ]
            },
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devtool: 'source-maps',
    plugins: [
        new MomentLocalesPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ]
};
