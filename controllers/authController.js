import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import db from "../models/index.js";
import sendEmail from "../middlewares/emailHandler.js";
import { where } from "sequelize";

// User Authorization
const User = db.User;

// Admin Authorization
const Admin = db.Admin;

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // Check the 'users' table
    const user = await User.findOne({ where: { username: username } });

    // Check the 'admins' table
    const admin = await Admin.findOne({ where: { username: username } });

    if (!user && !admin) {
      res.status(401).json({
        authenticated: false,
        message: "Invalid username or password",
      });
    } else {
      // First, check if it's a user
      if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          const token = jwt.sign({ id: user.id }, "secret_jwt", {
            expiresIn: "1hr",
          });

          res.json({ authenticated: true, token: token, userType: "customer" });

          // if (!token) return res.status(400).send({ message: "Invalid link" });

          return;
        }
      }

      // Then, check if it's an admin
      if (admin) {
        const adminResult = await bcrypt.compare(password, admin.password);
        if (adminResult) {
          const token = jwt.sign({ id: admin.id }, "secret_jwt", {
            expiresIn: "1hr",
          });

          res.json({ authenticated: true, token: token, userType: "admin" });
          return;
        }
      }

      // If neither user nor admin credentials match
      res.status(401).json({
        authenticated: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Check if username is already taken
    const existingUsernameUser = await User.findOne({
      where: { username: username },
    });
    if (existingUsernameUser) {
      return res.status(400).json({ message: "Username is already taken." });
    }

    // Check if email is already taken
    const existingEmailUser = await User.findOne({ where: { email: email } });
    if (existingEmailUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // If username is available, create the user
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username,
      email: email,
      password: hash,
    });
    const token = jwt.sign({ id: user.id }, "secret_key", {
      expiresIn: "1hr",
    });

    const url = `${process.env.BASE_URL}/user/${user.id}/verify/${token}`;
    await sendEmail(user.email, "Verify Email", url);

    if (token) {
      await User.update({ email_verified: true }, { where: { id: user.id } });
    }
    // res.status(200).send({ message: "Email verified successfully" });
    res.json({ authenticated: true, token: token, userType: "customer" });
  } catch (error) {
    next(error);
  }
};

export { login, signup };
