import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/db.js';
import jobRoutes from './routes/jobs.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDatabase();

app.use('/api/jobs', jobRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening at port number: ${PORT}`);
});
