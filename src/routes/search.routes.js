import express from "express";
import {
  searchEleven,
  searchTwelve,
  searchThirteen
} from "../controllers/search.controller.js";

const router = express.Router();

// Peticiones GET
router.get("/11", searchEleven); 
router.get("/12", searchTwelve);
router.get("/13", searchThirteen);

export default router;
