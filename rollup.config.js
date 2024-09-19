import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'index.js', // 输入文件
    output: {
        file: 'dist/bundle.js', // 输出文件
        format: 'cjs', // 输出格式
    },
    plugins: [
        resolve(), // 解析 Node.js 模块
        commonjs(), // 将 CommonJS 模块转换为 ES6 模块
    ],
};