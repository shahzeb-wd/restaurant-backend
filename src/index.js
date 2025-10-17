// import dotenv from "dotenv";
// import app from "./app.js";
// import { DbConnect } from "./libs/db.js";

// dotenv.config();

// DbConnect();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// src/index.js
import serverless from "serverless-http";
import dotenv from "dotenv";
import app from "./app.js";
import { DbConnect } from "./libs/db.js";

dotenv.config();

// Connect to database
DbConnect();

// Export app as a serverless function
export default serverless(app);
