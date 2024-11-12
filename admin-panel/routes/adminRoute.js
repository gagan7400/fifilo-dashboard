// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authenticate = async (email, password) => {
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    return next(CustomErrorHandler.badRequest("This account does not exits."))
  }
  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) {
    return next(CustomErrorHandler.badRequest("This account does not valid."))
  }
  return admin;
};

const generateToken = (admin) => {
  const token = jwt.sign({ adminId: admin._id }, process.env.SECRET_KEY, {
    expiresIn: '24h'
  });
  return token;
};


const registerAdmin = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new Admin({ email, password: hashedPassword });
  await admin.save();
  return admin;
};

// console.log(registerAdmin("admin@gmail.com","admin"))

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await authenticate(email, password);
    const token = generateToken(admin);
    res.cookie('token', token, { httpOnly: true }).json({ success: true, token, message: 'Logged in successfully' });
  } catch (error) {
    return next(error);
  }
});




module.exports = router;