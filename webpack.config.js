const path = require("path");
const MiniCss = require("mini-css-extract-plugin");
const MiniHTMLWebpack = require("html-webpack-plugin");

module.exports = {
    entry: "./index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /.(jsx?)$/,
            use: "babel-loader"
        },
        {
            test: /.(tsx?)$/,
            use: "awesome-typescript-loader"
        },
        { 
            test: /\.css$/i,
            use: [MiniCss.loader, "css-loader"],
        }]
    },
    mode: "production",
    resolve: {
        extensions: [".tsx", ".jsx"]
    },
    devtool: "source-map",
    optimization: {minimize: true},
    plugins: [
        new MiniCss({
            filename: "[name].css"
        }),
        new MiniHTMLWebpack({
            template: "index.html"
        }),
    ]
}