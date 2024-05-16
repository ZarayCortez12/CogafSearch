import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Application_type = sequelize.define("application_type", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
export default Application_type;