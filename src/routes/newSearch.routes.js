import express from "express";
import { defineQuestion } from "../controllers/newSearhc.controller.js";

const router = express.Router();

// Peticiones GET
router.get("/defineQuestion", defineQuestion);
router.get("/optionQuestion", );

export default router;