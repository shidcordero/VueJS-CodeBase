var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require('webpack')

module.exports = {
    mode: "development",
    resolve: {
        extensions: [".js", ".vue"]
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: "vue-loader"
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: "babel-loader"
            },
            {
                test: /\.css$/,
                use: ["style-loader","css-loader" ]
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/index.html"
    }), new webpack.ProvidePlugin({
        $: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
        jQuery: 'jquery'
    }), new webpack.ProvidePlugin({
        bootbox: 'bootbox'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: "https://reqres.in/api"
        })
    },
    optimization: {
        splitChunks: {
        chunks: 'all'
        }
    }
}