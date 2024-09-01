import { db } from "@/drizzle";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await db.query.Users.findMany();

  return NextResponse.json(products);
}
