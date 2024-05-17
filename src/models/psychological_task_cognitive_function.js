import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Psychological_task from "./psychological_task.js";
import Cognitive_function from "./cognitive_function.js";

const Psychological_task_cognitive_function = sequelize.define(
  "psychological_task_cognitive_function",
  {
    psychological_task_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    cognitive_function_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: "psychological_task_cognitive_function", // Especificar el nombre de la tabla aquí
    timestamps: false,
  }
);

Psychological_task_cognitive_function.belongsTo(Psychological_task, {
  foreignKey: "psychological_task_id",
  targetKey: "id",
  as: "psychological_task_cognitive_function-psychological_task",
});

Psychological_task_cognitive_function.belongsTo(Cognitive_function, {
  foreignKey: "cognitive_function_id",
  targetKey: "id",
  as: "psychological_task_cognitive_function-cognitive_function",
});
export default Psychological_task_cognitive_function;
