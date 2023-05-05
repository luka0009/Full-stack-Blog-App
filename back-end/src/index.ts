import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

dotenv.config();
connectDB();
const app: express.Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Server is running');
});

app.listen(PORT, () => {
    console.log('Server is running on Port:', PORT);
})