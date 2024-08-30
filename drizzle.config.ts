import { env } from "@/env.js";
import { type Config } from "drizzle-kit";

export default {
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;
