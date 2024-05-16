import app from "./app.js"
import db from "./database/db.js";
import dotenv from "dotenv";

db.authenticate()
  .then(() => console.log("Database connection successful"))
  .catch((error) => console.log("Connection error: ", error));

dotenv.config();

app.listen(
    process.env.PORT,
    console.log("Servidor en el puerto " + process.env.PORT)
);



