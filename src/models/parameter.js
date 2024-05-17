import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Characteristic from "./characteristic.js";

const Parameter = sequelize.define(
  "parameter",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    value: {
      type: Sequelize.STRING,
    },
    characteristic_id: {
      type: Sequelize.INTEGER,
    },
  },
);

Parameter.belongsTo(Characteristic, {
  foreignKey: "characteristic_id",
  targetKey: "id",
  as: "parameter-characteristic",
});
export default Parameter;
