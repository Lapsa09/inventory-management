import { Users } from "@/drizzle/schema";

export type UsersDTO = typeof Users.$inferSelect;
