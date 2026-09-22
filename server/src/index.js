import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // For development
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);

// Basic Route for testing
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', message: 'NAGPUR RESQ API is running' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/nagpur-resq')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// WebSocket connection
io.on('connection', (socket) => {
  console.log('🔗 Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
