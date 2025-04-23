import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoute from './route/user.route.js';
import cors from 'cors';
import messageRoute from './route/message.route.js';
import { app, server, io } from './SocketIO/server.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_DB_URI;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://cokkie-chat-q6sj.onrender.com',  // Frontend ka URL
    credentials: true
}));

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

app.get('/', (req, res) => {
    res.send("Backend is running");
});

// Production Deployment
if (process.env.NODE_ENV === 'production') {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    
    const frontendPath = path.join(__dirname, './Frontend/dist');
    console.log("Serving frontend from:", frontendPath);

    app.use(express.static(frontendPath));
    app.use('/assets', express.static(path.join(frontendPath, 'assets')));
    
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});