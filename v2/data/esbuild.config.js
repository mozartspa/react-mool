const esbuild = require("esbuild")
const cssModulesPlugin = require("esbuild-css-modules-plugin")
const scssModulesPlugin = require("esbuild-scss-modules-plugin")

const watch = process.argv.includes("--watch")

const config = {
  entryPoints: ["./src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  minify: false,
  platform: "browser",
  sourcemap: true,
  target: "es6",
  format: "esm",
  packages: "external",
  plugins: [cssModulesPlugin(), scssModulesPlugin.default()],
  //inject: ["./react-shim.js"],
}

async function buildESM() {
  const ctx = await esbuild.context({ ...config })

  if (watch) {
    ctx.watch()
    console.log("watching...")
  } else {
    await ctx.rebuild()
    ctx.dispose()
  }
}

async function buildCJS() {
  const ctx = await esbuild.context({
    ...config,
    format: "cjs",
    outfile: "dist/lib/index.js",
  })

  if (watch) {
    ctx.watch()
    console.log("watching...")
  } else {
    await ctx.rebuild()
    ctx.dispose()
  }
}

buildESM().catch((err) => {
  console.error(err)
  process.exit(1)
})
buildCJS().catch((err) => {
  console.error(err)
  process.exit(1)
})
