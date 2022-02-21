const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');


module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist-dev'),
        assetModuleFilename: "./src/client/views/img/[name][ext]"

    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    devServer: {
        port: 8010,
        static: {
            directory: path.resolve(__dirname, './dist-dev')
        },
        devMiddleware: {
            index: 'index.html',
            writeToDisk: true
        }
    },

    module: {
        rules: [
            
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },

            {
                test: '/\.js$/',
                exclude: /node_modules/,

                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            }            
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "src/client/views/index.html",
            filename: "index.html"
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new Dotenv(),
    ]
}
