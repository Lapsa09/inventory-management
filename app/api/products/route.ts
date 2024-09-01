import { db } from "@/drizzle";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("q");
  const products = await db.query.Products.findMany({
    where: search
      ? (product, { ilike }) => ilike(product.name, `%${search}%`)
      : undefined,
  });

  return NextResponse.json(products);
}
