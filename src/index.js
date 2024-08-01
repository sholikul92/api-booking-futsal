import express from 'express';
import { config } from 'dotenv';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser'

const app = express();
config();

const port = process.env.PORT || 3000;

app.use(cookieParser())
app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})