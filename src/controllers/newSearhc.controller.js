import Complementary_activity_cognitive_function from "../models/complementary_activity_cognitive_function.js";
import Complementary_activity from "../models/complementary_activity.js";
import Mechanic from "../models/mechanic.js";
import Mechanic_complementary_activity from "../models/mechanic_complementary_activity.js";
import { Sequelize } from "sequelize";
import sequelize from "../database/db.js";

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
      // sacar la propiedad name de cada uno de los registros
      const question2Name = question2.map(
        (question) =>
          question[
            "complementary_activity_cognitive_function-complementary_activity"
          ].name
      );
      return res.status(200).json({ question2Name });
    case 9:
      const question9 = await Complementary_activity_cognitive_function.findAll(
        {
          where: { cognitive_function_id: 1 },
          include: [
            {
              model: Complementary_activity,
              as: "complementary_activity_cognitive_function-complementary_activity",
            },
          ],
        }
      );

      if (!question9) {
        return res.status(404).json({
          message: "No se encontraron registros con los IDs dados.",
        });
      }

      // sacar la propiedad id de cada uno de los registros
      const question9Id = question9.map(
        (question) =>
          question[
            "complementary_activity_cognitive_function-complementary_activity"
          ].id
      );

      // traer el nombre de la mecanica que se relaciona con cada actividad
      const mecanicas = await Promise.all(
        question9Id.map(async (id) => {
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
            mecanicasSet.add(
              relacion["mechanic_complementary_activity-m"].name
            );
          });
          return Array.from(mecanicasSet);
        })
      );

      const allMecanicas = mecanicas.flat();

      return res.status(200).json({ mecanicas: allMecanicas });
  }
};

export const optionQuestion = async (req, res) => {
  const { question, option } = req.body;

  try {
    switch (question) {
      case 3:
        const [results] = await sequelize.query(
          ` SELECT ccft.description
          FROM capability c
          JOIN capability_cognitive_function ccf ON c.id = ccf.capability_id
          JOIN complex_cognitive_function ccf2 ON ccf.cognitive_function_id = ccf2.id
          JOIN complex_cognitive_function_type ccft ON ccf2.complex_cognitive_function_type_id = ccft.id
          WHERE c.name = '${option}'`
        );
        if (!results || results.length === 0) {
          return res.status(404).json({
            message: "No se encontraron registros con el nombre dado.",
          });
        }
        const descriptions = results.map((result) => result.description).join(', ');
        return res.status(200).json({
          message: `Las funciones cognitivas en la ${option} son: ${descriptions}`,
        });

      case 4:        
        return res.status(200).json({
          message: "fafha.",
        });
      
      default:
        return res.status(400).json({
          message: "Pregunta no válida.",
        });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor.",
    });
  }
};
