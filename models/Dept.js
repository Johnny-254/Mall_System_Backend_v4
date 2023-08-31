import { DataTypes } from "sequelize";

const Dept = (sequelize, Sequelize) => {
  const Dept = sequelize.define(
    "dept",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
    },
    {
      paranoid: true,
    }
  );
  return Dept;
};

export default Dept;
