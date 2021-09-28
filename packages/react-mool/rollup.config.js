import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import copy from "rollup-plugin-copy"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import typescript from "rollup-plugin-typescript2"

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require("./package.json")

const globals = {
  ...packageJson.devDependencies,
  ...packageJson.dependencies,
}

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs", // commonJS
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm", // ES Modules
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: false,
      tsconfigOverride: {
        exclude: ["**/*.stories.*"],
      },
    }),
    commonjs({
      exclude: "node_modules",
      ignoreGlobal: true,
    }),
    postcss({
      extract: true,
    }),
    copy({
      targets: [{ src: "dist/esm/index.css", dest: "dist/" }],
      hook: "writeBundle",
    }),
    json(),
  ],
  external: Object.keys(globals),
}
