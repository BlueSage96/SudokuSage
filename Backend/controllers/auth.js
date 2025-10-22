const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token }); //201 status
};

const login = async (req, res, next) => {
  try {
    //check for cookies
    const cookies = req.cookies;
    console.log(`Cookie available at login: ${JSON.stringify(cookies)}`);

    const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please provide an email address and password");
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid credentials" });
    }
    //create jwts
    const accessToken = jwt.sign({ userId: user._id }, tokenSecret, {
      expiresIn: "24h",
    });

    //create new refresh token
    const newRefreshToken = jwt.sign({ userId: user._id }, refreshSecret, {
      expiresIn: "24h",
    });

    //save refresh token to DB
    user.refreshToken = [newRefreshToken];
    await user.save();

    //creates secure cookie w/refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.status(StatusCodes.OK).json({
      user: { id: user._id, email: user.email, name: user.name },
      token: accessToken,
      msg: "Login is successful!",
    });
  } catch (err) {
    return next(err);
  }
};

const logout = async (req, res) => {
  //on client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(StatusCodes.NO_CONTENT);
  const refreshToken = cookies.jwt;

  //is refreshToken in db?
  const user = await User.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    return res.status(StatusCodes.NO_CONTENT);
  }

  //delete refreshToken in db
  user.refreshToken = user.refreshToken.filter((rt) => rt !== refreshToken);
  await user.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.status(StatusCodes.NO_CONTENT);
};

const handleRefreshToken = async (req, res) => {
  const accessSecret = process.env.ACCESS_TOKEN_SECRET;
  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(StatusCodes.UNAUTHORIZED);

  const oldRT = cookies.jwt;
  const user = await User.findOne({ refreshToken: oldRT }).exec(); //find user with refresh token

  //detected refresh token reuse!
  if (!user) return res.status(StatusCodes.FORBIDDEN);

  //verify old token first, decode token and link to account, check for reused token
  jwt.verify(oldRT, refreshSecret, (err, decoded) => {
    if (err || user._id.toString() !== decoded.userId)
      return res.status(StatusCodes.FORBIDDEN);
  });

  //generate new tokens
  const accessToken = jwt.sign({ userId: user._id }, accessSecret, {
    expiresIn: "24h",
  });

  const newRT = jwt.sign({ userId: user._id }, refreshSecret, {
    expiresIn: "12h",
  });

  //rotate fresh tokens!
  user.refreshToken = user.refreshToken.filter((rt) => rt !== oldRT);
  user.refreshToken.push(newRT);
  await user.save();

  //send cookie back
  res.cookie("jwt", newRT, { httpOnly: true, secure: true, sameSite: "None" });
  res.json({ accessToken });
};

module.exports = { register, login, logout, handleRefreshToken };
