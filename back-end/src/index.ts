import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import { errorResponseHandler, invalidPathHandler } from "./middleware/errorHandler";
import cors from 'cors';
import path from 'path';
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";

dotenv.config();
connectDB();
const app: express.Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Server is running');
});

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(invalidPathHandler);
app.use(errorResponseHandler);

app.listen(PORT, () => {
    console.log('Server is running on Port:', PORT);
})