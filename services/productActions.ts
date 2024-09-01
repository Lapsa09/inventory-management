"use server";

import { db } from "@/drizzle";
import { Products } from "@/drizzle/schema";

export const createProduct = async (body: {
  productId: string;
  name: string;
  price: number;
  rating: number;
  stockQuantity: number;
}) => {
  const { productId, name, price, rating, stockQuantity } = body;
  const product = await db
    .insert(Products)
    .values({
      productId,
      name,
      price: price.toString(),
      rating: rating.toString(),
      stockQuantity,
    })
    .returning();
  return product;
};
