import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Characteristic from "./characteristic.js";

const Behaviour = sequelize.define("behaviour", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  characteristic_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  event_id: {
    type: Sequelize.INTEGER,
  },
}, {
  tableName: 'behaviour', // Especificar el nombre de la tabla aquí
  timestamps: false
});

Behaviour.belongsTo(Characteristic, {
  foreignKey: "characteristic_id",
  targetKey: "id",
  as: "behaviour_characteristic",
});

export default Behaviour;
