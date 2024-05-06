import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import searchRoutes from "./routes/search.routes.js"

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());

app.use("/api", searchRoutes); 

export default app;