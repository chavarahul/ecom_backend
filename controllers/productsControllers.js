const Product = require('../models/Product'); // Correct the require statement

module.exports = {
    createProduct: async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            await newProduct.save();
            res.status(200).json("created successfully");
        } catch (error) {
            console.log(error);
            res.status(500).json("internal server error");
        }
    },

    getAllProducts: async (req, res) => {
        try {
            const products = await Product.find().sort({ createdAt: -1 });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json("internal server error");
        }
    },

    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id); 
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json("internal server error");
        }
    },

    searchProduct: async (req, res) => {
        try {
            const result = await Product.aggregate([
                {
                    $search: {
                        index: "furniture",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json("internal server error");
        }
    }
};
