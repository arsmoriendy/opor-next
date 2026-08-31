import { relations } from "@/lib/db/relations"
import "@/lib/env-config"
import { drizzle } from "drizzle-orm/node-postgres"

export const db = drizzle(process.env.DATABASE_URL!, { relations })
