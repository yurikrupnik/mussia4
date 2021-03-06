/* eslint-disable */
/* ts-ignore */

// import path from 'path';
// import webpack from 'webpack';
// import TerserPlugin from 'terser-webpack-plugin';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import MiniCssExtractPlugin from 'mini-css-extract-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// import { OptimizeCSSAssetsPlugin } from 'optimize-css-assets-webpack-plugin';
// import LoadablePlugin from '@loadable/webpack-plugin';
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const noop = require("lodash/noop");
const reduce = require("lodash/reduce");
// eslint-disable-next-line @typescript-eslint/no-var-requires
let webpack = require("webpack");
// const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const LoadablePlugin = require("@loadable/webpack-plugin");
// const SizePlugin = require("size-plugin");
const { ESBuildPlugin, ESBuildMinifyPlugin } = require("esbuild-loader");

const cwd = process.cwd();
const json = require(path.resolve(cwd, "./package")); // eslint-disable-line

const alias = reduce(
    json.dependencies,
    (acc, v, k) => {
        acc[k] = path.resolve(cwd, "node_modules", k);
        return acc;
    },
    {}
);

module.exports = (env, argv) => {
    // console.log("json", json.config);
    // console.log("process.env.DB_PASSWORD", process.env.DB_PASSWORD);
    console.log("Client env, argv", env, argv);
    // console.log("PORT", process.env.PORT);
    // console.log("MODULE_PATH", process.env.MODULE_PATH);
    // const isProd = env ? !!env.prod : false;
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    // const isProd = process.env.NODE_ENV === "production";
    const isWatch = !!argv.watch;
    const isProd = !!argv.watch;
    console.log("isProd", isProd, argv.watch);
    // const config = isProd ? {} : require(path.resolve(cwd, './src/config')); // eslint-disable-line

    return {
        context: path.resolve(process.cwd(), "src"),
        optimization: {
            minimizer: [isProd ? new ESBuildMinifyPlugin() : noop],
        },
        target: "web",
        resolve: {
            extensions: [".ts", ".tsx", ".json", ".js", ".jsx", ".css", ".scss"],
            alias,
        },
        // devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
        entry: "./client.tsx",
        output: {
            // filename: "[name].[fullhash].js",
            filename: "[name].js",
            chunkFilename: "[name].js",
            path: path.resolve(process.cwd(), "dist/assets"),
            publicPath: "/",
        },
        mode: isProd ? "production" : "development",
        module: {
            rules: [
                {
                    test: /\.(tsx|ts|js|jsx)?$/,
                    loader: "esbuild-loader",
                    options: {
                        loader: "tsx",
                        target: "es2015",
                    },
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        "css-hot-loader",
                        !isProd ? "style-loader" : MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                modules: {
                                    localIdentName: isProd ? "[hash:base64]" : "[local]--[hash:base64:5]",
                                },
                            },
                        },
                        {
                            loader: "sass-loader",
                        },
                    ],
                },
                {
                    test: /\.ejs$/,
                    use: "raw-loader",
                },
                // {
                //     test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                //     use: [
                //         {
                //             loader: "file-loader",
                //             options: {},
                //         },
                //     ],
                // },
            ],
        },
        plugins: [
            new ESBuildPlugin(),
            new webpack.EnvironmentPlugin({
                NODE_ENV: isWatch ? "development" : "production",
                // NODE_ENV: "production", // use 'development' unless process.env.NODE_ENV is defined
                // DEBUG: false,
                PORT: 8080,
                DB_PASSWORD: "",
                DB_URL: "",
            }),
            // new webpack.DefinePlugin({
            //     // "process.env.PORT": JSON.stringify(process.env.PORT),
            //     // "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            //     // "process.env.DB_PASSWORD": JSON.stringify(process.env.DB_PASSWORD),
            //     // "process.env.DB_USER": JSON.stringify(process.env.DB_USER),
            //     // "process.env.DB_URL": JSON.stringify(process.env.DATABASE_URL),
            //     //     //     // "process.env.PORT": JSON.stringify(process.env.PORT),
            //     //     //     // 'process.env.host': JSON.stringify(process.env.host),
            //     //     //     // 'process.env.HOST': JSON.stringify(process.env.HOST),
            //     //     //     // 'process.env.dest_port': JSON.stringify(process.env.dest_port),
            //     //     //     // 'process.env.DEST_PORT': JSON.stringify(process.env.DEST_PORT),
            //     //     //     // 'process.env.DESTINATION_HOST': JSON.stringify(process.env.DESTINATION_HOST),
            //     //     //     // 'process.env.DOCKER_HOST': JSON.stringify(process.env.DOCKER_HOST)
            // }),
            new HtmlWebpackPlugin({
                template: "index.ejs",
                filename: "index.ejs",
                favicon: "assets/favicon.ico",
                // templateParameters: {
                //     MY_VAR: "myVar",
                //     PORT: "6007",
                // },
                nodeModules: false,
                meta: {
                    charset: "UTF-8",
                    viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                },
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                },
            }),
            // new SizePlugin(),
            // new MiniCssExtractPlugin({
            //     filename: !isProd ? "[name].css" : "[name].[hash].css",
            //     chunkFilename: !isProd ? "[id].css" : "[id].[hash].css",
            // }),
            new LoadablePlugin(),
            // !isProd && process.cwd().includes("webserver1")
            //     ? new BundleAnalyzerPlugin({})
            //     : new BundleAnalyzerPlugin({
            //           analyzerMode: "static",
            //           openAnalyzer: false,
            //       }),
        ],
        devServer: {
            // port: json.config.port + 1 || 4001,
            // open: true,
            // host: process.env.NODE_ENV_DOCKER ? "0.0.0.0" : "localhost",
            // index: "index.ejs",
            // proxy: {
            //     "/": { target: `http://localhost:${json.config.port}` },
            // },
            contentBase: path.join(__dirname, "dist/"),
            // port: json.config.port + 100 || 8080,
            // port: 8081,
            port: Number(process.env.PORT) + 1 || json.config.port + 1 || 8080,
            open: true,
            disableHostCheck: true,
            host: process.env.NODE_ENV_DOCKER ? "0.0.0.0" : "localhost",
            proxy: {
                "/": { target: `http://localhost:${Number(process.env.PORT) || json.config.port}` },
            },
        },
    };
};
