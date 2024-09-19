// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'index.browser.js',
    output: {
        file: 'dist/index.esm.js',
        format: 'esm'
    },
    plugins: [
        resolve(),
        commonjs()
    ]
};