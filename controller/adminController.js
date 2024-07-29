const Admin = require('../Models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const secretKey = process.env.JWT_TOKEN_KEY;
const adminResgister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const adminEmail = await Admin.findOne({ email })
        if (adminEmail) {
            return res.status(400).json('email already exist');
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword
        })

        await newAdmin.save();

        res.status(201).json('admin registered sucessfully');
        console.log('registred');
    } catch (error) {
        console.log(error.message);
        res.status(500).json("internal server error")
    }
}

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ error: 'invalid email or password' })
        }

        const token = jwt.sign({ adminId: admin._id }, secretKey, { expiresIn: '1h' })

        res.status(200).json({ success: "Login Successful", token });
        console.log(email, 'this is token :', token);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().populate('user')
        res.json({ admins })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'imternal server error' })
    }
}

const getAdminById = async (req, res) => {
    const adminId = req.params.id;
    try {
        const admin = await Admin.findById(adminId).populate('user');
        if (!admin) {
            return res.status(404).json({ error: "Admin not found" });
        }
        res.status(200).json(admin)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'imternal server error' })
    }
}

module.exports = { adminResgister, adminLogin, getAllAdmins, getAdminById };