let common = require('./webpack.base')
const  BundleAnalyzerPlugin  =  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(common, {
    devtool: 'inline-source-map',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
        aggregateTimeout: 500, // 类似于函数的防抖节流的作用。
    },
    devServer: {
        contentBase: '../dist',
        compress: true,
        port: 9006,
        hot: true
    },
    plugins: [
        // 解决构建时候chunkhash会随着顺序改变的问题
        // new webpack.NamedModulesPlugin(),
        // 关于构建性能
        // 启用gzip压缩
        new CompressPlugin(
            {
                test: /\.js$|\.html$/,
                threshold: 10240,
                deleteOriginalAssets: false
            }
        ),
        // 将太小的chunk合并(最多合并5个chunck)
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 5
        }),
        // 合并小于1000的chunk
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 1000 // Minimum number of characters
        }),
        new BundleAnalyzerPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.NamedChunksPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        noParse: function(content) {
            return /jquery\.min\.js/.test(content)
        }
    },
    resolve: {
        mainFields: ['main', 'browser', 'node'], // 主要入口文件
        extensions: ['.js', '.json'] // 扩展名查找
    }
})