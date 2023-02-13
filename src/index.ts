import { start } from "./start";
import dotenv from "dotenv";

dotenv.config();

start().catch((err) => {
  console.error(`Error starting server: ${err.message}`, err);
  process.exit(-1);
});
