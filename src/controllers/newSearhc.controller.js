import Complementary_activity_cognitive_function from "../models/complementary_activity_cognitive_function.js";
import Complementary_activity from "../models/complementary_activity.js";
import Mechanic from "../models/mechanic.js";
import Mechanic_complementary_activity from "../models/mechanic_complementary_activity.js";
import Basic_emotion_type from "../models/basic_emotion_type.js";
import Secondary_emotion_type from "../models/secondary_emotion_type.js";
import { Sequelize } from "sequelize";
import sequelize from "../database/db.js";

export const defineQuestion = async (req, res) => {
  const { question } = req.body;

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
        const descriptions = results
          .map((result) => result.description)
          .join(", ");
        return res.status(200).json({
          message: `Las funciones cognitivas en la ${option} son: ${descriptions}`,
        });

      case 4:
        const [cognitiveTestResults] = await sequelize.query(
          `SELECT ccft.description
             FROM cognitive_test ct
             JOIN psychological_task_cognitive_test ptct ON ct.id = ptct.cognitive_test_id
             JOIN psychological_task pt ON ptct.psychological_task_id = pt.id
             JOIN psychological_task_cognitive_function ptcf ON pt.id = ptcf.psychological_task_id
             JOIN cognitive_function cf ON ptcf.cognitive_function_id = cf.id
             JOIN complex_cognitive_function ccf ON cf.id = ccf.id
             JOIN complex_cognitive_function_type ccft ON ccf.complex_cognitive_function_type_id = ccft.id
             WHERE ct.name = '${option}'`
        );
        if (!cognitiveTestResults || cognitiveTestResults.length === 0) {
          return res.status(404).json({
            message: "No se encontraron registros con el nombre del test dado.",
          });
        }
        const cognitiveTestDescriptions = cognitiveTestResults
          .map((result) => result.description)
          .join(", ");
        return res.status(200).json({
          message: `Las funciones cognitivas complejas en el test ${option} son: ${cognitiveTestDescriptions}`,
        });

      case 5:
        const [psychologicalTaskResults] = await sequelize.query(
          `SELECT pt.name
           FROM cognitive_test ct
           JOIN psychological_task_cognitive_test ptct ON ct.id = ptct.cognitive_test_id
           JOIN psychological_task pt ON ptct.psychological_task_id = pt.id
           WHERE ct.name = '${option}'`
        );
        if (
          !psychologicalTaskResults ||
          psychologicalTaskResults.length === 0
        ) {
          return res.status(404).json({
            message: "No se encontraron registros con el nombre del test dado.",
          });
        }
        const psychologicalTaskNames = psychologicalTaskResults
          .map((result) => result.name)
          .join(", ");
        return res.status(200).json({
          message: `Las tareas psicológicas en el test ${option} son: ${psychologicalTaskNames}`,
        });
      case 6:
        // Verificar si 'option' está en basic_emotion_type
        let basicEmotionTypeResults;
        try {
          basicEmotionTypeResults = await Basic_emotion_type.findAll({
            where: {
              description: option,
            },
            attributes: ["id"],
          });
        } catch (error) {
          console.error("Error al buscar en basic_emotion_type:", error);
          return res.status(500).json({
            message: "Error al buscar en basic_emotion_type.",
          });
        }

        // Verificar si 'option' está en secondary_emotion_type
        let secondaryEmotionTypeResults;
        try {
          secondaryEmotionTypeResults = await Secondary_emotion_type.findAll({
            where: {
              description: option,
            },
            attributes: ["id"],
          });
        } catch (error) {
          console.error("Error al buscar en secondary_emotion_type:", error);
          return res.status(500).json({
            message: "Error al buscar en secondary_emotion_type.",
          });
        }

        if (
          basicEmotionTypeResults.length === 0 &&
          secondaryEmotionTypeResults.length === 0
        ) {
          return res.status(404).json({
            message:
              "La opción no existe en basic_emotion_type ni en secondary_emotion_type.",
          });
        }

        // Si 'option' está en basic_emotion_type
        if (basicEmotionTypeResults.length > 0) {
          const basicEmotionTypeId = basicEmotionTypeResults[0].id;

          // Consulta para obtener la descripción de complex_cognitive_function_type
          try {
            const [results] = await sequelize.query(`
        SELECT ccf_type.description
        FROM basic_emotion_type bet
        JOIN basic_emotion be ON bet.id = be.basic_emotion_type_id
        JOIN emotion e ON be.id = e.id
        JOIN emotion_cognitive_function ecf ON e.id = ecf.emotion_id
        JOIN cognitive_function cf ON ecf.cognitive_function_id = cf.id
        JOIN complex_cognitive_function ccf ON cf.id = ccf.id
        JOIN complex_cognitive_function_type ccf_type ON ccf.complex_cognitive_function_type_id = ccf_type.id
        WHERE bet.id = ${basicEmotionTypeId}
      `);

            const descriptions = results
              .map((result) => result.description)
              .join(", ");
            return res.status(200).json({
              message: `Las funciones cognitivas complejas para el tipo de emoción básica ${option} son: ${descriptions}`,
            });
          } catch (error) {
            console.error(
              "Error al ejecutar la consulta para basic_emotion_type:",
              error
            );
            return res.status(500).json({
              message:
                "Error al obtener las funciones cognitivas complejas para el tipo de emoción básica.",
            });
          }
        }

        // Si 'option' está en secondary_emotion_type
        if (secondaryEmotionTypeResults.length > 0) {
          const secondaryEmotionTypeId = secondaryEmotionTypeResults[0].id;

          // Consulta para obtener la descripción de complex_cognitive_function_type
          try {
            const [results] = await sequelize.query(`
        SELECT ccf_type.description
        FROM secondary_emotion_type scet
        JOIN secondary_emotion se ON scet.id = se.secondary_emotion_type_id
        JOIN emotion e ON se.id = e.id
        JOIN emotion_cognitive_function ecf ON e.id = ecf.emotion_id
        JOIN cognitive_function cf ON ecf.cognitive_function_id = cf.id
        JOIN complex_cognitive_function ccf ON cf.id = ccf.id
        JOIN complex_cognitive_function_type ccf_type ON ccf.complex_cognitive_function_type_id = ccf_type.id
        WHERE scet.id = ${secondaryEmotionTypeId}
      `);

            const descriptions = results
              .map((result) => result.description)
              .join(", ");
            return res.status(200).json({
              message: `Las funciones cognitivas complejas para el tipo de emoción secundaria ${option} son: ${descriptions}`,
            });
          } catch (error) {
            console.error(
              "Error al ejecutar la consulta para secondary_emotion_type:",
              error
            );
            return res.status(500).json({
              message:
                "Error al obtener las funciones cognitivas complejas para el tipo de emoción secundaria.",
            });
          }
        }

      case 7:
        try {
          const query = `
              SELECT c.name AS characteristic_description, p.value AS parameter_value
              FROM emotion e
              JOIN emotion_characteristic ec ON e.id = ec.emotion_id
              JOIN characteristic c ON ec.characteristic_id = c.id
              JOIN parameter p ON c.id = p.characteristic_id
              LEFT JOIN basic_emotion be ON e.id = be.id
              LEFT JOIN basic_emotion_type bet ON be.basic_emotion_type_id = bet.id
              LEFT JOIN secondary_emotion se ON e.id = se.id
              LEFT JOIN secondary_emotion_type scet ON se.secondary_emotion_type_id = scet.id
              WHERE bet.description = '${option}' OR scet.description = '${option}';
            `;

          const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
          });

          if (!results || results.length === 0) {
            return res.status(404).json({
              message: `No se encontraron características y parámetros para la emoción con descripción '${option}'.`,
            });
          }

          // Construir la respuesta deseada
          let characteristicsMessage = `Características y parámetros para la emoción con descripción '${option}': `;

          results.forEach((result, index) => {
            if (index > 0) {
              characteristicsMessage += ", ";
            }
            characteristicsMessage += `${result.parameter_value} ${result.characteristic_description}`;
          });

          return res.status(200).json({
            message: characteristicsMessage,
          });
        } catch (error) {
          console.error("Error al ejecutar la consulta:", error);
          return res.status(500).json({
            message:
              "Error al obtener características y parámetros para la emoción.",
          });
        }

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
