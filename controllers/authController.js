const express = require("express");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const CustomError = require("../util/customError");

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      next(new CustomError("Email already Exist", 400));
    }
    const newUser = await User.create({
      name,
      email,
      password
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN
    });
    res.setHeader("Content-type", "application/json");
    return res.status(200).json({
      status: "Success",
      token,
      data: { newUser }
    });
  } catch (error) {
    return next(new CustomError(error.message, 400));
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new CustomError("Please provide email and password", 401));
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password, user.password))) {
      return next(new CustomError("Incorrect email or password", 401));
    }
    if (user && !(await user.comparePassword(password, user.password))) {
      return next(new CustomError("Incorrect email or password", 401));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN
    });
    res.status(200).json({
      status: "success",
      token
    });
  } catch (error) {
    return next(new CustomError(error.message, 400));
  }
};
