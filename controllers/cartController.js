const Product = require('../models/Product');
const Cart = require('../models/Cart')
const addToCart = async (req, res) => {
    const { userId, cartItem, quantity } = req.body;
    console.log(userId,cartItem,quantity)
    try {
        const cart = await Cart.findOne({ userId });
        if (cart) {
            const existProduct = cart.products.find(
                (product) => product.cartItem.toString() === cartItem
            )
            if (existProduct) {
                existProduct.quantity += 1
            } else {
                cart.products.push({ cartItem, quantity })
            }
            await cart.save();
            res.status(200).json("Product added to Cart")
        } else {
            const newCart = new Cart({
                userId,
                products: [{
                    cartItem, quantity: quantity
                }]
            });
            await cart.save();
            res.status(200).json("Product added to Cart")
        }
    } catch (error) {
        res.status(500).json("Internal server error")
    }
}


const getCart = async (req, res) => {
    const userId = req.params.id;
    try {
        const cart = await Cart.find({ userId })
            .populate('products.cartItem', "_id title supplier price imageUrl");
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json("Internal server error", error)

    }
}

const deleteCart = async (req, res) => {
    const cartItemId = req.params.cartItemId;
    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { 'products._id': cartItemId },
            { $pull: { products: { _id: cartItemId } } },
            { new: true }
        );
        if (!updatedCart) {
            res.status(400).json("CartItem not found");
        }
        res.status(200).json(updatedCart);

    } catch (error) {
        res.status(500).json("Internal server error")
    }
}

const decrementCartItem = async (req, res) => {
    const { userId, cartItem } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            res.status(400).json("Cart not found");
        }
        const existingProduct = cart.products.find(
            (product) => product.cartItem.toString() === cartItem
        )
        if (!existingProduct) {
            res.status(400).json("Product not found");
        }
        if (existingProduct.quantity === 1) {
            cart.products = cart.products.filter(
                (product) => product.cartItem.toString() !== cartItem
            )
        } else {
            existingProduct.quantity -= 1;
        }
        await cart.save();
        if (existingProduct.quantity === 0) {
            await Cart.updateOne(
                { userId }, { $pull: { products: { cartItem } } }
            )
        }
        res.status(200).json("Product Updated");
    } catch (error) {
        res.status(500).json("Internal server error")
    }
}

module.exports = {
    getCart,
    decrementCartItem,
    addToCart,
    deleteCart
}

