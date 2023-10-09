import { DataTypes } from "sequelize";
import sequelize from "../config/database/database.js";

const Plane = sequelize.define("plane", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    field: "plane_id",
  },
  planeNumber: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: "plane_number",
  },
  model: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  maxCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "max_capacity",
  },
  airline: {
    type: DataTypes.ENUM(
      "AeroGlobe",
      "AeroTronix",
      "VelocityAir",
      "AirQuest",
      "StartLink"
    ),
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

export default Plane;
