import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import { errorResponseHandler, invalidPathHandler } from "./middleware/errorHandler";


dotenv.config();
connectDB();
const app: express.Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Server is running');
});

app.use('/api/users', userRoutes);
app.use(invalidPathHandler);
app.use(errorResponseHandler);

app.listen(PORT, () => {
    console.log('Server is running on Port:', PORT);
})