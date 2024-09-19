// index.node.js
import fs from 'fs';
import path from 'path';

const poetsPath = path.join(__dirname, 'source', 'poets');
const poemsPath = path.join(__dirname, 'source', 'poems');

export async function getPoets() {
    const files = await fs.promises.readdir(poetsPath);
    return Promise.all(files.map(async (file) => {
        const content = await fs.promises.readFile(path.join(poetsPath, file), 'utf-8');
        return JSON.parse(content);
    }));
}

export async function getPoems() {
    const files = await fs.promises.readdir(poemsPath);
    return Promise.all(files.map(async (file) => {
        const content = await fs.promises.readFile(path.join(poemsPath, file), 'utf-8');
        return JSON.parse(content);
    }));
}

export async function getPoemsByPoet(poetName) {
    const poems = await getPoems();
    return poems.filter(poem => poem.poetName === poetName);
}