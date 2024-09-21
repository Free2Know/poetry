import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// 设置静态文件目录
app.use(express.static(path.resolve(process.cwd(), 'public')));

// 默认路由
app.get('/', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'public', 'dynasties.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});