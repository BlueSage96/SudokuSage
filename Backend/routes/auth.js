const express = require('express');
const router = express.Router();
const { StatusCodes } = require("http-status-codes");

const { getCSRFToken, getRegister, register, getLogin, login, logout, handleRefreshToken } = require('../controllers/auth');
// router.get("/login", (req, res) => {
//   res
//     .status(StatusCodes.OK)
//     .send(
//       `<form><input name="name" placeholder="Enter your name"/><input type="hidden" name="_csrf" value="${req.csrfToken()}"></form>`
//     );
// });
router.route('/csrf-token').get(getCSRFToken);
router.route('/register').get(getRegister).post(register);
router.route('/login').get(getLogin).post(login);
router.route('/logout').post(logout);
router.route('/refresh').post(handleRefreshToken);

module.exports = router;