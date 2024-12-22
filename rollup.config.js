import pkg from "./package.json" with { type: "json" };
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from '@rollup/plugin-babel';
import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";
import serve from 'rollup-plugin-serve';
import replace from "@rollup/plugin-replace";

const production = !process.env.ROLLUP_WATCH;
const devServer = process.env.DEV_SERVER;
const extensions = [ ".js", ".jsx", ".ts", ".tsx" ];
const external = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
  "@babel/runtime",
  "react/jsx-runtime",
];

export default [
  {
    input: "src/YouPlayer.tsx",
    output: {
      file: "dist/index.js",
      format: "esm"
    },
    external,
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({ 
        exclude: /^(.+\/)?node_modules\/.+$/,
        extensions,
        babelHelpers: "bundled",
        sourceMaps: !production
      })
    ]
  },
  {
    input: "src/test-page.tsx",
    output: {
      file: "dist/test-page.js",
      format: "iife"
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({ 
        exclude: /^(.+\/)?node_modules\/.+$/,
        extensions,
        babelHelpers: "bundled",
        sourceMaps: !production
      }),
      replace({preventAssignment: true,
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
      copy({
        targets: [{ src: "src/index.html", dest: "dist" }],
        copyOnce: true
      }),
      production && terser(),
      devServer && serve({ contentBase: ['', 'dist'], historyApiFallback: true, open: true, verbose: true }),
    ]
  }
];
