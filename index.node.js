import fs from 'fs/promises';
import path from 'path';

// 获取当前工作目录
const rootPath = process.cwd();
console.log("Root path:", rootPath);



const poetsPath = path.resolve(rootPath, 'node_modules', 'poetryesm', 'source', 'poets');
const poemsPath = path.resolve(rootPath, 'node_modules', 'poetryesm', 'source', 'poems');

console.log('Poets path:', poetsPath); // 打印路径
console.log('Poems path:', poemsPath); // 打印路径

export async function getPoets() {
    try {
        const files = await fs.readdir(poetsPath);
        return Promise.all(files.map(async (file) => {
            const content = await fs.readFile(path.join(poetsPath, file), 'utf-8');
            return JSON.parse(content);
        }));
    } catch (error) {
        console.error('Error reading poets directory:', error);
        throw error; // 重新抛出错误以便调用者处理
    }
}

export async function getPoems() {
    try {
        const files = await fs.readdir(poemsPath);
        return Promise.all(files.map(async (file) => {
            const content = await fs.readFile(path.join(poemsPath, file), 'utf-8');
            return JSON.parse(content);
        }));
    } catch (error) {
        console.error('Error reading poems directory:', error);
        throw error; // 重新抛出错误以便调用者处理
    }
}

export async function getPoemsByPoet(poetName) {
    try {
        const poems = await getPoems();
        return poems.filter(poem => poem.poetName === poetName);
    } catch (error) {
        console.error('Error filtering poems by poet:', error);
        throw error; // 重新抛出错误以便调用者处理
    }
}