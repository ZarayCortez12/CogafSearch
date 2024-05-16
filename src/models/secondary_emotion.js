import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Secondary_emotion_type from "./secondary_emotion_type.js";

const Secondary_emotion = sequelize.define("secondary_emotion", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  secondary_emotion_type_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});
Secondary_emotion.belongsTo(Secondary_emotion_type, { foreignKey: 'secondary_emotion_type_id', targetKey: 'id', as: 's-emotion_s-emotion-type' });

export default Secondary_emotion;