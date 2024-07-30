const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

const app = express();
dotenv.config();
const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('ini halaman utama')
})

app.get('/user', async(req, res) => {
    res.send(await prisma.user.findMany())
})

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})