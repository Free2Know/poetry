import gracefulFs from 'graceful-fs';
import path from 'path';
import fs from 'fs/promises';
import ejs from 'ejs';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

const rootPath = process.cwd();
console.log("Root path:", rootPath);

const sourcePath = path.resolve(rootPath, 'node_modules', 'poetryesm', 'source');

console.log('Source path:', sourcePath);

// 获取所有诗人路径
export async function getPoetPaths() {
    try {
        console.log('Checking source path:', sourcePath);
        const directories = await fs.readdir(sourcePath);
        console.log('Directories:', directories);

        const poetPaths = [];
        for (const dir of directories) {
            const dynastyPath = path.join(sourcePath, dir);
            console.log('Checking directory:', dynastyPath);
            if ((await fs.stat(dynastyPath)).isDirectory()) {
                const files = await fs.readdir(dynastyPath);
                console.log('Files in directory:', files);
                poetPaths.push(...files.map(file => path.join(dynastyPath, file)));
            }
        }
        return poetPaths;
    } catch (error) {
        console.error('Error reading poets directory:', error);
        throw error;
    }
}

// 根据路径获取诗人信息
export async function getPoetByPath(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        console.error('Error reading Poet file:', error);
        throw error;
    }
}

// 生成朝代的诗人清单
export async function generateDynastyPoetList(outputPath, dynastyTemplatePath = 'Dynasty.ejs') {
    try {
        console.log('Generating dynasty poet list...');
        const poetPaths = await getPoetPaths();
        console.log('Poet paths:', poetPaths);

        const poets = await Promise.all(poetPaths.map(async poetPath => {
            const poet = await getPoetByPath(poetPath);
            return poet;
        }));

        const dynastyPoetMap = new Map();

        poets.forEach(poet => {
            if (!dynastyPoetMap.has(poet.Dynasty)) {
                dynastyPoetMap.set(poet.Dynasty, []);
            }
            dynastyPoetMap.get(poet.Dynasty).push(poet);
        });

        const dynastyPoetList = Array.from(dynastyPoetMap.entries()).map(([dynasty, poetList]) => ({
            dynasty,
            poets: poetList
        }));

        const outputFilePath = path.resolve(outputPath, 'dynasties.html');
        const templateContent = await fs.readFile(dynastyTemplatePath, 'utf-8');
        const renderedContent = ejs.render(templateContent, { dynastyPoetList });

        await fs.writeFile(outputFilePath, renderedContent, 'utf-8');
        console.log('Dynasty poet list generated at:', outputFilePath);
    } catch (error) {
        console.error('Error generating dynasty poet list:', error);
        throw error;
    }
}

// 生成HTML页面
export async function generateHtmlPages(outputPath, poetTemplatePath = 'poet.ejs') {
    try {
        console.log('Generating HTML pages...');
        const poetPaths = await getPoetPaths();
        console.log('Poet paths:', poetPaths);

        const htmlOutputPath = path.resolve(outputPath, 'poets');
        if (!await fs.exists(htmlOutputPath)) {
            await fs.mkdir(htmlOutputPath, { recursive: true });
        }

        for (const poet of poets) {
            const templateContent = await fs.readFile(poetTemplatePath, 'utf-8');
            const renderedContent = ejs.render(templateContent, { poet });

            const poetHtmlFilePath = path.resolve(htmlOutputPath, `${poet.Name}.html`);
            await fs.writeFile(poetHtmlFilePath, renderedContent, 'utf-8');
            console.log('Generated HTML page for poet:', poet.Name);
        }

        console.log('HTML pages generated at:', htmlOutputPath);
    } catch (error) {
        console.error('Error generating HTML pages:', error);
        throw error;
    }
}


// 解析命令行参数
const argv = yargs(hideBin(process.argv))
    .option('outputPath', {
        alias: 'o',
        describe: 'Output path for generated files',
        type: 'string',
        demandOption: false, // 不强制要求此选项
        default: process.cwd() // 默认值为当前工作目录
    })
    .option('dynastyTemplatePath', {
        alias: 'd',
        describe: 'Path to the dynasty template file',
        type: 'string',
        default: 'Dynasty.ejs'
    })
    .option('poetTemplatePath', {
        alias: 'p',
        describe: 'Path to the poet template file',
        type: 'string',
        default: 'poet.ejs'
    })
    .help()
    .alias('help', 'h')
    .argv;

// 生成HTML页面
generateDynastyPoetList(argv.outputPath, argv.dynastyTemplatePath)
    .then(() => generateHtmlPages(argv.outputPath, argv.poetTemplatePath))
    .catch(error => console.error('Error generating files:', error));