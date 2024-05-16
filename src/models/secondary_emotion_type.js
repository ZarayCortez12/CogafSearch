import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Secondary_emotion_type = sequelize.define("secondary_emotion_type", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
export default Secondary_emotion_type;
