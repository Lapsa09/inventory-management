"use server";

import { db } from "@/drizzle";
import { Users } from "@/drizzle/schema";

export const getUsers = async () => {
  const users = await db.select().from(Users);

  return users;
};
