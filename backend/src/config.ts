
import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET_KEY = process.env.JWT_PASS as string;
if (!JWT_SECRET_KEY) {
  throw new Error("❌ JWT_PASS not defined in .env");
}
