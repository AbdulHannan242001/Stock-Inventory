import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectToMongoDB from './db/db.js';



dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: `${process.env.CLIENT_URL}`,
    credentials: true,
}));

app.use('/api/inventory', )


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectToMongoDB();
})