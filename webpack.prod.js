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
        // name of generated Javascript output file inserted (by the plugin 'HtmlWebPackPlugin') in the 'head' section of index.html
        filename: 'bundle.js',
        // folder where 'bundle.js' will be placed
        path: path.resolve(__dirname, './dist')
    },
    mode: 'production',
    module: {
        rules: [
            // CSS loader configuration; use 'MiniCssExtractPlugin' plugin to extract CSS into separate files
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader'
                ]
            },
            // SCSS (SASS) loader configuration
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
                ]
            },
            // Javascript loader configuration with transpiler options
            // NOTE: in production build mode, webpack automatically minimizes JS files 
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                // babel loader configuration for ES[6/7/8] transpiling
                use: {
                    loader: "babel-loader",
                    options: {
                        // transpiles Javascript code to cross-browser compatible (ES5) code
                        // presets: [ '@babel/env' ]
                        presets: ['@babel/preset-env']
                    }
                },
            }
        ]
    },
    optimization: {
        // minimize/compress/optimize the generated CSS code
        minimizer: [
            new CssMinimizerPlugin()
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].scss' }),
        new HtmlWebPackPlugin({
            template: "src/client/views/index.html",
            // filename: "./index.html"
            filename: "index.html"
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new DotEnv(),
        // generate the service worker file
        // NOTE: use this plugin only in production mode - Service Worker requires HTTPS/secure connection
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
        }),
    ]
}