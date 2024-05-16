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
});
export default Mechanic;