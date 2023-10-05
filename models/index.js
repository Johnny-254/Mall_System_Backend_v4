import { Sequelize } from "sequelize";

import sequelize from "../config/db.js";

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

import User from "./User.js";
db.User = User(sequelize, Sequelize);

import Admin from "./Admin.js";
db.Admin = Admin(sequelize, Sequelize);

import Dept from "./Dept.js";
db.Dept = Dept(sequelize, Sequelize);

import Staff from "./Staff.js";
db.Staff = Staff(sequelize, Sequelize);

import Stall from "./Stall.js";
db.Stall = Stall(sequelize, Sequelize);

import Tenant from "./Tenant.js";
db.Tenant = Tenant(sequelize, Sequelize);

//Department & Staff has One-To-Many Relationship
db.Staff.hasOne(db.Dept, { foreignKey: "staff_id", unique: true });

db.Dept.belongsTo(db.Staff, { foreignKey: "staff_id" });

// Tenant & Stall has One-To-many Relationship
db.Tenant.hasMany(db.Stall, { foreignKey: "tenant_id" });

db.Stall.belongsTo(db.Tenant, { foreignKey: "tenant_id" });

export default db;
