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
app.use('/users', require('./routes/userRoute'));
app.use('/transections', require('./routes/transectionRoutes'));

// Static files
app.use(express.static(path.join(__dirname, './client/build')));

// --- FIX IS HERE ---
// Changed '*' to regex /(.*)/ to fix the "Missing parameter name" crash
app.get(/(.*)/, function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// --- PORT LOGIC FIX ---
// process.env.PORT must come first for Vercel deployment
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});