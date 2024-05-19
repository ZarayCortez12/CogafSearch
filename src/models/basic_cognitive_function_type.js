import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Basic_cognitive_function_type = sequelize.define("basic_cognitive_function_type", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
  },
}, {
  tableName: 'basic_cognitive_function_type', // Especificar el nombre de la tabla aquí
  timestamps: false
});
export default Basic_cognitive_function_type;
