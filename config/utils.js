'use stract';
const ip = require('ip').address();
const path = require('path');
const packageConfig = require('../package.json')

exports.config = {
    common: {
        codePath: path.join(__dirname,'../src'),
        modulesPath: path.join(__dirname,'../node_modules')
    },
    development:{
        env: {
            NODE_ENV: 'development'
        },
        entry: './src/index.js',
        rootPath: 'dev',
        publicPath: '/',
        ipPort: 8080, // 本地服务端口号
    },
    production: {
        env: {
            NODE_ENV: 'production'
        },
        entry: './src/index.js',
        rootPath: 'dist',// 编译文件根目录
        publicPath: '/',// 编译发根路径
    }
}
// 打包入口函数
exports.entryPath = function(env,config){
    let entry = {};
    if(env && env === 'production'){
        config = config.production;
        entry.app = config.entry || '/src/index.js';
    }else if(env && env === 'development'){
        config = config.development;
        // 配置热加载，自动编译替换
        // webpack/hot/dev-server 和 webpack/hot/only-dev-server 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
        entry.app = [`webpack-dev-server/client://http:${ip}:${config.ipPort || 8080}`,'webpack/hot/only-dev-server',config.entry || './src/index.js'];
    }
    // 外部文件另行打包
    entry.vendor = Object.keys(packageConfig.dependencies);
    return entry
}
// 打包出口函数
exports.outputPath = function(env,config){
    let output = {};
    if(env && env === 'production'){
        output.filename ='js/[name].js';
        config = config.production;
    }else if(env && env === 'development'){
        output.filename ='js/[name].[chunkhash:10].js';
        config = config.development;
    }
    output.path = config.rootPath; // 编译文件所在根目录
    output.publicPath = config.publicPath; // 公共路径

    return output
}

// 路径函数
exports.assetsPath = function(...rootPath){
    return (path,env) => {
        return path.join(...rootPath,path||'')
    }
}

// 样式解析方法
exports.computeStyleLoader = function(isProduction,loaders){
    
    if(isProduction){
        
    }
}