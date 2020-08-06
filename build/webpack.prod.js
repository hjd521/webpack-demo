const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.base.js')
const  BundleAnalyzerPlugin  =  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const OptimizeCssAssetsPlugin =  require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = merge(common, {
    devtool: 'souce-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[contenthash].[name].js",
        chunkFilename: '[contenthash].[name].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        // 定义环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // 压缩css
        new OptimizeCssAssetsPlugin(),
        new BundleAnalyzerPlugin()
    ],
    
    mode: "production"
})