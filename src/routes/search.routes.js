import express from "express";
import {
  searchEleven,
  searchTwelve,
  searchThirteen,
  searchFourteen,
  searchFifteen,
} from "../controllers/search.controller.js";

const router = express.Router();

// Peticiones GET
router.get("/11", searchEleven); 
router.get("/12", searchTwelve);
router.get("/13", searchThirteen);
router.get("/14", searchFourteen);
router.get("/15", searchFifteen);

export default router;
