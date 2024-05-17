import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Complex_cognitive_function_type = sequelize.define(
  "capability_cognitive_function",
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
    tableName: "complex_cognitive_function_type", // Especificar el nombre de la tabla aquí
    timestamps: false,
  }
);
export default Complex_cognitive_function_type;
