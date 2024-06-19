import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Question = sequelize.define("question", {
  id_question: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
  },
  type: {    
    type: Sequelize.STRING,
  },
}, {
  tableName: 'question', // Especificar el nombre de la tabla aquí
  timestamps: false
});
export default Question;