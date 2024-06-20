import express from "express";
import { getAgeRank, getComplementaryActivities, getCharacteristics, getEmotions,getTests, getCapabilities, getPsyciologicalTasks } from "../controllers/select.controller.js";

const router = express.Router();

// Peticiones GET
router.get("/age-rank", getAgeRank);
router.get("/activities", getComplementaryActivities);
router.get("/characteristics", getCharacteristics);
router.get("/emotions", getEmotions);
router.get("/tests", getTests);
router.get("/capabilities", getCapabilities);
router.get("/tasks", getPsyciologicalTasks);

export default router;