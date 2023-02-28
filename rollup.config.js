import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { uglify } from "rollup-plugin-uglify";
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import jsonPlugin from "@rollup/plugin-json"

export default {
    input: "./index.js",
    output: [
        {
            file: "dist/index.js",
            format: 'es'
        }
    ],
    plugins: [
        peerDepsExternal(),
        typescript(),
        postcss({
            extensions: ['.css']
        }),
        // uglify(),
        babel({
            babelrc: true,
            // exclude: 'node_modules/**',
            babelHelpers: "bundled"
        }),
        commonjs({
            include: /node_modules/,
            requireReturnsDefault: 'auto',
        }),
        jsonPlugin()
    ]
}
