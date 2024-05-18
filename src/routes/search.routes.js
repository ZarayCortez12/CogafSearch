import express from "express";
import {
  searchEleven
} from "../controllers/search.controller.js";

const router = express.Router();

// Peticiones GET
router.get("/11", searchEleven); 

export default router;
