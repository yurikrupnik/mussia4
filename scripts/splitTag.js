// eslint-disable-next-line @typescript-eslint/no-var-requires
const { spawn, exec, fork } = require("child_process");

const tag = process.env.BITBUCKET_TAG;

const sections = tag.split("@");
console.log("sections", sections);
if (sections.length === 2) {
    const MODULE_SCOPE = sections[0];
    console.log("MODULE_SCOPE 0", MODULE_SCOPE);
    // exec(`npm run postinstall -- --scope=${MODULE_SCOPE}`, (err, b, a) => {
    //     if (err) {
    //         console.warn("err", err);
    //     } else {
    //         console.log("b, a", b, a);
    //     }
    // });
    // spawn(`npm run postinstall`, ["--", "--", "scope=${MODULE_SCOPE}"]);
    fork(`npm run postinstall -- --scope=${MODULE_SCOPE}`);
    // exec(`npm run deploy -- --scope=${MODULE_SCOPE}`);
    // spawn(`npm run deploy -- --scope=${MODULE_SCOPE}`);
    // exec(`export ${MODULE_SCOPE}`);
    // exec(`exports ${MODULE_SCOPE}`);
    process.env["MODULE_SCOPE"] = sections[0];
} else {
    const MODULE_SCOPE = `@${sections[1]}`;
    console.log("MODULE_SCOPE 1", MODULE_SCOPE);
    exec(`npm run postinstall -- --scope=${MODULE_SCOPE}`);
    spawn(`npm run postinstall -- --scope=${MODULE_SCOPE}`);
    // exec(`npm run deploy -- --scope=${MODULE_SCOPE}`);
    // spawn(`npm run deploy -- --scope=${MODULE_SCOPE}`);
    // exec(`export ${MODULE_SCOPE}`);
    // exec(`exports ${MODULE_SCOPE}`);
    // exec(`echo MODULE_SCOPE=@${sections[1]}`);
    // process.env["MODULE_SCOPE"] = `@${sections[1]}`;
}
