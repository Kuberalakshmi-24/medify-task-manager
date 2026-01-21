const express = require('express');
const cors = require('cors');
const { connectDB, sequelize } = require('./config/db');
require('dotenv').config();

// Route Imports
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
// Production-la unga Vercel URL-ah mattum allow panna, origin add pannalaam
app.use(cors({
    origin: process.env.FRONTEND_URL || '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health Check (Render deploy aagi check panna useful-ah irukkum)
app.get('/', (req, res) => {
    res.send('Medify Pro Backend is running successfully!');
});

// Database & Server Start
const PORT = process.env.PORT || 5000; // Render-la PORT 5000 set pannirukkom

const startServer = async () => {
    try {
        await connectDB();
        // Cloud DB kooda sync aaga alter: true kudukkalaam
        await sequelize.sync({ alter: false }); 
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
