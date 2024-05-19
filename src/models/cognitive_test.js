import Sequelize from "sequelize";
import sequelize from "../database/db.js";
import Application_type from "./application_type.js";

const Cognitive_test = sequelize.define(
  "cognitive_test",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    age_rank: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    application_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    test_type_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "cognitive_test",
  }
);
Cognitive_test.belongsTo(Application_type, {
  foreignKey: "application_id",
  targetKey: "id",
  as: "congnitive-test_application-type",
});

export default Cognitive_test;
