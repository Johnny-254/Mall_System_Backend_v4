import db from "../models/index.js";
import bcrypt from "bcrypt";

const Admin = db.Admin;

const getAllAdmins = async (req, res) => {
  try {
    const response = await Admin.findAll();
    if (response.length === 0) {
      res.status(404).json({ message: "No admins found" });
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Admin.findByPk(id);
    if (response === null) {
      res.status(404).json({ message: "Admin not found." });
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const createAdmin = async (req, res) => {
  const {
    username,
    admin_id,
    first_name,
    last_name,
    phone_no,
    email,
    password,
  } = req.body;

  try {
    // Check if email is already taken
    const existingEmailUser = await Admin.findOne({ where: { email: email } });
    if (existingEmailUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // If no errors so far, create the admin account
    const hash = await bcrypt.hash(password, 10);
    const response = await Admin.create({
      username: username,
      admin_id: admin_id,
      first_name: first_name,
      last_name: last_name,
      phone_no: phone_no,
      email: email,
      password: hash,
    });
    if (!response) {
      res.status(500).json({ message: "Internal server error" });
    } else if (response) {
      res.status(201).json({ message: "Admin created." });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateAdminById = async (req, res) => {
  const { id } = req.params;
  const { admin_id, title, description } = req.body;
  try {
    const [response] = await Admin.update(
      {
        admin_id: admin_id,
        title: title,
        password: description,
      },
      { where: { admin_id: id } }
    );
    if (response === 0) {
      res.status(404).json({ message: "Admin not found" });
    } else if (response) {
      res.status(201).json({ message: "Admin lease." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteAdminById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Admin.destroy({ where: { admin_id: id } });
    if (response === 0) {
      res.status(404).json({ message: "Admin not found" });
    } else if (response) {
      res.status(200).json({ message: "Admin deleted." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
