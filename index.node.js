import fs from 'fs/promises';
import path from 'path';

// 获取当前文件的目录路径
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const poetsPath = path.resolve(__dirname, 'source', 'poets');
const poemsPath = path.resolve(__dirname, 'source', 'poems');

export async function getPoets() {
    console.log('Poets path:', poetsPath); // 打印路径
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
    console.log('Poems path:', poemsPath); // 打印路径
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