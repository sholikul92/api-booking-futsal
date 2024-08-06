import express from 'express';
import { config } from 'dotenv';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
config();

app.use(cors({
    credentials : true,
    origin : 'http://localhost:3000'
}));
app.use(cookieParser())
app.use(express.json())
app.use('/api/v1', router)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
})