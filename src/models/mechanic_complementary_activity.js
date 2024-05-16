import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Mechanic from "./mechanic.js";
import Complementary_activity from "./complementary_activity.js";

const Mechanic_complementary_activity = sequelize.define(
  "mechanic_complementary_activity",
  {
    mechanic_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    complementary_activity_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
  }
);

Mechanic_complementary_activity.belongsTo(Mechanic, {
  foreignKey: "mechanic_id",
  targetKey: "id",
  as: "mechanic_complementary_activity-m",
});
Mechanic_complementary_activity.belongsTo(Complementary_activity, {
  foreignKey: "complementary_activity_id",
  targetKey: "id",
  as: "mechanic_complementary_activity-c",
});

export default Mechanic_complementary_activity;
