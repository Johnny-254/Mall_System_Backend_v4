import db from "../models/index.js";
import bcrypt from "bcrypt";

const Tenant = db.Tenant;

const getAllTenants = async (req, res) => {
  try {
    const response = await Tenant.findAll();
    if (response.length === 0) {
      res.status(404).json({ message: "No tenants found" });
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTenantById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Tenant.findByPk(id);
    if (response === null) {
      res.status(404).json({ message: "Tenant not found." });
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const createTenant = async (req, res) => {
  const { tenant_id, first_name, last_name, phone_no, email, password } =
    req.body;

  try {
    // Check if email is already taken
    const existingEmailUser = await Tenant.findOne({ where: { email: email } });
    if (existingEmailUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    // If no errors so far, create the tenant account
    const hash = await bcrypt.hash(password, 10);
    const response = await Tenant.create({
      tenant_id: tenant_id,
      first_name: first_name,
      last_name: last_name,
      phone_no: phone_no,
      email: email,
      password: hash,
    });
    if (!response) {
      res.status(500).json({ message: "Internal server error" });
    } else if (response) {
      res.status(201).json({ message: "Tenant created." });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateTenantById = async (req, res) => {
  const { id } = req.params;
  const { tenant_id, title, description } = req.body;
  try {
    const [response] = await Tenant.update(
      {
        tenant_id: tenant_id,
        title: title,
        password: description,
      },
      { where: { tenant_id: id } }
    );
    if (response === 0) {
      res.status(404).json({ message: "Tenant not found" });
    } else if (response) {
      res.status(201).json({ message: "Tenant lease." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTenantById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Tenant.destroy({ where: { tenant_id: id } });
    if (response === 0) {
      res.status(404).json({ message: "Tenant not found" });
    } else if (response) {
      res.status(200).json({ message: "Tenant deleted." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export {
  createTenant,
  getAllTenants,
  getTenantById,
  updateTenantById,
  deleteTenantById,
};
