import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import policyRoutes from './routes/policies.js';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

mongoose.set('strictQuery', true);
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(pinoHttp());
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 100 }));
app.use('/api/policies', policyRoutes);
app.use('/api/auth', authRoutes);
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use(errorHandler);

await connectDB();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Fox Insurance API listening on ${port}`));
