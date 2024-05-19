import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Capability = sequelize.define("capability", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  tableName: 'capability', // Especificar el nombre de la tabla aquí
  timestamps: false
});
export default Capability;
