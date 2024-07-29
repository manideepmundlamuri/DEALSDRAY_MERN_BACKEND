const User = require('../Models/User');
const Admin = require('../Models/Admin');
const upload = require('../middleWare/multerConfig'); // Import multer middleware

const addUser = async (req, res) => {
    try {
        const { name, email, mobile, designation, gender, course } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const admin = await Admin.findById(req.adminId);

        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        const user = new User({
            name, email, mobile, designation, gender, course, image, admin: admin._id
        });

        const savedUser = await user.save();
        admin.user.push(savedUser);
        await admin.save();

        res.status(200).json({ message: "User Added Successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUsersById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, mobile, designation, gender, course } = req.body;
        let image;
        if (req.file) {
            image = req.file.filename;
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.mobile = mobile || user.mobile;
        user.designation = designation || user.designation;
        user.gender = gender || user.gender;
        user.course = course || user.course;
        if (image) {
            user.image = image;
        }

        await user.save();
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { addUser: [upload.single('image'), addUser], getAllUsers, getUsersById, updateUser, deleteUser };
