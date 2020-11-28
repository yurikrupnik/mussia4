// import postcss from "rollup-plugin-postcss";
// import autoprefixer from "autoprefixer";
import typescript from "rollup-plugin-typescript2";
// import esbuild from "rollup-plugin-esbuild";
// does not create *.d.ts file and compile in 1 way

const globals = {
    react: "React",
    "prop-types": "PropTypes",
};

const defaultModule = {
    input: "src/index.ts",
    output: [
        {
            dir: "dist/cjs",
            format: "cjs",
            globals,
        },
        {
            dir: "dist/esm",
            format: "esm",
            globals,
        },
    ],
    plugins: [
        typescript({
            // target: "es2017",
            // tsconfig: "./tsconfig.json",
            useTsconfigDeclarationDir: true,
        }),
        // postcss({
        //     minimize: true,
        //     modules: true,
        //     plugins: [autoprefixer()],
        // }),
    ],
};

export default defaultModule;
