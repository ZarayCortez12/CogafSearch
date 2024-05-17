import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Event = sequelize.define(
  "event",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    description: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "event",
    timestamps: false,
  }
);
export default Event;
