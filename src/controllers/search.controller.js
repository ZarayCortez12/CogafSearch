import BasicEmotionType from "../models/basic_emotion_type.js";
import BasicEmotion from "../models/basic_emotion.js";
import Emotion from "../models/emotion.js";
import EmotionCharacterist from "../models/emotions_characteristic.js";
import Characteristic from "../models/characteristic.js";
import BasicCognitiveFuntionType from "../models/basic_cognitive_fuction_type.js";
import BasicCognitiveFuntion from "../models/basic_cognitive_fuction.js";
import Complementary_activity_cognitive_function from "../models/complementary_activity_cognitive_function.js";
import { where } from "sequelize";
import Cognitive_function from "../models/cognitive_function.js";
import Complementary_activity from "../models/complementary_activity.js";
import Mechanic from "../models/mechanic.js";
import Mechanic_complementary_activity from "../models/mechanic_complementary_activity.js";
import Behaviour from "../models/behaviour.js";

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
            attributes: ['description'], // Seleccionar solo la descripción del comportamiento
        });

        if (!comportamientos || comportamientos.length === 0) {
            return res.status(404).json({
                message: "No se encontraron comportamientos asociados con la promoción de equidad.",
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
        const registro = await BasicCognitiveFuntionType.findOne({
            where: { description: "Attention" },
        });

        if (!registro) {
            return res.status(404).json({
                message: "No se encontró ningún registro con la descripción dada.",
            });
        }

        const registroAux = await BasicCognitiveFuntion.findByPk(registro.id);
        const cognitive_funtion = await Cognitive_function.findOne({ where: { id: registroAux.id } });

        const actividades = await Complementary_activity_cognitive_function.findAll({
            where: { Cognitive_function_id: cognitive_funtion.id },
            include: [
                {
                    model: Complementary_activity,
                    as: "complementary_activity_cognitive_function-complementary_activity",
                    attributes: ['id'],  // Solo obtenemos el ID de las actividades complementarias
                },
            ],
            attributes: ['complementary_activity_id'],
        });

        if (actividades.length === 0) {
            return res.status(404).json({
                message: "No se encontraron características para esta emoción.",
            });
        }

        const mecanicasSet = new Set();
        
        for (const actividad of actividades) {
            const mecanicas = await Mechanic_complementary_activity.findAll({
                where: { complementary_activity_id: actividad.complementary_activity_id },
                include: [
                    {
                        model: Mechanic,
                        as: "mechanic_complementary_activity-m",
                        attributes: ['name'],  // Solo obtenemos el nombre de las mecánicas
                    },
                ],
            });

            mecanicas.forEach((mecanica) => {
                mecanicasSet.add(mecanica["mechanic_complementary_activity-m"].name);
            });
        }

        const nombresMecanicas = Array.from(mecanicasSet).join(", ");
        const mensaje = `The mechanics to promote attention in a serious game are: ${nombresMecanicas}`;

        res.status(200).json({ mensaje });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};
