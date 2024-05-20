import express from "express";
import morgan from "morgan";
import cors from "cors";
import  RouterSearchEleven  from "./routes/search.routes.js";

import Question from "./models/question.js";
import { Sequelize } from "sequelize";
import * as searchController from "./controllers/search.controller.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());

app.use("/search", RouterSearchEleven);
const methodMap = {
  1: searchController.searchOne,
  2: searchController.searchTwo,
  3: searchController.searchThree,
  4: searchController.searchFour,
  5: searchController.searchFive,
  7: searchController.searchSeven,
  8: searchController.searchEigth,
  9: searchController.searchNine,
  10: searchController.searchTen,
  11: searchController.searchEleven,
  12: searchController.searchTwelve,
  13: searchController.searchThirteen,
  14: searchController.searchFourteen,
  15: searchController.searchFifteen,
  16: searchController.searchSixteen,
  17: searchController.searchSeventeen,
  18: searchController.searchEighteen,
  19: searchController.searchNineteen,
  20: searchController.searchTewenty,
};

app.post("/defineQuestion", async (req, res) => {
  if (!req.body || !req.body.question) {
    return res
      .status(400)
      .json({ Status: "Error", message: "Datos no válidos o incompletos" });
  }

  const questionDescription = req.body.question.trim().toLowerCase();

  try {
    const question = await Question.findOne({
      where: Sequelize.where(
        Sequelize.fn(
          "lower",
          Sequelize.fn("trim", Sequelize.col("description"))
        ),
        questionDescription
      ),
    });

    if (question) {
      const index = question.id_question;

      const method = methodMap[index];

      if (method) {
        return method(req, res);
      } else {
        return res.status(404).json({
          Status: "Error",
          message: "Método no encontrado para el índice proporcionado",
        });
      }
    } else {
      return res
        .status(404)
        .json({ Status: "Error", message: "Pregunta no encontrada" });
    }
  } catch (error) {
    console.error("Error al buscar la pregunta:", error);
    return res
      .status(500)
      .json({ Status: "Error", message: "Error interno del servidor" });
  }
});



export default app;
