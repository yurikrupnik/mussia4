module.exports = function (api) {
    api.cache(true);
    const presets = [
        // [
        //     '@babel/preset-env',
        //     {
        //         targets: {
        //             node: 'current'
        //         },
        //         modules: false
        //     }
        // ],
        // '@babel/preset-typescript',
        // '@babel/preset-react'
    ];
    const plugins = [];

    return {
        babelrcRoots: [".", ".packages/*", ".packages/**/*"],
        presets,
        plugins,
    };
};
