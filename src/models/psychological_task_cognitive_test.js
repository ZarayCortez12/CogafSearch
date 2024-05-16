import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Psychological_task from "./psychological_task.js";
import Cognitive_test from "./cognitive_test.js";

const Psychological_task_cognitive_test = sequelize.define(
  "psychological_task_cognitive_test",
  {
    psychological_task_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    cognitive_test_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  }
);

Psychological_task_cognitive_test.belongsTo(Psychological_task, {
  foreignKey: "psychological_task_id",
  targetKey: "id",
  as: "psychological_task_cognitive_test-t",
});
Psychological_task_cognitive_test.belongsTo(Cognitive_test, {
  foreignKey: "cognitive_test_id",
  targetKey: "id",
  as: "psychological_task_cognitive_test-c",
});
export default Psychological_task_cognitive_test;
