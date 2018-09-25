'use strict';
// const webpack = require('webpack');
const htmlWebpackPlugin = require('htmlWebpackPlugin');
const path = require('path')
const utils = require('./utils')
let assetsPath = '';
if(process.env.NODE_ENV === 'development'){
    assetsPath = utils.assetsPath('static')
}else if(process.env.NODE_ENV === 'production'){
    assetsPath = utils.assetsPath(__dirname,'/')
}

module.exports = {
    context: path.join(__dirname,'../'),// 指定绝对根目录
    entry: utils.outputPath(process.env.NODE_ENV,utils.config),// 指定webpack打包的入口文件
    output:  utils.outputPath(process.env.NODE_ENV,utils.config),// 执行输出路径，此处dev采用热加载，pro使用dist文件夹，所以需要使用工具方法
    cache: true,// 开启缓存
    resolve:{
        extensions:['.js','.css','.json','.jsx'],// 指定需要被自动解析的文件后缀名
        modules: ["node_modules", path.join(__dirname,'../src')],// 指定需要自动解析的文件目录
    },
    module:{
        rules: [
            {
            // 异步加载模块
            test: /\.bundle\.js$/,
            include: utils.common.codePath,
            loader: 'bundle-lader',
            option: {
                name: '[name]',// 为导入的 bundle 配置自定义文件名
                lazy: true // 异步加载导入的 bundle
            }
        },
        // eslint
        {
            test: /\.(js|jsx)$/,
            include: utils.common.codePath,
            enforce: 'pre', // 执行前置
            loader: 'eslint-loader',
            option: {
                formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
            }
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: process.evn.NODE_ENV === "development" ? assetsPath('imgs/[name].[hash:7].[ext]') : assetsPath('fonts/[name].[ext]')
            }
        },
        {
            test: /\.(mp4|webm|ogg|wav|flac|acc|mp3)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: process.evn.NODE_ENV === "development" ? assetsPath('medias/[name].[hash:7].[ext]') : assetsPath('fonts/[name].[ext]')
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              name: process.evn.NODE_ENV === "development" ? assetsPath('fonts/[name].[hash:7].[ext]') : assetsPath('fonts/[name].[ext]')
            }
        },
        // babel配置
        {
            test: /\.(js\jsx)$/,
            loader: 'babel-loader',
            exclude: utils.common.modulesPath,
            include: utils.common.codePath,
            // babel其他配置在.babelrc中配置
        }
    ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(utils.common.codePath,'index.html'),
            filename: 'index.html',
            inject: 'body',
            cache: false,
        }),
        new webpack.ProvidePlugin({ // 全局引入jquery
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            'window.$': 'jquery',
          })
    ]
}
