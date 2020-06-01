const Webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// Hide some plugin stat messages
class CleanUpStatsPlugin {
    shouldPickStatChild(child) {
        return !child.name.includes("mini-css-extract-plugin") &&
            !child.name.includes("vue-loader") &&
            !child.name.includes("html-webpack-plugin");
    }

    apply(compiler) {
        compiler.hooks.done.tap("CleanUpStatsPlugin", (stats) => {
            const children = stats.compilation.children;
            if (Array.isArray(children)) {
                stats.compilation.children = children
                    .filter(child => this.shouldPickStatChild(child));
            }
        });
    }
}

module.exports = {
    target: "web",
    entry: {
        app: "./src/main.ts"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js"
    },
    devtool: process.env.NODE_ENV === "development" ? "eval-source-map" : undefined,
    module: {
        rules: [
            {
                // Vue single file components
                test: /\.vue$/,
                use: ["vue-loader"]
            },
            {
                // TypeScript
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                // HTML
                // exclude index.html which is processed by HtmlWebpackPlugin
                test: /\.html$/,
                exclude: /index\.html$/,
                use: "html-loader"
            },
            {
                // CSS
                test: /\.css$/,
                use: [
                    "css-hot-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                // SASS
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                    {
                        loader: "sass-loader",
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            vue: true,
            eslint: process.env.NODE_ENV !== "development",
            eslintOptions: {
                configFile: path.resolve(process.cwd(), ".eslintrc.js")
            }
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CleanUpStatsPlugin(),
        new HtmlWebpackPlugin({
            template: "index.html",
            minify: false,
            hash: true
        }),
        new CopyWebpackPlugin({patterns: [
            {from: "favicon.ico"}
        ]}),
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.NODE_ENV === "development" ? "disabled" : "static",
            openAnalyzer: false
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                },
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all"
                }
            }
        }
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.common.js"
        },
        extensions: [".ts", ".js", ".vue"]
    },
    devServer: {
        port: 4000,
        historyApiFallback: {
            verbose: false
        },
        overlay: {
            warnings: true,
            errors: true
        }
    }
};
