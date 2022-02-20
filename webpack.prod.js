const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin")

const DotEnv = require('dotenv-webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist')
    },
    mode: 'production',
    module: {
        rules: [
         
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },

            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
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
            }
        ]
    },
    optimization: {

        minimizer: [
            new CssMinimizerPlugin()
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].scss' }),
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
        new DotEnv(),

        new WorkboxPlugin.GenerateSW({

            clientsClaim: true,
            skipWaiting: true,
        }),
    ]
}
