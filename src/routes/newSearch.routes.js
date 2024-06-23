import express from "express";
import { defineQuestion, optionQuestion } from "../controllers/newSearhc.controller.js";

const router = express.Router();

// Peticiones GET
router.post("/defineQuestion", defineQuestion);
router.post("/optionQuestion", optionQuestion);

export default router;