import { DataTypes } from "sequelize";

const User = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
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

  return User;
};

export default User;
