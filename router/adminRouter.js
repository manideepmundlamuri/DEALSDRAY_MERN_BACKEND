const express = require('express');
const adminController = require('../controller/adminController');
const router = express.Router();

router.post ('/register', adminController.adminResgister);
router.post('/login', adminController.adminLogin);
router.get('/all-admins', adminController.getAllAdmins);
router.get('/single-admin/:id', adminController.getAdminById)
module.exports =router;