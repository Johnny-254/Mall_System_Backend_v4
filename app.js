import express, { response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import deptRoutes from "./routes/deptRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import stallRoutes from "./routes/stallRoutes.js";
import tenantRoutes from "./routes/tenantRoutes.js";
import authRoutes from "./routes/authRotes.js";
import adminRoutes from "./routes/adminRoutes.js";

import sendEmail from "./middlewares/emailHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

import db from "./models/index.js";

const sequelize = db.sequelize;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(errorHandler);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tables created.");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes);
app.use("/api/v1", deptRoutes);
app.use("/api/v1", staffRoutes);
app.use("/api/v1", stallRoutes);
app.use("/api/v1", tenantRoutes);
app.use("/api/v1", authRoutes);

app.post("/api/v2/send_recovery_email", (req, res) => {
  sendEmail(req.body)
    .then(() => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});
