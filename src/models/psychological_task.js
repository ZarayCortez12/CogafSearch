import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Psychological_task = sequelize.define(
  "psychological_task",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    measure: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "psychological_task",
  }
);
export default Psychological_task;
