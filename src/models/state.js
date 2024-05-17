import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const State = sequelize.define(
  "state",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    valence: {
      type: Sequelize.FLOAT,
    },
    arousal: {
      type: Sequelize.FLOAT,
    },
  },
  {
    tableName: "state", // Especificar el nombre de la tabla aquí
    timestamps: false,
  }
);
export default State;
