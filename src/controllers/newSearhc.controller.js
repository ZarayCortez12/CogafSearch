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
import Psychological_task from "../models/psychological_task.js";
import Psychological_task_cognitive_test from "../models/psychological_task_cognitive_test.js";
import Cognitive_test from "../models/cognitive_test.js";
import Application_type from "../models/application_type.js";
import Characteristic from "../models/characteristic.js";


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

    case 10:
      // obtener la mecanica que se relaciona con la actividad
      function formatResponse(activities) {
        if (activities.length === 0) {
          return "I'm sorry, but no complementary activities were found to strengthen your students' decision-making capacity.";
        }

        let response =
          "As a teacher, you can strengthen your students' decision-making capacity through the following activities: ";

        for (let i = 0; i < activities.length; i++) {
          if (i === activities.length - 1 && activities.length > 1) {
            response += "and ";
          }
          response += activities[i];
          if (i < activities.length - 2) {
            response += ", ";
          } else if (i === activities.length - 2) {
            response += " ";
          }
        }

        response +=
          ". These activities will help your students develop critical skills for decision-making.";

        return response;
      }

      const question10 = await Mechanic_complementary_activity.findAll({
        where: { mechanic_id: 9 },
        include: [
          {
            model: Complementary_activity,
            as: "mechanic_complementary_activity-c",
          },
        ],
      });

      console.log(question10);

      if (!question10) {
        return res.status(404).json({
          message: "No se encontraron registros con los IDs dados.",
        });
      }

      // sacar la propiedad name de cada uno de los registros
      const question10Name = question10.map(
        (question) => question["mechanic_complementary_activity-c"].name
      );

      const formattedResponse = formatResponse(question10Name);

      return res.status(200).json({ formattedResponse });

    case 11:
      const question11 = await Behavior.findOne({
        where: { id: 12 },
      });

      const eventName = await Event.findOne({
        where: { id: question11.event_id },
      });

      if (!question11) {
        return res.status(404).json({
          message: "No se encontraron registros con los IDs dados.",
        });
      }

      // sacar la propiedad name de cada uno de los registros

      const response = `Events that might make a person feel like isolating themselves from others include ${eventName.description}.`;

      return res.status(200).json({ response });

    case 17:
      const question17 = await EmoTion_Cognitive.findAll({
        where: { emotion_id: 3 },
        include: [
          {
            model: Cognitive_function,
            as: "emotion_cognitive_function-cognitive_function",
          },
        ],
      });

      if (!question17 || question17.length === 0) {
        return res.status(404).json({
          message: "No se encontraron registros con los IDs dados.",
        });
      }

      console.log("Esto", question17);

      // Obtener los IDs de las funciones cognitivas
      const cognitiveIds = question17.map(
        (question) =>
          question["emotion_cognitive_function-cognitive_function"].id
      );

      console.log("IDs de funciones cognitivas:", cognitiveIds);

      // Buscar los nombres de las funciones cognitivas en ambos modelos
      const cognitiveNames = await Promise.all(
        cognitiveIds.map(async (id) => {
          const complexFunction = await Complex_Cognitive_Function_Type.findOne(
            {
              where: { id: id },
            }
          );

          if (complexFunction) {
            return complexFunction.description;
          }

          const basicFunction = await Basic_Cognitive_Function_Type.findOne({
            where: { id: id },
          });

          if (basicFunction) {
            return basicFunction.name;
          }

          return { type: "Unknown", name: "Function not found" };
        })
      );

      console.log("Nombres de funciones cognitivas:", cognitiveNames);

      function formatShockResponse(cognitiveNames) {
        if (cognitiveNames.length === 0) {
          return "Based on the available data, we couldn't identify specific cognitive functions associated with shock.";
        }

        let response =
          "The predominant cognitive functions in a person who is in shock are: ";

        cognitiveNames.forEach((name, index) => {
          if (
            index === cognitiveNames.length - 1 &&
            cognitiveNames.length > 1
          ) {
            response += "and ";
          }
          response += name;
          if (index < cognitiveNames.length - 2) {
            response += ", ";
          } else if (index === cognitiveNames.length - 2) {
            response += " ";
          }
        });

        response +=
          ". These cognitive functions are typically affected or altered during a state of shock, which can significantly impact a person's mental processes and responses.";

        return response;
      }

      const formatdResponse = formatShockResponse(cognitiveNames);
      return res.status(200).json({
        formatdResponse,
      });
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
          message: `The cognitive functions of the ${option} are: ${cognitiveTestDescriptions}`,
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
          message: `The psychological tasks of the ${option} are: ${psychologicalTaskNames}`,
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
              message: `The cognitive functions for the emotion ${option} are: ${descriptions}`,
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
              message: `The cognitive functions for the emotion ${option} are: ${descriptions}`,
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
          let characteristicsMessage = `The characteristics and parameters for the emotion '${option}' are: `;

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

      case 8:
        try {
          const query = `
        SELECT ct.name AS cognitive_test_name, ct.description AS cognitive_test_description
        FROM cognitive_test ct
        JOIN psychological_task_cognitive_test ptct ON ct.id = ptct.cognitive_test_id
        JOIN psychological_task pt ON ptct.psychological_task_id = pt.id
        WHERE pt.id = 6
          AND ct.age_rank = '${option}';
      `;

          const results = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT,
          });

          if (!results || results.length === 0) {
            return res.status(404).json({
              message: `No se encontraron tests cognitivos para medir y evaluar la inteligencia de una persona y rango de edad '${option}'.`,
            });
          }

          // Construir la respuesta deseada
          let testsMessage = `Cognitive tests to measure and evaluate a person's intelligence within the age range '${option}' are: `;

          results.forEach((result) => {
            testsMessage += `${result.cognitive_test_name}: ${result.cognitive_test_description}`;
          });

          return res.status(200).json({
            message: testsMessage,
          });
        } catch (error) {
          console.error("Error al ejecutar la consulta:", error);
          return res.status(500).json({
            message:
              "Error al obtener tests cognitivos para la tarea psicológica y rango de edad especificados.",
          });
        }

      case 12:
        try {
          // Encuentra la tarea psicológica según el nombre
          const task = await Psychological_task.findOne({
            where: { name: option },
          });

          if (!task) {
            throw new Error("Psychological task not found");
          }

          console.log("Task found:", task);
          // Encuentra las relaciones de tarea psicológica y test cognitivo
          const taskTests = await Psychological_task_cognitive_test.findAll({
            where: { psychological_task_id: task.id },
            include: [
              {
                model: Cognitive_test,
                as: "psychological_task_cognitive_test-c",
                attributes: ["name"],
              },
            ],
          });
          console.log("Task tests:", taskTests);
          // Extrae y retorna los nombres de los tests cognitivos
          const testNames = taskTests.map(
            (tt) => tt["psychological_task_cognitive_test-c"].name
          );
          console.log("Test names:", testNames.length);

          // Construye el mensaje en inglés
          let responseMessage;
          if (testNames.length > 0) {
            const lastTestName = testNames.pop();
            const testNamesString =
              testNames.length > 0
                ? testNames.join(", ") + " and " + lastTestName
                : lastTestName;
            responseMessage = `To evaluate the ${option} in a person, you can use the following cognitive tests ${testNamesString}.`;
          } else {
            responseMessage = `There are no cognitive tests available to evaluate the ${option} in a person.`;
          }

          return res.status(200).json({
            message: responseMessage,
          });
        } catch (error) {
          console.error("Error fetching cognitive tests by task name:", error);
          return res.status(500).json({
            message: "Server error.",
          });
        }

      case 13:
        try {
          // Encuentra el test cognitivo según el nombre
          const test = await Cognitive_test.findOne({
            where: { name: option },
            include: [
              {
                model: Application_type,
                as: "congnitive-test_application-type",
                attributes: ["description"],
              },
            ],
          });

          if (!test) {
            throw new Error("Cognitive test not found");
          }

          console.log("Test found:", test);

          // Obtén la descripción del tipo de aplicación
          const applicationMethod =
            test["congnitive-test_application-type"].description;

          console.log("Application method:", applicationMethod);
          // Construye el mensaje en inglés
          const responseMessage = applicationMethod
            ? `The application method of the ${option} is ${applicationMethod}.`
            : `No application method found for the ${option}.`;

          return res.status(200).json({
            message: responseMessage,
          });
        } catch (error) {
          console.error(
            "Error fetching application method by test name:",
            error
          );
          throw error;
        }


      case 14:
        try {
          // Encuentra la actividad complementaria según el nombre
          const activity = await Complementary_activity.findOne({
            where: { name: option },
          });
      
          if (!activity) {
            throw new Error('Complementary activity not found');
          }
          
          console.log('Activity found:', activity);
          // Encuentra las relaciones de actividad complementaria y mecánicas
          const activityMechanics = await Mechanic_complementary_activity.findAll({
            where: { complementary_activity_id: activity.id },
            include: [
              {
                model: Mechanic,
                as: 'mechanic_complementary_activity-m',
                attributes: ['name']
              }
            ]
          });
          console.log('Activity mechanics:', activityMechanics);
          // Extrae y retorna los nombres de las mecánicas
          const mechanicNames = activityMechanics.map(am => am['mechanic_complementary_activity-m'].name);
          console.log('Mechanic names:', mechanicNames);
      
          // Construye el mensaje en inglés
          let responseMessage;
          if (mechanicNames.length > 0) {
            const lastMechanicName = mechanicNames.pop();
            const mechanicNamesString = mechanicNames.length > 0 
              ? mechanicNames.join(', ') + ' and ' + lastMechanicName 
              : lastMechanicName;
            responseMessage = `The mechanics corresponding to the ${option} are: ${mechanicNamesString}.`;
          } else {
            responseMessage = `There are no mechanics corresponding to the ${option}.`;
          }
          return res.status(200).json({
            message: responseMessage,
          });
        
          
        } catch (error) {
          console.error('Error fetching mechanics by activity name:', error);
          throw error;
        }


      case 15:
        try {
          // Encuentra la característica según el nombre
          const characteristic = await Characteristic.findOne({
            where: { name: option },
          });
      
          if (!characteristic) {
            throw new Error('Characteristic not found');
          }
          
          console.log('Characteristic found:', characteristic);
          // Encuentra los comportamientos relacionados con la característica
          const behaviours = await Behavior.findAll({
            where: { characteristic_id: characteristic.id },
            attributes: ['description']
          });
          console.log('Behaviours found:', behaviours);
          // Extrae y retorna las descripciones de los comportamientos
          const behaviourDescriptions = behaviours.map(b => b.description);
          console.log('Behaviour descriptions:', behaviourDescriptions);
      
          // Construye el mensaje en inglés
          let responseMessage;
          if (behaviourDescriptions.length > 0) {
            const lastBehaviourDescription = behaviourDescriptions.pop();
            const behaviourDescriptionsString = behaviourDescriptions.length > 0 
              ? behaviourDescriptions.join(', ') + ' and ' + lastBehaviourDescription 
              : lastBehaviourDescription;
            responseMessage = `The behavior(s) that could be due to the ${option} are: ${behaviourDescriptionsString}.`;
          } else {
            responseMessage = `There are no behaviors found for the ${option}.`;
          }
      
          return res.status(200).json({
            message: responseMessage,
          });
      
        } catch (error) {
          console.error('Error fetching behaviors by characteristic name:', error);
          throw error;
        }

      case 16:
        try {
          // Encuentra la característica según el nombre
          const characteristic = await Characteristic.findOne({
            where: { name: option },
          });
      
          if (!characteristic) {
            throw new Error('Characteristic not found');
          }
          
          console.log('Characteristic found:', characteristic);
          // Encuentra los comportamientos relacionados con la característica
          const behaviours = await Behavior.findAll({
            where: { characteristic_id: characteristic.id },
            attributes: ['event_id']
          });
          console.log('Behaviours found:', behaviours);
          // Extrae y retorna los IDs de los eventos
          const eventIds = behaviours.map(b => b.event_id);
          console.log('Event IDs:', eventIds);
      
          // Encuentra los nombres de los eventos según los IDs
          const events = await Event.findAll({
            where: { id: eventIds },
            attributes: ['description']
          });
          console.log('Events found:', events);
          const eventNames = events.map(e => e.description);
          console.log('Event names:', eventNames);
      
          // Construye el mensaje en inglés
          let responseMessage;
          if (eventNames.length > 0) {
            const lastEventName = eventNames.pop();
            const eventNamesString = eventNames.length > 0 
              ? eventNames.join(', ') + ' and ' + lastEventName 
              : lastEventName;
            responseMessage = `The events that could lead to the ${option} are: ${eventNamesString}.`;
          } else {
            responseMessage = `There are no events found that could lead to the ${option}.`;
          }
      
          return res.status(200).json({
            message: responseMessage,
          });
      
        } catch (error) {
          console.error('Error fetching events by characteristic name:', error);
          throw error;
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
