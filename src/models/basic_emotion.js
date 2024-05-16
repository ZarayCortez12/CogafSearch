import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Basic_emotion_type from "./basic_emotion_type.js";

const Basic_emotion = sequelize.define("basic_emotion", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  basic_emotion_type_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'basic_emotion', // Especificar el nombre de la tabla aquí
  timestamps: false
});
Basic_emotion.belongsTo(Basic_emotion_type, { foreignKey: 'basic_emotion_type_id', targetKey: 'id', as: 'b-emotion_b-emotion-type' });

export default Basic_emotion;
