const express = require('express');
const userController = require('../controller/userController');
const verifyToken = require('../middleWare/verifyToken');
const upload = require('../middleWare/multerConfig'); // Import multer middleware

const router = express.Router();

router.post('/add-user', verifyToken, userController.addUser)
router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getUsersById);
router.put('/update-user/:id', verifyToken, upload.single('image'), userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;