import Sequelize from "sequelize";
import Complex_cognitive_function_type from "../models/complex_cognitive_function_type.js";
import Complex_cognitive_function from "../models/complex_cognitive_function.js";
import Cognitive_function from "../models/cognitive_function.js";
import Complementary_activity_cognitive_function from "../models/complementary_activity_cognitive_function.js";
import Complementary_activity from "../models/complementary_activity.js";
import Mechanic from "../models/mechanic.js";
import Mechanic_complementary_activity from "../models/mechanic_complementary_activity.js";

export const defineQuestion = async (req, res) => {
  const { question } = req.body;

  // hacer un switch que compare si question es 1, 2 o 9
  switch (question) {
    case 1:
      const question1 = await Complementary_activity_cognitive_function.findAll(
        {
          where: { cognitive_function_id: 4 },
          include: [
            {
              model: Complementary_activity,
              as: "complementary_activity_cognitive_function-complementary_activity",
            },
          ],
        }
      );
      if (!question1) {
        return res.status(404).json({
          message: "No se encontraron registros con los IDs dados.",
        });
      }
      // sacar la propiedad name de cada uno de los registros
      const question1Name = question1.map(
        (question) =>
          question[
            "complementary_activity_cognitive_function-complementary_activity"
          ].name
      );
      return res.status(200).json({ question1Name });
    case 2:
      const question2 = await Complementary_activity_cognitive_function.findAll(
        {
          where: { cognitive_function_id: 4 },
          include: [
            {
              model: Complementary_activity,
              as: "complementary_activity_cognitive_function-complementary_activity",
            },
          ],
        }
      );
      if (!question2) {
        return res.status(404).json({
          message: "No se encontraron registros con los IDs dados.",
        });
      }
      // sacar la propiedad id de cada uno de los registros
      const question2Id = question2.map(
        (question) =>
          question[
            "complementary_activity_cognitive_function-complementary_activity"
          ].id
      );

      // para cada una de las question2Id, obtener las mecanicas que se relacionan con cada una de las actividades
      const mecanicas = question2Id.map(async (id) => {
        const mecanicasSet = new Set();
        const relaciones = await Mechanic_complementary_activity.findAll({
          where: {
            complementary_activity_id: id,
          },
          include: [
            {
              model: Mechanic,
              as: "mechanic_complementary_activity-m",
            },
          ],
        });
        relaciones.forEach((relacion) => {
          mecanicasSet.add(relacion["mechanic_complementary_activity-m"].name);
        });
        return mecanicasSet;
      });
      return res.status(200).json({ mecanicas });
    case 9:
  }
};
