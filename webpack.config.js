const Webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    mode: process.env.NODE_ENV,
    target: "web",
    entry: {
        app: "./src/main.ts"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js"
    },
    devtool: process.env.NODE_ENV === "development" ? "eval-cheap-module-source-map" : false,
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
                use: {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                            transpileOnly: true
                        }
                    }
            },
            {
                // HTML
                test: /\.html$/,
                exclude: /index\.html$/,
                use: "html-loader"
            },
            {
                // CSS
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, {
                        loader: "css-loader",
                        options: {
                            // Do not process urls that use a root path
                            // These may be static resources that do not need
                            // to be processed by Webpack (fonts/images etc)
                            url: {
                                filter: url => !url.startsWith("/")
                            }
                        }
                    },
                    "postcss-loader"
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            typescript: {
                extensions: {
                    vue: true
                },
                mode: "readonly"
            },
            eslint: {
                files: [
                    "./src/**/*.{ts,vue}"
                ],
                options: {
                    configFile: "./.eslintrc.js"
                }
            }
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new CopyWebpackPlugin({
            patterns: [
                "index.html",
                "favicon.ico",
            ]
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: process.env.NODE_ENV === "development" ? "disabled" : "static",
            openAnalyzer: false
        }),
        new Webpack.ProgressPlugin({
            activeModules: true
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    enforce: true,
                    chunks: "all"
                }
            }
        }
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.common.js",
        },
        extensions: [".ts", ".js", ".vue"],
    },
    // https://localhost/webpack-dev-server
    devServer: {
        // chrome://flags/#allow-insecure-localhost
        https: true,
        port: 5005,
        inline: true, // This enables HMR but breaks IE11
        overlay: {
            warnings: false,
            errors: true
        }
    }
};
