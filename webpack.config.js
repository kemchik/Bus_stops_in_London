'use strict'
var webpack = require('webpack')

module.exports = {
    entry: "./app.jsx",
    output:{
        filename: "bundle.js"
    },
    module:{
        rules:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options:{
                    presets:["env", "react"]
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    externals: {
        jquery: 'jQuery'
    }
};
