const Product = require('../models/Product');
const Orders = require('../models/Orders');

const getUserOrders = async(req,res) =>{
    const userId = req.params.id;
    try {
        const userOrders = await Orders.find({userId})
        .populate({
            path:'productId',
            select:"-description -product_location"
        }).exec();
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json('Internal server error');
    }
}


module.exports =  {
getUserOrders
}