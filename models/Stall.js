import { DataTypes } from "sequelize";

const Stall = (sequelize, Sequelize) => {
  const Stall = sequelize.define(
    "Stall",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      floor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rented: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "false",
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
  return Stall;
};

export default Stall;
