import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Characteristic from "./characteristic.js";
import Emotion from "./emotion.js";

const Emotions_Characteristic = sequelize.define("emotions_characteristic", {
  emotion_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  characteristic_id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
}, {
  tableName: 'emotion_characteristic', // Especificar el nombre de la tabla aquí
  timestamps: false
});

Emotions_Characteristic.belongsTo(Characteristic, { foreignKey: 'characteristic_id', targetKey: 'id', as: 'emotion_characteristic-c' });
Emotions_Characteristic.belongsTo(Emotion, { foreignKey: 'emotion_id', targetKey: 'id', as: 'emotion_characteristic-e' });

export default Emotions_Characteristic;
