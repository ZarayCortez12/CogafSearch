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
import State from "../models/state.js";
import Parameter from "../models/parameter.js";
import Question from "../models/question.js";

export const question = async (req, res) => {
  try {
    const question = await Question.findAll();
    if (!question) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }
    res.status(200).json({ question });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchOne = async (req, res) => {
  try {
    const caracteristica = await Characteristic.findOne({
      where: { name: "Promotion of equity" },
    });

    if (!caracteristica) {
      return res.status(404).json({
        message: "No se encontró ninguna característica con el nombre dado.",
      });
    }

    const caracteristicaId = caracteristica.id;

    const comportamientos = await Behaviour.findAll({
      where: { characteristic_id: caracteristicaId },
      attributes: ["description"],
    });

    if (!comportamientos || comportamientos.length === 0) {
      return res.status(404).json({
        message:
          "No se encontraron comportamientos asociados con la promoción de equidad.",
      });
    }

    let mensaje = "Behaviors associated with promoting equity include";

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
    const testId = 33;
    const test = await CognitiveTest.findOne({
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

    const testDescription = test.description;

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

    const tareas = relaciones.map(
      (relacion) => relacion["psychological_task_cognitive_test-t"].name
    );

    let mensaje = `The Wisconsin Card Sorting Test ${testDescription} and It applies the following tasks: `;
    if (tareas.length > 1) {
      mensaje += tareas.slice(0, -1).join(", ");
      mensaje += ` and ${tareas.slice(-1)[0]}`;
    } else {
      mensaje += tareas[0];
    }

    mensaje += ".";

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

    let mensaje = "The emotions perceived as positive in terms of valence are ";
    mensaje += emotionDescriptions.slice(0, -1).join(", ");
    if (emotionDescriptions.length > 1) {
      mensaje += " and " + emotionDescriptions[emotionDescriptions.length - 1];
    } else {
      mensaje += emotionDescriptions[0];
    }
    mensaje += ".";

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchFive = async (req, res) => {
  try {
    const registro = await SecondaryEmotionType.findOne({
      where: { description: "Nostalgia" },
    });

    if (!registro) {
      return res.status(404).json({
        message: "No se encontró ningún registro con la descripción dada.",
      });
    }

    const registroAux = await SecondaryEmotion.findOne({
      where: { secondary_emotion_type_id: registro.id },
    });

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

    const nombresCaracteristicas = caracteristicas.map(
      (c) => c["emotion_characteristic-c"].name
    );

    let mensaje;
    if (nombresCaracteristicas.length > 1) {
      const lastCharacteristic = nombresCaracteristicas.pop();
      const joinedCharacteristics = nombresCaracteristicas.join(", ");
      mensaje = `The emotion of nostalgia has these following characteristics: ${joinedCharacteristics} and ${lastCharacteristic}`;
    } else {
      mensaje = `The emotion of nostalgia has these following characteristics: ${nombresCaracteristicas[0]}`;
    }

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchSix = async (req, res) => {
  try {
    const allTests = await CognitiveTest.findAll();

    const validTests = allTests.filter((test) => {
      if (!test.age_rank) return false;

      const ageRange = test.age_rank.split(" - ");
      if (ageRange.length !== 2) return false;

      const minAge = parseInt(ageRange[0]);
      const maxAge = parseInt(ageRange[1].split(" ")[0]);

      return minAge <= 10 && maxAge >= 5;
    });

    if (validTests.length === 0) {
      return res.status(404).json({
        message:
          "No cognitive tests found for children between 5 and 10 years old.",
      });
    }

    const testNames = validTests.map((test) => test.name);

    let mensaje =
      "The tests that can be applied to children between 5 and 10 years old are ";
    if (testNames.length === 1) {
      mensaje += testNames[0] + ".";
    } else {
      const lastTest = testNames.pop();
      mensaje += testNames.join(", ") + " and " + lastTest + ".";
    }

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchSeven = async (req, res) => {
  try {
    const characteristicId = 5;

    const parametros = await Parameter.findAll({
      where: { characteristic_id: characteristicId },
      include: [
        {
          model: Characteristic,
          as: "parameter-characteristic",
          attributes: ["name"],
        },
      ],
    });

    if (parametros.length === 0) {
      return res.status(404).json({
        message: "No se encontraron parámetros para la característica dada.",
      });
    }

    const parametrosFormatted = parametros.map(
      (parametro) =>
        `${parametro["parameter-characteristic"].name}: ${parametro.value}`
    );

    let mensaje;
    if (parametrosFormatted.length > 1) {
      const lastParameter = parametrosFormatted.pop();
      const joinedParameters = parametrosFormatted.join(", ");
      mensaje = `The parameters under which the feeling that one has control over everything is evaluated are ${joinedParameters}, and ${lastParameter}`;
    } else {
      mensaje = `The parameters under which the feeling that one has control over everything is evaluated are ${parametrosFormatted[0]}`;
    }

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchEigth = async (req, res) => {
  try {
    const registro = await BasicEmotionType.findOne({
      where: { description: "Happiness" },
    });

    if (!registro) {
      return res.status(404).json({
        message: "No se encontró ningún registro con la descripción dada.",
      });
    }

    const registroAux = await BasicEmotion.findOne({
      where: { basic_emotion_type_id: registro.id },
    });

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

    const nombresCaracteristicas = caracteristicas.map(
      (c) => c["emotion_characteristic-c"].name
    );

    let mensaje;
    if (nombresCaracteristicas.length > 1) {
      const lastCharacteristic = nombresCaracteristicas.pop();
      const joinedCharacteristics = nombresCaracteristicas.join(", ");
      mensaje = `The emotion of Happiness has these following characteristics ${joinedCharacteristics} and ${lastCharacteristic}`;
    } else {
      mensaje = `The emotion of Happiness has these following characteristics ${nombresCaracteristicas[0]}`;
    }

    res.status(200).json({ mensaje });
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
    const registroAux = await BasicEmotion.findOne({
      where: { basic_emotion_type_id: registro.id },
    });

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

    const nombresCaracteristicas = caracteristicas.map(
      (c) => c["emotion_characteristic-c"].name
    );

    let mensaje = "The characteristics to know that a person is sad are ";
    if (nombresCaracteristicas.length === 1) {
      mensaje += nombresCaracteristicas[0];
    } else {
      mensaje += nombresCaracteristicas.slice(0, -1).join(", ");
      mensaje += " and " + nombresCaracteristicas.slice(-1)[0];
    }

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
            attributes: ["name"],
          },
        ],
      });

      mecanicas.forEach((mecanica) => {
        mecanicasSet.add(mecanica["mechanic_complementary_activity-m"].name);
      });
    }

    const nombresMecanicas = Array.from(mecanicasSet);

    let mensaje = "The mechanics to promote attention in a serious game are ";
    if (nombresMecanicas.length === 1) {
      mensaje += nombresMecanicas[0];
    } else {
      mensaje += nombresMecanicas.slice(0, -1).join(", ");
      mensaje += " and " + nombresMecanicas.slice(-1)[0];
    }

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
      const mensaje = `Implementing ${registro["mechanic_complementary_activity-c"].name} sessions in your work can provide numerous benefits, including ${registro["mechanic_complementary_activity-m"].name}. Meditation has been shown to promote relaxation and mental clarity, leading to a more positive work environment and better overall job satisfaction. Additionally, regular meditation practice can help employees manage work-related pressures more effectively, leading to decreased absenteeism and turnover rates. Overall, integrating ${registro["mechanic_complementary_activity-c"].name} into your workplace wellness program can contribute to a happier, healthier, and more productive workforce.`;

      res.status(200).json({ mensaje });
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
      const actividades = [];
      for (const actividad of registro) {
        actividades.push(actividad["mechanic_complementary_activity-c"].name);
      }
      const mensaje = `As a teacher, you can strengthen your students' decision-making skills by incorporating activities such as ${actividades.join(
        ", "
      )}. These activities have been shown to enhance decision-making abilities by encouraging students to engage in critical thinking and problem-solving. By providing opportunities for students to practice making decisions in various contexts, you can help them develop confidence in their abilities and become more effective decision-makers.`;
      console.log(mensaje);
      res.status(200).json({ mensaje });
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

    const feelings = registroTwo.map((r) => r.description).join(", ");
    const reason = `Due to feelings of ${registroOne.description}, ${feelings}`;

    const mensaje = `The desire to isolate oneself from others occurs ${reason}. This combination of emotions, including ${feelings}, can lead individuals to seek solitude as a means of coping with or avoiding overwhelming emotions. Understanding and addressing these underlying feelings is essential in promoting emotional well-being and fostering healthy social connections.`;

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

    if (!registro || registro.length === 0) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }

    const tests = registro.map(
      (test) => test["psychological_task_cognitive_test-c"].name
    );
    const mensaje = `The following tests can be applied to evaluate intellectual performance ${tests.join(
      ", "
    )}. These tests are designed to assess various cognitive abilities, including memory, attention, problem-solving, and reasoning skills, providing valuable insights into an individual's cognitive functioning.`;

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

    if (!registro || registro.length === 0) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }

    const tests = registro.map(
      (test) => test["psychological_task_cognitive_test-c"].name
    );
    const mensaje = `A person's memory can be evaluated through various cognitive tests, including: ${tests.join(
      ", "
    )}. These tests are designed to assess different aspects of memory, such as short-term memory, long-term memory, and working memory. They often involve tasks like recalling information, recognizing patterns, and memorizing sequences, providing insights into an individual's memory abilities.`;

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchSixteen = async (req, res) => {
  try {
    const registro = await PsychologicalTaskCognitiveTest.findAll({
      where: {
        psychological_task_id: 16,
      },
      include: [
        {
          model: CognitiveTest,
          as: "psychological_task_cognitive_test-c",
        },
      ],
    });

    if (!registro || registro.length === 0) {
      return res.status(404).json({
        message: "No se encontraron registros con los IDs dados.",
      });
    }

    const tests = registro.map(
      (test) => test["psychological_task_cognitive_test-c"].name
    );
    const mensaje = `A person's attention span and concentration can be evaluated through various cognitive tests, including ${tests.join(
      ", "
    )}. These tests are designed to measure the individual's ability to focus on tasks, sustain attention over time, and resist distractions. They often involve tasks like reaction time tests, attentional blink tests, and sustained attention tasks, providing insights into the person's attentional capabilities.`;

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

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

    const applicationTypeDescription =
      registro["congnitive-test_application-type"].description;
    const mensaje = `Lateral Thinking Exercises primarily engage cognitive functions such as ${applicationTypeDescription}. These exercises encourage individuals to think outside the box, explore unconventional solutions, and challenge established patterns of thought, thereby enhancing their ability to approach problems from different perspectives.`;

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

    const mechanics = registro.map(
      (mechanic) => mechanic["mechanic_complementary_activity-m"].name
    );
    const mensaje = `The Stroop test is applied using mechanics such as ${mechanics.join(
      ", "
    )}. This test assesses cognitive processing speed and selective attention by measuring the interference in reaction time when the brain is presented with conflicting information regarding color and word meaning.`;

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

    if (!registro || registro.length === 0) {
      return res.status(404).json({
        message: "No records found with the given IDs.",
      });
    }

    const ids = registro.map(
      (id) =>
        id["complementary_activity_cognitive_function-cognitive_function"].id
    );

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
        message: "No records found with the given IDs.",
      });
    }

    const basicDescription =
      basic["b-cognitive-function_b-cognitive-function-type"].description;
    const complexDescription =
      complex["complex_cognitive_function-Complex_cognitive_function_type"]
        .description;

    const mensaje = `The mechanics of a puzzle game are ${basicDescription} and ${complexDescription}`;

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const searchTwenty = async (req, res) => {
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
        message: "No records found with the given IDs.",
      });
    }

    const characteristicName = registro["behaviour_characteristic"].name;

    const mensaje = `The state of constant alert and vigilance in the face of possible dangers is characterized by ${characteristicName}`;

    res.status(200).json({ mensaje });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
