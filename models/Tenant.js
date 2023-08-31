import { DataTypes } from "sequelize";

const Tenant = (sequelize, Sequelize) => {
  const Tenant = sequelize.define(
    "tenant",
    {
      tenant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_no: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      unique_key: {
        type: DataTypes.STRING,
        allowNull: true,
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
  return Tenant;
};

export default Tenant;
