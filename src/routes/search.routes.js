import express from "express";
import {
  searchEleven,
  searchTwelve,
  searchThirteen,
  searchFourteen,
  searchFifteen,
  searchSixteen
} from "../controllers/search.controller.js";

const router = express.Router();

// Peticiones GET
router.get("/11", searchEleven); 
router.get("/12", searchTwelve);
router.get("/13", searchThirteen);
router.get("/14", searchFourteen);
router.get("/15", searchFifteen);
router.get("/16", searchSixteen);

export default router;
