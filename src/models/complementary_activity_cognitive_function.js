import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Complementary_activity from "./complementary_activity.js";
import Cognitive_function from "./cognitive_function.js";

const Complementary_activity_cognitive_function = sequelize.define(
    "complementary_activity_cognitive_function",
    {
      complementary_activity_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      cognitive_function_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
    },
    {
      tableName: "complementary_activity_cognitive_function", // Especificar el nombre de la tabla aquí
      timestamps: false,
    }
  );
  
  Complementary_activity_cognitive_function.belongsTo(Complementary_activity, {
    foreignKey: "complementary_activity_id",
    targetKey: "id",
    as: "complementary_activity_cognitive_function-complementary_activity",
  });
  
  Complementary_activity_cognitive_function.belongsTo(Cognitive_function, {
    foreignKey: "cognitive_function_id",
    targetKey: "id",
    as: "complementary_activity_cognitive_function-cognitive_function",
  
});

export default Complementary_activity_cognitive_function;