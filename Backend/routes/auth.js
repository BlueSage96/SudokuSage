const express = require('express');
const router = express.Router();
const { StatusCodes } = require("http-status-codes");

const { register, login, logout, handleRefreshToken } = require('../controllers/auth');
router.get('/register', (req, res) => {
    res
      .status(StatusCodes.OK)
      .send(`<form><input name="name" placeholder="Enter your name"/><input type="hidden" name="_csrf" value="${req.csrfToken()}"></form>`);
});
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/refresh').post(handleRefreshToken);

module.exports = router;