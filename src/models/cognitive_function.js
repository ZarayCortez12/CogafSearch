import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Cognitive_function = sequelize.define("cognitive_function", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
},
{
  tableName: "cognitive_function", // Especificar el nombre de la tabla aquí
  timestamps: false,
}
);

export default Cognitive_function;