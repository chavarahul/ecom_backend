const User = require('../models/User');

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Sucessfully Deleted")
    } catch (error) {
        res.status(500).json("Internal server error", error)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user){
           return res.status(401).json("User doesn't exist") 
        }
        const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
        res.status(200).json({ userData })


    } catch (error) {
        res.status(500).json("Internal server error", error)

    }
}


module.exports = {
    deleteUser, getUser
}