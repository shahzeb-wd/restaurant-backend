// api/index.js
import serverless from "serverless-http";
import app from "../src/app.js";
import { DbConnect } from "../src/libs/db.js";

// Connect to MongoDB (serverless friendly)
DbConnect();

export default serverless(app);
