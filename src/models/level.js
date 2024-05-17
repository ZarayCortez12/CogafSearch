import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Level = sequelize.define(
  "level",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    rank: {
      type: Sequelize.STRING,
    },
  },
  {
    tableName: "level", // Especificar el nombre de la tabla aquí
    timestamps: false,
  }
);

export default Level;
