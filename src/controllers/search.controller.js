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
import Capability from "../models/capability.js";
import Capability_cognitive_function from "../models/capability_cognitive_function.js";
import Complex_cognitive_function_type from "../models/complex_cognitive_function_type.js";
import Complex_cognitive_function from "../models/complex_cognitive_function.js";

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
              message: "No se encontraron funciones cognitivas asociadas con la habilidad para comunicarse efectivamente.",
          });
      }

      
      const idsFuncionesCognitivas = relaciones.map(relacion => relacion.cognitive_function_id);

      
      const nombresFuncionesCognitivas = [];
      for (const idFuncion of idsFuncionesCognitivas) {
          
          let funcion = await Complex_cognitive_function.findOne({
              where: { id: idFuncion },
          });

         
          if (!funcion) {
              funcion = await BasicCognitiveFuntion.findOne({
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
              } else if (funcion instanceof BasicCognitiveFuntion) {
                 
                  const tipoFuncion = await BasicCognitiveFuntionType.findOne({
                      where: { id: funcion.basic_cognitive_function_type_id },
                  });
                  nombreFuncion = tipoFuncion ? tipoFuncion.description : "";
              }

              
              if (nombreFuncion) {
                  nombresFuncionesCognitivas.push(nombreFuncion);
              }
          }
      }

      
      let mensaje = "The cognitive functions that are present in the ability to communicate effectively are ";
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
