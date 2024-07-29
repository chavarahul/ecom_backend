const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    customerId: { type: String, required: true },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    quantity: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    delivery_status: { type: Number, default: "pending" },
    payment_status: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Orders", orderSchema); 
