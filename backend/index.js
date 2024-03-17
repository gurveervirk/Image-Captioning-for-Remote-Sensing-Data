import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import connectDB from "./src/db/index.js";
import app from "./src/app.js";
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("ERROR: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
      console.log(`http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo DB connection failed !!! ", err);
  });
