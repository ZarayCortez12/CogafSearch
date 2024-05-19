import BasicEmotionType from "../models/basic_emotion_type.js";
import BasicEmotion from "../models/basic_emotion.js";
import SecondaryEmotion from "../models/secondary_emotion.js";
import SecondaryEmotionType from "../models/secondary_emotion_type.js";
import Emotion from "../models/emotion.js";
import EmotionCharacterist from "../models/emotions_characteristic.js";
import Characteristic from "../models/characteristic.js";
import Complementary_activity_cognitive_function from "../models/complementary_activity_cognitive_function.js";
import { where } from "sequelize";
import Sequelize from "sequelize";
import Cognitive_function from "../models/cognitive_function.js";
import Complementary_activity from "../models/complementary_activity.js";
import Basic_cognitive_function from "../models/basic_cognitive_function.js";
import Basic_cognitive_function_type from "../models/basic_cognitive_function_type.js";
import Complex_cognitive_function from "../models/complex_cognitive_function.js";
import Complex_cognitive_function_type from "../models/complex_cognitive_function_type.js";
import Mechanic from "../models/mechanic.js";
import Mechanic_complementary_activity from "../models/mechanic_complementary_activity.js";
import Behaviour from "../models/behaviour.js";
import Capability from "../models/capability.js";
import Capability_cognitive_function from "../models/capability_cognitive_function.js";
import PsychologicalTask from "../models/psychological_task.js";
import CognitiveTest from "../models/cognitive_test.js";
import Application_type from "../models/application_type.js";
import PsychologicalTaskCognitiveTest from "../models/psychological_task_cognitive_test.js";
import Cognitive_test from "../models/cognitive_test.js";
import State from "../models/state.js";

