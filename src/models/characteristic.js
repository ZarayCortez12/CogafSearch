import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Characteristic = sequelize.define("characteristic", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  tableName: 'characteristic', // Especificar el nombre de la tabla aquí
  timestamps: false
});

export default Characteristic;
