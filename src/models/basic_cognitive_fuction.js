import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Basic_cognitive_fuction_type from "./basic_cognitive_fuction_type.js";

const Basic_cognitive_fuction = sequelize.define("basic_cognitive_function", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  basic_cognitive_fuction_type_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'basic_cognitive_function', // Especificar el nombre de la tabla aquí
  timestamps: false
});
Basic_cognitive_fuction.belongsTo(Basic_cognitive_fuction_type, { foreignKey: 'basic_cognitive_fuction_type_id', targetKey: 'id', as: 'b-cognitive-fuction_b-cognitive-fuction-type' });

export default Basic_cognitive_fuction;
