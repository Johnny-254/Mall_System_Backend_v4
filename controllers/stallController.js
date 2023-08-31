import db from "../models/index.js";

const Stall = db.Stall;

const getAllStalls = async (req, res) => {
  try {
    const response = await Stall.findAll();
    if (response.length === 0) {
      res.status(404).json({ message: "No stalls found" });
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getStallById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Stall.findByPk(id);
    if (response === null) {
      res.status(404).json({ message: "Stall not found." });
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const createStall = async (req, res) => {
  const stall = req.body;

  try {
    const response = await Stall.create(stall);
    if (!response) {
      res.status(500).json({ message: "Internal server error" });
    } else if (response) {
      res.status(201).json({ message: "Stall leased." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateStallById = async (req, res) => {
  const { id } = req.params;
  const { rented, tenant_id } = req.body;

  try {
    const [affectedRows] = await Stall.update(
      {
        rented,
        tenant_id,
      },
      { where: { id: id } }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Stall not found" });
    }

    res.status(200).json({ message: "Stall updated." });
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteStallById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Stall.destroy({ where: { stall_id: id } });
    if (response === 0) {
      res.status(404).json({ message: "Stall not found" });
    } else if (response) {
      res.status(200).json({ message: "Stall deleted." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export {
  createStall,
  getAllStalls,
  getStallById,
  updateStallById,
  deleteStallById,
};
