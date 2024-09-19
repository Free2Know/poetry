// server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

const poetsPath = path.join(__dirname, 'source', 'poets');
const poemsPath = path.join(__dirname, 'source', 'poems');

app.get('/api/poets', async (req, res) => {
    try {
        const files = await fs.readdir(poetsPath);
        const poets = await Promise.all(files.map(async (file) => {
            const content = await fs.readFile(path.join(poetsPath, file), 'utf-8');
            return JSON.parse(content);
        }));
        res.json(poets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/poems', async (req, res) => {
    try {
        const files = await fs.readdir(poemsPath);
        const poems = await Promise.all(files.map(async (file) => {
            const content = await fs.readFile(path.join(poemsPath, file), 'utf-8');
            return JSON.parse(content);
        }));
        res.json(poems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/poems/:poetName', async (req, res) => {
    try {
        const poetName = req.params.poetName;
        const poems = await getPoems();
        const filteredPoems = poems.filter(poem => poem.poetName === poetName);
        res.json(filteredPoems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function getPoems() {
    const files = await fs.readdir(poemsPath);
    return await Promise.all(files.map(async (file) => {
        const content = await fs.readFile(path.join(poemsPath, file), 'utf-8');
        return JSON.parse(content);
    }));
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});