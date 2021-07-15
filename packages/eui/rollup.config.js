import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import css from "rollup-plugin-import-css"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import typescript from "rollup-plugin-typescript2"

// this override is needed because Module format cjs does not support top-level await
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require("./package.json")

const globals = {
  ...packageJson.devDependencies,
  ...packageJson.dependencies,
  "@elastic/eui/dist/eui_theme_amsterdam_light.css": "*",
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
    css(),
    json(),
  ],
  external: Object.keys(globals),
}
