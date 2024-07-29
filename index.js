const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); 
const port = 3000;
const productRoute = require('./routes/products');

app.use(cors()); 
app.use(express.json());

app.use('/api/products', productRoute);

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('database connected');
}).catch(() => {
    console.log('error in database connection');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
