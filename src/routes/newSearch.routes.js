import express from "express";
import { defineQuestion, optionQuestion } from "../controllers/newSearhc.controller.js";

const router = express.Router();

// Peticiones GET
router.get("/defineQuestion", defineQuestion);
router.get("/optionQuestion", optionQuestion);

export default router;