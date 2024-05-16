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
});
export default Capability;
