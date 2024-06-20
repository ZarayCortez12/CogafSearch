import Cognitive_test from "../models/cognitive_test.js";
import Complementary_activity from "../models/complementary_activity.js";
import Characteristic from "../models/characteristic.js";
import Capability from "../models/capability.js";
import Psychological_task from "../models/psychological_task.js";
import Basic_emotion_type from "../models/basic_emotion_type.js";
import Secondary_emotion_type from "../models/secondary_emotion_type.js";


export const getTests = async (req, res) => {
  try {
    const tests = await Cognitive_test.findAll();
    if (!tests) {
      return res.status(404).json({
        message: "error",
      });
    }
    // función para extraer la propiedad "name" de cada elemento de la lista
    const testNames = tests.map((test) => test.name);   

    res.status(200).json({ testNames });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAgeRank = async (req, res) => {
  try {
    const ageRank = await Cognitive_test.findAll();
    if (!ageRank) {
      return res.status(404).json({
        message: "error",
      });
    }
    // función para extraer la propiedad "age_rank" de cada elemento de la lista
    const ageRanks = ageRank.map((test) => test.age_rank);   

    res.status(200).json({ ageRanks });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getComplementaryActivities = async (req, res) => {
  try {
    const activities = await Complementary_activity.findAll();
    if (!activities) {
      return res.status(404).json({
        message: "error",
      });
    }
    // función para extraer la propiedad "name" de cada elemento de la lista
    const activityNames = activities.map((activity) => activity.name);   

    res.status(200).json({ activityNames });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getCharacteristics = async (req, res) => {
  try {
    const characteristics = await Characteristic.findAll();
    if (!characteristics) {
      return res.status(404).json({
        message: "error",
      });
    }
    // función para extraer la propiedad "name" de cada elemento de la lista
    const characteristicNames = characteristics.map((characteristic) => characteristic.name);   

    res.status(200).json({ characteristicNames });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getEmotions = async (req, res) => {
  try {
    const basic = await Basic_emotion_type.findAll();
    if (!basic) {
      return res.status(404).json({
        message: "error",
      });
    }

    const secondary = await Secondary_emotion_type.findAll();
    if (!secondary) {
      return res.status(404).json({
        message: "error",
      });
    }

    const basicNames = basic.map((basic) => basic.description);   
    const secondaryNames = secondary.map((secondary) => secondary.description);   

    res.status(200).json({ basicNames, secondaryNames });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getCapabilities = async (req, res) => {
  try {
    const capabilities = await Capability.findAll();
    if (!capabilities) {
      return res.status(404).json({
        message: "error",
      });
    }
    // función para extraer la propiedad "name" de cada elemento de la lista
    const capabilityNames = capabilities.map((capability) => capability.name);   

    res.status(200).json({ capabilityNames });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getPsyciologicalTasks = async (req, res) => { 
    try {
        const tasks = await Psychological_task.findAll();
        if (!tasks) {
            return res.status(404).json({
                message: "error",
            });
        }
        // función para extraer la propiedad "name" de cada elemento de la lista
        const taskNames = tasks.map((task) => task.name);   

        res.status(200).json({ taskNames });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};