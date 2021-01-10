// const reduce = require('lodash/reduce');
const webpack = require("webpack");
const path = require("path");
const noop = require("lodash/noop");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeExternals = require("webpack-node-externals");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GenerateJsonPlugin = require("generate-json-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NodemonPlugin = require("nodemon-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
// const SwaggerJSDocWebpackPlugin = require("swagger-jsdoc-webpack-plugin");
// const JsDocPlugin = require("jsdoc-webpack-plugin-v2");
// const { StatsWriterPlugin } = require('webpack-stats-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require("copy-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const LoadablePlugin = require("@loadable/webpack-plugin");
// const SizePlugin = require("size-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ESBuildPlugin } = require("esbuild-loader");

const filename = "server.js";
const cwd = process.cwd();
const json = require(path.resolve(cwd, "./package")); // eslint-disable-line
const entry = json.name.includes("webserver") || json.name.includes("docs") ? "./index.ts" : "./index.ts";

// const alias = reduce(json.dependencies, (acc, v, k) => {
//     acc[k] = path.resolve(cwd, 'node_modules', k);
//     return acc;
// }, {});

// console.log('alias', alias);

module.exports = (env, argv) => {
    // const isProd = env ? !!env.prod : false;
    // const isProd = true;
    // const isProd = process.env.NODE_ENV === "production";
    const isWatch = !!argv.watch;
    // const isProd = !!argv.watch;
    // console.log("isProd", isProd, argv.watch);
    // const isDebug = env ? !!env.debug : false;
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    // console.log("cwd", cwd);
    console.log("Server env, argv", env, argv);
    // !isProd && require(path.resolve(cwd, './src/config')); // eslint-disable-line
    return {
        context: path.resolve(cwd, "src"),
        resolve: {
            extensions: [".ts", ".tsx", ".json", ".js", ".jsx", ".css", ".scss"],
            // alias,
            // modules: [path.resolve(cwd), 'node_modules']
        },
        target: "node", // in order to ignore built-in modules like path, fs, etc.
        externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
        devtool: isWatch ? "eval-cheap-module-source-map" : "cheap-source-map",
        entry,
        output: {
            path: path.resolve(cwd, "dist"),
            chunkFilename: "[name].js",
            filename,
            publicPath: "/",
        },
        mode: isWatch ? "development" : "production",
        module: {
            rules: [
                {
                    test: /\.(tsx|ts|js|jsx)?$/,
                    loader: "esbuild-loader",
                    options: {
                        loader: "tsx",
                        target: "esnext",
                    },
                },
                {
                    test: /\.(css|scss)$/,
                    use: ["css-loader", "sass-loader"],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {},
                        },
                    ],
                },
            ],
        },
        plugins: [
            new ESBuildPlugin({}),
            // new webpack.DefinePlugin({
            //     // "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
            //     // "process.env.DB_PASSWORD": JSON.stringify(process.env.DB_PASSWORD),
            //     // "process.env.DB_USER": JSON.stringify(process.env.DB_USER),
            //     // "process.env.DB_URL": JSON.stringify(process.env.DB_URL),
            //     // "process.env.PORT": JSON.stringify(process.env.PORT),
            //     //     // 'process.env.USERS_HOST': JSON.stringify(process.env.USERS_HOST),
            //     //     // 'process.env.PROJECTS_HOST': JSON.stringify(process.env.PROJECTS_HOST),
            //     //     // 'process.env.port': JSON.stringify(process.env.port),
            //     //     // 'process.env.host': JSON.stringify(process.env.host),
            //     //     // 'process.env.HOST': JSON.stringify(process.env.HOST),
            //     //     // 'process.env.DEBUG': JSON.stringify(isDebug),
            //     //     // 'process.env.DEST_PORT': JSON.stringify(process.env.DEST_PORT),
            //     //     // 'process.env.DOCKER_HOST': JSON.stringify(process.env.DOCKER_HOST),
            //     //     // 'process.env.DESTINATION_HOST': JSON.stringify(process.env.DESTINATION_HOST)
            // }),
            // new SizePlugin(),
            // new StatsWriterPlugin({
            //     fields: ["assets", "modules"]
            // }),
            new webpack.EnvironmentPlugin({
                NODE_ENV: isWatch ? "development" : "production", // use 'development' unless process.env.NODE_ENV is defined
                // DEBUG: false,
                // PORT: 8080,
                // DB_PASSWORD: "",
                // DB_URL: "",
            }),
            new LoadablePlugin(),
            new GenerateJsonPlugin("package.json", {
                ...json,
                main: filename,
                files: [],
                scripts: {
                    start: `node ${filename}`,
                },
                devDependencies: {},
            }),
            // new SwaggerJSDocWebpackPlugin({
            //     swaggerDefinition: {
            //         openapi: '3.0.0',
            //         info: {
            //             title: json.name,
            //             version: json.version,
            //             description: json.description
            //         }
            //     },
            //     apis: ['./src/api/**/index.ts', './src/api/**/model.js'],
            // }),
            // fs.existsSync(path.resolve(cwd, 'jsdoc.json')) ? new JsDocPlugin({
            //     conf: path.resolve(cwd, 'jsdoc.json') // single jsdoc file
            // }) : () => {},
            // !isProd && process.cwd().includes('webserver1') ? new BundleAnalyzerPlugin({}) : new BundleAnalyzerPlugin({
            //     analyzerMode: 'static',
            //     openAnalyzer: false,
            //
            // }),
            new CopyPlugin({
                patterns: [
                    { from: path.join(cwd, "app.yml") },
                    // undefined,
                    // null,
                    // () => {},
                    // { from: path.join(cwd, "src/ml/kc_house_data.csv") },
                    // { from: "other", to: "public" },
                ],
            }),
            // new CopyPlugin([{ from: path.join(cwd, "app.yml"), to: "dist" }]),
            argv.watch
                ? new NodemonPlugin({
                      script: path.resolve(cwd, "dist", filename),
                      watch: path.resolve(cwd, "dist", filename),
                      verbose: true,
                  })
                : noop,
        ],
    };
};
