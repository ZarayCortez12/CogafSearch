import express from "express";
import {
  searchEleven,
  searchTwelve,
  searchThirteen,
  searchFourteen,
  searchFifteen,
  searchSixteen,
  searchSeventeen,
  searchEighteen,
} from "../controllers/search.controller.js";

const router = express.Router();

// Peticiones GET
router.get("/11", searchEleven); 
router.get("/12", searchTwelve);
router.get("/13", searchThirteen);
router.get("/14", searchFourteen);
router.get("/15", searchFifteen);
router.get("/16", searchSixteen);
router.get("/17", searchSeventeen);
router.get("/18", searchEighteen);

export default router;
