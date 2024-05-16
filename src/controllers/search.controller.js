import BasicEmotionType from "../models/basic_emotion_type.js";
import BasicEmotion from "../models/basic_emotion.js";
import Emotion from "../models/emotion.js";
import EmotionCharacterist from "../models/emotions_characteristic.js";
import Characteristic from "../models/characteristic.js";
import { where } from "sequelize";

export const searchOne = async (req, res) => {
  const { palabras } = req.body;

  try {
    const registro = await BasicEmotionType.findOne({
      where: { description: palabras },
    });

    if (!registro) {
      return res
        .status(404)
        .json({
          message: "No se encontró ningún registro con la descripción dada.",
        });
    }
    const registroAux = await BasicEmotion.findByPk(registro.id);
    if (!registroAux) {
      return res
        .status(404)
        .json({
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
      return res
        .status(404)
        .json({
          message: "No se encontraron características para esta emoción.",
        });
    }

    const nombresCaracteristicas = caracteristicas
      .map((c) => c["emotion_characteristic-c"].name)
      .join(", ");
    const mensaje = `Las características para saber que una persona está triste son: ${nombresCaracteristicas}`;

    res.status(200).json({ mensaje });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};
