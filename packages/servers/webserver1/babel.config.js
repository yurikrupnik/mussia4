const presets = [
    [
        "@babel/preset-env",
        {
            targets: {
                node: "current",
            },
        },
    ],
    ["@babel/preset-typescript"],
    ["@babel/preset-react"],
];
// const plugins = [];

module.exports = (api) => {
    api.cache(true);
    return {
        babelrcRoots: ["."],
        presets,
        plugins: ["@babel/plugin-syntax-dynamic-import", "@loadable/babel-plugin"],
    };
};
