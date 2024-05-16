import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Basic_emotion_types = sequelize.define("basic_emotion_type", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
  },
}, {
  tableName: 'basic_emotion_type', // Especificar el nombre de la tabla aquí
  timestamps: false
});
export default Basic_emotion_types;
