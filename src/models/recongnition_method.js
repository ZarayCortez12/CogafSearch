import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Characteristic from "./characteristic.js";

const Recongnition_method = sequelize.define(
  "recongnition_method",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    characteristic_id: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "recongnition_method", // Especificar el nombre de la tabla aquí
    timestamps: false,
  }
);

Recongnition_method.belongsTo(Characteristic, {
  foreignKey: "characteristic_id",
  targetKey: "id",
  as: "recongnition_method-characteristic",
});
export default Recongnition_method;
