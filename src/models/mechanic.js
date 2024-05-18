import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Mechanic = sequelize.define("mechanic", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  tableName: 'mechanic', // Especificar el nombre de la tabla aquí
  timestamps: false
});
export default Mechanic;