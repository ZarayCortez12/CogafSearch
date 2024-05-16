import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Cognitive_function = sequelize.define("cognitive_function", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});
export default Cognitive_function;