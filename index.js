const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors'); 
const port = 3000;
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');
const productRoute = require('./routes/products');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth')
app.use(cors()); 
app.use(express.json());

app.use('/api/products', productRoute);
app.use('/api/',authRoute);
app.use('/api/orders',orderRoute);
app.use('/api/cart',cartRoute);
app.use('/api/user',userRoute)

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('database connected');
}).catch(() => {
    console.log('error in database connection');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