export const searchOne = async (req, res) => {
  try {
    // Buscar la característica con el nombre "Promotion of equity"
    const caracteristica = await Characteristic.findOne({
      where: { name: "Promotion of equity" },
    });

    if (!caracteristica) {
      return res.status(404).json({
        message: "No se encontró ninguna característica con el nombre dado.",
      });
    }

    // Obtener el ID de la característica encontrada
    const caracteristicaId = caracteristica.id;

    // Buscar los comportamientos asociados con la característica
    const comportamientos = await Behaviour.findAll({
      where: { characteristic_id: caracteristicaId },
      attributes: ["description"], // Seleccionar solo la descripción del comportamiento
    });

    if (!comportamientos || comportamientos.length === 0) {
      return res.status(404).json({
        message:
          "No se encontraron comportamientos asociados con la promoción de equidad.",
      });
    }

    // Construir el mensaje con las descripciones de los comportamientos
    let mensaje = "Behaviors associated with promoting equity include";

    // Iterar sobre los comportamientos y agregar sus descripciones al mensaje
    comportamientos.forEach((comportamiento, index) => {
      if (index === 0) {
        mensaje += ` ${comportamiento.description}`;
      } else if (index === comportamientos.length - 1) {
        mensaje += ` and ${comportamiento.description}`;
      } else {
        mensaje += `, ${comportamiento.description}`;
      }
    });

    mensaje += ".";

    // Enviar el mensaje como respuesta
    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchTwo = async (req, res) => {
  try {
    const habilidad = await Capability.findOne({
      where: { name: "Ability to communicate effectively" },
    });

    if (!habilidad) {
      return res.status(404).json({
        message: "No se encontró ninguna habilidad con el nombre dado.",
      });
    }

    const habilidadId = habilidad.id;

    const relaciones = await Capability_cognitive_function.findAll({
      where: { capability_id: habilidadId },
    });

    if (!relaciones || relaciones.length === 0) {
      return res.status(404).json({
        message:
          "No se encontraron funciones cognitivas asociadas con la habilidad para comunicarse efectivamente.",
      });
    }

    const idsFuncionesCognitivas = relaciones.map(
      (relacion) => relacion.cognitive_function_id
    );

    const nombresFuncionesCognitivas = [];
    for (const idFuncion of idsFuncionesCognitivas) {
      let funcion = await Complex_cognitive_function.findOne({
        where: { id: idFuncion },
      });

      if (!funcion) {
        funcion = await Basic_cognitive_function.findOne({
          where: { id: idFuncion },
        });
      }

      if (funcion) {
        let nombreFuncion;
        if (funcion instanceof Complex_cognitive_function) {
          const tipoFuncion = await Complex_cognitive_function_type.findOne({
            where: { id: funcion.complex_cognitive_function_type_id },
          });
          nombreFuncion = tipoFuncion ? tipoFuncion.description : "";
        } else if (funcion instanceof Basic_cognitive_function) {
          const tipoFuncion = await Basic_cognitive_function_type.findOne({
            where: { id: funcion.basic_cognitive_function_type_id },
          });
          nombreFuncion = tipoFuncion ? tipoFuncion.description : "";
        }

        if (nombreFuncion) {
          nombresFuncionesCognitivas.push(nombreFuncion);
        }
      }
    }

    let mensaje =
      "The cognitive functions that are present in the ability to communicate effectively are ";
    if (nombresFuncionesCognitivas.length > 1) {
      mensaje += nombresFuncionesCognitivas.slice(0, -1).join(", ");
      mensaje += ` and ${nombresFuncionesCognitivas.slice(-1)[0]}`;
    } else {
      mensaje += nombresFuncionesCognitivas[0];
    }

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchThree = async (req, res) => {
  try {
    // Buscar el test "Wisconsin Card Sorting Test" por su ID
    const testId = 33;
    const test = await Cognitive_test.findOne({
      where: { id: testId },
      include: [
        {
          model: Application_type,
          as: "congnitive-test_application-type",
          attributes: ["description"],
        },
      ],
    });

    if (!test) {
      return res.status(404).json({
        message: "No se encontró ningún test cognitivo con el ID dado.",
      });
    }

    // Obtener la descripción del test
    const testDescription = test.description;

    // Buscar las tareas psicológicas relacionadas con el test
    const relaciones = await PsychologicalTaskCognitiveTest.findAll({
      where: { cognitive_test_id: testId },
      include: [
        {
          model: PsychologicalTask,
          as: "psychological_task_cognitive_test-t",
        },
      ],
    });

    if (!relaciones || relaciones.length === 0) {
      return res.status(404).json({
        message: "No se encontraron tareas psicológicas asociadas con el test.",
      });
    }

    // Obtener los nombres de las tareas psicológicas
    const tareas = relaciones.map(
      (relacion) => relacion["psychological_task_cognitive_test-t"].name
    );

    // Construir el mensaje con la descripción del test y las tareas psicológicas
    let mensaje = `The Wisconsin Card Sorting Test ${testDescription} and It applies the following tasks: `;
    if (tareas.length > 1) {
      mensaje += tareas.slice(0, -1).join(", ");
      mensaje += ` and ${tareas.slice(-1)[0]}`;
    } else {
      mensaje += tareas[0];
    }

    mensaje += ".";

    // Enviar el mensaje como respuesta
    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchFour = async (req, res) => {
  try {
    const positiveStates = await State.findAll({
      where: { valence: { [Sequelize.Op.gt]: 0 } },
    });

    if (!positiveStates.length) {
      return res
        .status(404)
        .json({ message: "No positive valence states found." });
    }

    const positiveStateIds = positiveStates.map((state) => state.id);

    const emotions = await Emotion.findAll({
      where: { state_id: positiveStateIds },
    });

    if (!emotions.length) {
      return res
        .status(404)
        .json({ message: "No emotions found for positive valence states." });
    }

    const emotionIds = emotions.map((emotion) => emotion.id);

    const basicEmotions = await BasicEmotion.findAll({
      where: { id: emotionIds },
      include: [
        {
          model: BasicEmotionType,
          as: "b-emotion_b-emotion-type",
          attributes: ["description"],
        },
      ],
    });

    const secondaryEmotions = await SecondaryEmotion.findAll({
      where: { id: emotionIds },
      include: [
        {
          model: SecondaryEmotionType,
          as: "s-emotion_s-emotion-type",
          attributes: ["description"],
        },
      ],
    });

    const emotionDescriptions = [
      ...basicEmotions.map((be) => be["b-emotion_b-emotion-type"].description),
      ...secondaryEmotions.map(
        (se) => se["s-emotion_s-emotion-type"].description
      ),
    ];

    if (!emotionDescriptions.length) {
      return res
        .status(404)
        .json({ message: "No positive valence emotion descriptions found." });
    }

    let responseMessage =
      "The emotions perceived as positive in terms of valence are ";
    responseMessage += emotionDescriptions.slice(0, -1).join(", ");
    if (emotionDescriptions.length > 1) {
      responseMessage +=
        " and " + emotionDescriptions[emotionDescriptions.length - 1];
    } else {
      responseMessage += emotionDescriptions[0];
    }
    responseMessage += ".";

    res.status(200).json({ message: responseMessage });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchNine = async (req, res) => {
  try {
    const registro = await BasicEmotionType.findOne({
      where: { description: "sadness" },
    });

    if (!registro) {
      return res.status(404).json({
        message: "No se encontró ningún registro con la descripción dada.",
      });
    }
    const registroAux = await BasicEmotion.findByPk(registro.id);
    if (!registroAux) {
      return res.status(404).json({
        message:
          "No se encontró ningún registro en BasicEmotion con el ID dado.",
      });
    }
    const emotion = await Emotion.findOne({ where: { id: registroAux.id } });

    if (!emotion) {
      return res
        .status(404)
        .json({ message: "No se encontró ninguna emoción con el ID dado." });
    }

    const caracteristicas = await EmotionCharacterist.findAll({
      where: { emotion_id: emotion.id },
      include: [
        {
          model: Characteristic,
          as: "emotion_characteristic-c",
        },
      ],
    });

    if (caracteristicas.length === 0) {
      return res.status(404).json({
        message: "No se encontraron características para esta emoción.",
      });
    }

    const nombresCaracteristicas = caracteristicas
      .map((c) => c["emotion_characteristic-c"].name)
      .join(", ");
    const mensaje = `The characteristics to know that a person is sad are: ${nombresCaracteristicas}`;

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchTen = async (req, res) => {
  try {
    const registro = await Basic_cognitive_function_type.findOne({
      where: { description: "Attention" },
    });

    if (!registro) {
      return res.status(404).json({
        message: "No se encontró ningún registro con la descripción dada.",
      });
    }

    const registroAux = await Basic_cognitive_function_type.findByPk(
      registro.id
    );
    const cognitive_funtion = await Cognitive_function.findOne({
      where: { id: registroAux.id },
    });

    const actividades = await Complementary_activity_cognitive_function.findAll(
      {
        where: { Cognitive_function_id: cognitive_funtion.id },
        include: [
          {
            model: Complementary_activity,
            as: "complementary_activity_cognitive_function-complementary_activity",
            attributes: ["id"], // Solo obtenemos el ID de las actividades complementarias
          },
        ],
        attributes: ["complementary_activity_id"],
      }
    );

    if (actividades.length === 0) {
      return res.status(404).json({
        message: "No se encontraron características para esta emoción.",
      });
    }

    const mecanicasSet = new Set();

    for (const actividad of actividades) {
      const mecanicas = await Mechanic_complementary_activity.findAll({
        where: {
          complementary_activity_id: actividad.complementary_activity_id,
        },
        include: [
          {
            model: Mechanic,
            as: "mechanic_complementary_activity-m",
            attributes: ["name"], // Solo obtenemos el nombre de las mecánicas
          },
        ],
      });

      mecanicas.forEach((mecanica) => {
        mecanicasSet.add(mecanica["mechanic_complementary_activity-m"].name);
      });
    }

    const nombresMecanicas = Array.from(mecanicasSet).join(", ");
    const mensaje = `The mechanics to promote attention in a serious game are: ${nombresMecanicas}`;
    console.log(mensaje);

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchEleven = async (req, res) => {
  try {
    const registro = await Mechanic_complementary_activity.findOne({
      where: {
        complementary_activity_id: 2,
        mechanic_id: 3,
      },
      include: [
        {
          model: Mechanic,
          as: "mechanic_complementary_activity-m",
        },
        {
          model: Complementary_activity,
          as: "mechanic_complementary_activity-c",
        },
      ],
    });
    if (registro) {
      const mensaje = `The ${registro["mechanic_complementary_activity-c"].name} allows the development of ${registro["mechanic_complementary_activity-m"].name}`;
      console.log(mensaje);
      res.status(200).json(mensaje);
    } else {
      res.status(404).json({ message: "Registro no encontrado" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchTwelve = async (req, res) => {
  try {
    const registro = await Mechanic_complementary_activity.findAll({
      where: {
        mechanic_id: 9,
      },
      include: [
        {
          model: Complementary_activity,
          as: "mechanic_complementary_activity-c",
        },
      ],
    });
    if (registro) {
      //ciclo para obtener los nombres de las actividades y concatenarlos en un mensaje
      const actividades = [];
      for (const actividad of registro) {
        actividades.push(actividad["mechanic_complementary_activity-c"].name);
      }
      const mensaje = `${actividades.join(", ")}`;
      res.status(200).json(mensaje);
    } else {
      res.status(404).json({ message: "Registro no encontrado" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchThirteen = async (req, res) => {
  try {
    const registroOne = await SecondaryEmotionType.findOne({
      where: { id: 3 },
    });
    const registroTwo = await BasicEmotionType.findAll({
      where: { id: { [Sequelize.Op.in]: [4, 6] } },
    });
    if (!registroOne || !registroTwo) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }

    const mensaje = `Due to feelings of ${
      registroOne.description
    }, ${registroTwo.map((r) => r.description).join(", ")}`;

    res.status(200).json({ mensaje: "Registros encontrados", mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchFourteen = async (req, res) => {
  try {
    const registro = await PsychologicalTaskCognitiveTest.findAll({
      where: {
        psychological_task_id: 6,
      },
      include: [
        {
          model: CognitiveTest,
          as: "psychological_task_cognitive_test-c",
        },
      ],
    });

    if (!registro) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }
    //ciclo para obtener los nombres de los tests y concatenarlos en un mensaje
    const tests = [];
    for (const test of registro) {
      tests.push(test["psychological_task_cognitive_test-c"].name);
    }
    const mensaje = tests.join(", ");
    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchFifteen = async (req, res) => {
  try {
    const registro = await PsychologicalTaskCognitiveTest.findAll({
      where: {
        psychological_task_id: 9,
      },
      include: [
        {
          model: CognitiveTest,
          as: "psychological_task_cognitive_test-c",
        },
      ],
    });

    if (!registro) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }
    //ciclo para obtener los nombres de los tests y concatenarlos en un mensaje
    const tests = [];
    for (const test of registro) {
      tests.push(test["psychological_task_cognitive_test-c"].name);
    }
    const mensaje = tests.join(", ");
    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchSixteen = async (req, res) => {};

export const searchSeventeen = async (req, res) => {
  try {
    const registro = await CognitiveTest.findOne({
      where: {
        id: 3,
      },
      include: [
        {
          model: Application_type,
          as: "congnitive-test_application-type",
        },
      ],
    });

    if (!registro) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }

    const mensaje = registro["congnitive-test_application-type"].description;

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchEighteen = async (req, res) => {
  try {
    const registro = await Mechanic_complementary_activity.findAll({
      where: {
        complementary_activity_id: 3,
      },
      include: [
        {
          model: Mechanic,
          as: "mechanic_complementary_activity-m",
        },
      ],
    });

    if (!registro) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }

    const mechanics = [];
    for (const mechanic of registro) {
      mechanics.push(mechanic["mechanic_complementary_activity-m"].name);
    }
    const mensaje = mechanics.join(", ");
    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchNineteen = async (req, res) => {
  try {
    const registro = await Complementary_activity_cognitive_function.findAll({
      where: {
        complementary_activity_id: 9,
      },
      include: [
        {
          model: Cognitive_function,
          as: "complementary_activity_cognitive_function-cognitive_function",
        },
      ],
    });

    if (!registro) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }
    const ids = [];
    for (const id of registro) {
      ids.push(
        id["complementary_activity_cognitive_function-cognitive_function"].id
      );
    }

    const basic = await Basic_cognitive_function.findOne({
      where: { id: ids[0] },
      include: [
        {
          model: Basic_cognitive_function_type,
          as: "b-cognitive-function_b-cognitive-function-type",
        },
      ],
    });
    const complex = await Complex_cognitive_function.findOne({
      where: { id: ids[1] },
      include: [
        {
          model: Complex_cognitive_function_type,
          as: "complex_cognitive_function-Complex_cognitive_function_type",
        },
      ],
    });

    if (!basic || !complex) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }

    const mensaje = `${basic["b-cognitive-function_b-cognitive-function-type"].description}, ${complex["complex_cognitive_function-Complex_cognitive_function_type"].description}`;

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchTewenty = async (req, res) => {
  try {
    const registro = await Behaviour.findOne({
      where: {
        id: 4,
      },
      include: [
        {
          model: Characteristic,
          as: "behaviour_characteristic",
        },
      ],
    });

    if (!registro) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }
    const mensaje = registro["behaviour_characteristic"].name;
    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
