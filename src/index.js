// api/index.js
import serverless from "serverless-http";
import app from "./app.js"; // your existing Express app
import { DbConnect } from "./libs/db.js";

DbConnect(); // connect to MongoDB

export default serverless(app);
