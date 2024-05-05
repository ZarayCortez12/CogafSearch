import app from "./app.js"
import db from "./database/db.js";
import dotenv from "dotenv";


dotenv.config();


db.authenticate()
  .then(() => console.log("Databse connection successful"))
  .catch((error) => console.log("Connection error: ", error));

  app.listen(
    process.env.PORT,
    console.log("Servidor en el puerto " + process.env.PORT)
  );