import db from "../models/index.js";

const Staff = db.Staff;

const getAllStaff = async (req, res) => {
  try {
    const response = await Staff.findAll();
    if (response.length === 0) {
      res.status(404).json({ message: "No Staff found" });
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getStaffById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Staff.findByPk(id);
    if (response === null) {
      res.status(404).json({ message: "Staff not found." });
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const createStaff = async (req, res) => {
  const staff = req.body;

  try {
    const response = await Staff.create(staff);
    if (!response) {
      res.status(500).json({ message: "Internal server error" });
    } else if (response) {
      res.status(201).json({ message: "Staff created." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateStaffById = async (req, res) => {
  const { id } = req.params;
  const { Staff_id, first_name, last_name, email, dob } = req.body;
  try {
    const [response] = await Staff.update(
      {
        Staff_id: Staff_id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        dob: dob,
      },
      { where: { Staff_id: id } }
    );
    if (response === 0) {
      res.status(404).json({ message: "Staff not found" });
    } else if (response) {
      res.status(201).json({ message: "Staff updated." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteStaffById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Staff.destroy({ where: { Staff_id: id } });
    if (response === 0) {
      res.status(404).json({ message: "Staff not found" });
    } else if (response) {
      res.status(200).json({ message: "Staff deleted." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export {
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaffById,
  deleteStaffById,
};
