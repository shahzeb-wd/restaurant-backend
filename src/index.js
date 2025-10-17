import dotenv from "dotenv";
import app from "./app.js";
import { DbConnect } from "./libs/db.js";

dotenv.config();

await DbConnect();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
