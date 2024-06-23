import Complementary_activity_cognitive_function from "../models/complementary_activity_cognitive_function.js";
import Complementary_activity from "../models/complementary_activity.js";
import Mechanic from "../models/mechanic.js";
import Mechanic_complementary_activity from "../models/mechanic_complementary_activity.js";
import Basic_emotion_type from "../models/basic_emotion_type.js";
import Secondary_emotion_type from "../models/secondary_emotion_type.js";
import { Sequelize } from "sequelize";
import sequelize from "../database/db.js";
import Behavior from "../models/behaviour.js";
import Event from "../models/event.js";
import Emotion from "../models/emotion.js";
import EmoTion_Cognitive from "../models/emotion_cognitive_function.js";
import Cognitive_function from "../models/cognitive_function.js";
import Complex_Cognitive_Function_Type from "../models/complex_cognitive_function_type.js";
import Basic_Cognitive_Function_Type from "../models/basic_cognitive_function_type.js";

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

      if (!question1 || question1.length === 0) {
        return res.status(404).json({
          message:
            "No se encontraron actividades complementarias para fomentar el control inhibitorio.",
        });
      }

      // Sacar la propiedad name de cada uno de los registros y unirlos en una cadena
      const activities = question1
        .map(
          (question) =>
            question[
              "complementary_activity_cognitive_function-complementary_activity"
            ].name
        )
        .join(", ");

      // Mensaje descriptivo con la lista de actividades concatenadas
      const message = `Activities that can be applied to promote inhibitory control: ${activities}`;

      return res.status(200).json({ message });
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

      // Extraer el nombre de cada actividad complementaria
      const question2Name = question2.map(
        (question) =>
          question[
            "complementary_activity_cognitive_function-complementary_activity"
          ].name
      );

      // Construir el mensaje de respuesta
      const message2 = `Key complementary activities for inhibitory control: ${question2Name.join(
        ", "
      )}`;

      return res.status(200).json({ message: message2 });
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
      const message9 = `Mechanics that a serious game must follow to promote perception: ${allMecanicas.join(
        ", "
      )}`;

      return res.status(200).json({ message: message9 });

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
          message: `Cognitive functions in the ${option} are: ${descriptions}`,
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
