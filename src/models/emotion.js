import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Emotion = sequelize.define("emotion", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  state_id: {
    type: Sequelize.INTEGER,
  },
}, {
  tableName: 'emotion', // Especificar el nombre de la tabla aquí
  timestamps: false
});
export default Emotion;
