import Sequelize from "sequelize";
import sequelize from "../database/db.js";

const Complementary_activity = sequelize.define("complementary_activity", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
},
{
  tableName: "complementary_activity", // Especificar el nombre de la tabla aquí
  timestamps: false,
}
);
export default Complementary_activity;
