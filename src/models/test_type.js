import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Test_type = sequelize.define(
  "test_type",
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
    tableName: "test_type", // Especificar el nombre de la tabla aquí
    timestamps: false,
  }
);
export default Test_type;