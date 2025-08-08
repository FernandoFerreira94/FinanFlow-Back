import express, { Request, Response, NextFunction } from "express";

import cors from "cors";
import { router } from "./router";
import cookueParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookueParser());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(400).json({
      error: err.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
  return;
});

app.get("/", (req, res) => {
  res.json({
    status: "Online",
    message: "Api FinanFlow Online 🚀",
  });
});

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});

export default app;
