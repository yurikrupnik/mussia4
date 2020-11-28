import path from "path";
import copy from "rollup-plugin-copy";
// import typescript from "@rollup/plugin-typescript";
import esBuild from "rollup-plugin-esbuild";

const cwd = process.cwd();

const globals = {};

const defaultModule = {
    input: "src/index.ts",
    output: {
        file: "dist/index.ts",
        format: "cjs",
        globals,
    },
    plugins: [
        esBuild({}),
        copy({
            targets: [{ src: path.join(cwd, "package.json"), dest: "dist" }],
        }),
    ],
};

export default defaultModule;
