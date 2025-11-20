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

app.use('/users', require('./routes/userRoute'));


app.use('/transections', require('./routes/transectionRoutes'));

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

const PORT = 8080 || process.env.PORT;


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});