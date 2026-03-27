import express from 'express';
import dotenv from 'dotenv';
import {connectDb} from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}))
app.use(cookieParser({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
}))

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

//custom routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes); // Add user routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDb();
});

