'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const friendlyErros = require('friendly-errors-webpack-plugin');
const clean = require('clean-webpack-plugin');
const utils = require('./utils');
const baseConfig = require('./baseConfig');

module.exports = merge(baseConfig,{
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                loader: 
            }
        ]
    }
})