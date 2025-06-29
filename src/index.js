import express from 'express';
import("dotenv").then(dotenv => dotenv.config());


const app = express();
const PORT = process.env.PORT | 8000;




app.listen(PORT, () => {
    console.log('Server is listening at port Number: ', PORT);
})