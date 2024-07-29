const Admin =require('../Models/Admin')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
const secretKey = process.env.JWT_TOKEN_KEY;

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if(!token){
        return res.status(401).json({message:"token required"});
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        const admin = await Admin.findById(decoded.adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" })
        }
        req.adminId = admin._id
        next()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Invalid Token' })
    }
}

module.exports = verifyToken;