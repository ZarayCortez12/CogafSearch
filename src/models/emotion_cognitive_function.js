import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Emotion from "./emotion.js";
import Cognitive_function from "./cognitive_function.js";

const Emotion_cognitive_function = sequelize.define(
  "emotion_cognitive_function",
  {
    emotion_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    cognitive_function_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: "emotion_cognitive_function", // Especificar el nombre de la tabla aquí
    timestamps: false,
  }
);

Emotion_cognitive_function.belongsTo(Emotion, {
  foreignKey: "emotion_id",
  targetKey: "id",
  as: "emotion_cognitive_function-capability",
});

Emotion_cognitive_function.belongsTo(Cognitive_function, {
  foreignKey: "cognitive_function_id",
  targetKey: "id",
  as: "emotion_cognitive_function-cognitive_function",
});
export default Emotion_cognitive_function;
