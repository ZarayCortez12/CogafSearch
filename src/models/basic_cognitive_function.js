import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Basic_cognitive_function_type from "./basic_cognitive_function_type.js";

const Basic_cognitive_function = sequelize.define("basic_cognitive_function", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  basic_cognitive_function_type_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'basic_cognitive_function', // Especificar el nombre de la tabla aquí
  timestamps: false
});
Basic_cognitive_function.belongsTo(Basic_cognitive_function_type, { foreignKey: 'basic_cognitive_function_type_id', targetKey: 'id', as: 'b-cognitive-function_b-cognitive-function-type' });

export default Basic_cognitive_function;
