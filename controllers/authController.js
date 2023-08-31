import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import db from "../models/index.js";

// User Authorization
const User = db.User;

const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
    } else {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = jwt.sign({ id: user.id }, "secret_jwt", {
          expiresIn: "1hr",
        });
        res.json({ token: token });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
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
    res.json({ token: token });
  } catch (error) {
    next(error);
  }
};

// Staff Authorization
// const Staff = db.Staff;

export { login, signup };
