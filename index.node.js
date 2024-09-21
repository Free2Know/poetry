import gracefulFs from 'graceful-fs';
import path from 'path';

const fs = gracefulFs.promises;

const rootPath = process.cwd();
console.log("Root path:", rootPath);

const poetsPath = path.resolve(rootPath, 'node_modules', 'poetryesm', 'source', 'poets');
const poemsPath = path.resolve(rootPath, 'node_modules', 'poetryesm', 'source', 'poems');

console.log('Poets path:', poetsPath);
console.log('Poems path:', poemsPath);

export async function getPoetPaths() {
    try {
        const files = await fs.readdir(poetsPath);
        return files.map(file => path.join(poetsPath, file));
    } catch (error) {
        console.error('Error reading poets directory:', error);
        throw error;
    }
}

export async function getPoemPaths() {
    try {
        const files = await fs.readdir(poemsPath);
        return files.map(file => path.join(poemsPath, file));
    } catch (error) {
        console.error('Error reading poems directory:', error);
        throw error;
    }
}

export async function getPoetByPath(path) {
    try {
        const content = await fs.readFile(path, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error reading Poet file:', error);
        throw error;
    }
}

export async function getPoemByPath(path) {
    try {
        const content = await fs.readFile(path, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error reading poem file:', error);
        throw error;
    }
}