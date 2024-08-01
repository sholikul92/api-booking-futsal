import express from 'express';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';
import router from './routes/routes.js';

const app = express();
config();
const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})