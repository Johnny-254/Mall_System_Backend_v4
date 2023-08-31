import db from "../models/index.js";

const Dept = db.Dept;

const getAllDepts = async (req, res) => {
  try {
    const response = await Dept.findAll();
    if (response.length === 0) {
      res.status(404).json({ message: "No Dept found" });
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getDeptById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Dept.findByPk(id);
    if (response === null) {
      res.status(404).json({ message: "Dept not found." });
    } else if (response) {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const createDept = async (req, res) => {
  try {
    const response = await Dept.create(req.body);
    if (!response) {
      res.status(500).json({ message: "Internal server error" });
    } else if (response) {
      res.status(201).json({ message: "Dept created." });
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

const updateDeptById = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const [response] = await Dept.update(
      {
        name: name,
        description: description,
      },
      { where: { dept_id: id } }
    );
    if (response === 0) {
      res.status(404).json({ message: "Dept not found" });
    } else if (response) {
      res.status(201).json({ message: "Dept updated." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteDeptById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Dept.destroy({ where: { dept_id: id } });
    if (response === 0) {
      res.status(404).json({ message: "Dept not found" });
    } else if (response) {
      res.status(200).json({ message: "Dept deleted." });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export { createDept, getAllDepts, getDeptById, updateDeptById, deleteDeptById };
