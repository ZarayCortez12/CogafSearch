import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Complex_cognitive_function_type from "./complex_cognitive_function_type.js";
const Complex_cognitive_function = sequelize.define(
  "capability_cognitive_function",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    complex_cognitive_function_type_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "complex_cognitive_function", // Especificar el nombre de la tabla aquí
    timestamps: false,
  }
);

Complex_cognitive_function.belongsTo(Complex_cognitive_function_type, {
  foreignKey: "complex_cognitive_function_type_id",
  targetKey: "id",
  as: "complex_cognitive_function-Complex_cognitive_function_type",
});
export default Complex_cognitive_function;
