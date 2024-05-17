import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Capability from "./capability.js";
import Cognitive_function from "./cognitive_function.js";

const Capability_cognitive_function = sequelize.define(
  "capability_cognitive_function",
  {
    capability_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    cognitive_function_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: "capability_cognitive_function", // Especificar el nombre de la tabla aquí
    timestamps: false,
  }
);

Capability_cognitive_function.belongsTo(Capability, {
  foreignKey: "capability_id",
  targetKey: "id",
  as: "capability_cognitive_function-Capability",
});

Capability_cognitive_function.belongsTo(Cognitive_function, {
  foreignKey: "cognitive_function_id",
  targetKey: "id",
  as: "capability_cognitive_function-Cognitive_function",
});
export default Capability_cognitive_function;
