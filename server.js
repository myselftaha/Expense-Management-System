const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const path = require('path');
const connectDb = require('./config/connectDb');

dotenv.config();

connectDb();

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Routes
// 1. API Routes FIRST
app.use('/users', require('./routes/userRoute'));
app.use('/transections', require('./routes/transectionRoutes'));

// 2. Static Files SECOND
app.use(express.static(path.join(__dirname, './client/build')));

// 3. The Catch-All Route LAST
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});
// --- PORT LOGIC FIX ---
// process.env.PORT must come first for Vercel deployment
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});