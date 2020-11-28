import path from "path";
// eslint-disable-next-line import/no-extraneous-dependencies
import copy from "rollup-plugin-copy";
// import typescript from "@rollup/plugin-typescript";
// eslint-disable-next-line import/no-extraneous-dependencies
import esBuild from "rollup-plugin-esbuild";
// eslint-disable-next-line import/no-extraneous-dependencies
// import typescript from "rollup-plugin-typescript2"; // eslint-disable-line

const cwd = process.cwd();

const globals = {};

const defaultModule = {
    input: "src/index.ts",
    output: {
        file: "dist/index.js",
        format: "cjs",
        globals,
    },
    plugins: [
        esBuild({}),
        // typescript({
        //     //     // target: "es2017",
        //     //     //     // tsconfig: "./tsconfig.json",
        //     //     //     // useTsconfigDeclarationDir: true,
        // }),
        copy({
            targets: [{ src: path.join(cwd, "package.json"), dest: "dist" }],
        }),
    ],
};

export default defaultModule;
