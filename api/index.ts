import app from "../src/server";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Request, Response } from "express";

// Tipagem correta para evitar o uso de "any"
export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as unknown as Request, res as unknown as Response);
}
