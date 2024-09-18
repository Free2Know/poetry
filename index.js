// index.js
import fs from 'fs';
import path from 'path';

const poetsPath = path.join(__dirname, 'source', 'poets');
const poemsPath = path.join(__dirname, 'source', 'poems');

export async function getPoets() {
  const poets = await fs.promises.readdir(poetsPath);
  return Promise.all(
    poets.map(async (poet) => {
      const poetData = await fs.promises.readFile(path.join(poetsPath, poet), 'utf-8');
      return JSON.parse(poetData);
    })
  );
}

export async function getPoems() {
  const poems = await fs.promises.readdir(poemsPath);
  return Promise.all(
    poems.map(async (poem) => {
      const poemData = await fs.promises.readFile(path.join(poemsPath, poem), 'utf-8');
      return JSON.parse(poemData);
    })
  );
}

export async function getPoemsByPoet(poetName) {
  const allPoems = await getPoems();
  return allPoems.filter((poem) => poem.poetName === poetName);
}