import fs from 'fs/promises';
import path from 'path';

// 获取当前文件的目录路径
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const poetsPath = path.join(__dirname, 'source', 'poets');
const poemsPath = path.join(__dirname, 'source', 'poems');

export async function getPoets() {
    const files = await fs.readdir(poetsPath);
    return Promise.all(files.map(async (file) => {
        const content = await fs.readFile(path.join(poetsPath, file), 'utf-8');
        return JSON.parse(content);
    }));
}

export async function getPoems() {
    const files = await fs.readdir(poemsPath);
    return Promise.all(files.map(async (file) => {
        const content = await fs.readFile(path.join(poemsPath, file), 'utf-8');
        return JSON.parse(content);
    }));
}

export async function getPoemsByPoet(poetName) {
    const poems = await getPoems();
    return poems.filter(poem => poem.poetName === poetName);
}