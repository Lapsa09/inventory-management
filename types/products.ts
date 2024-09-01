import { Products } from "@/drizzle/schema";

export type ProductDTO = typeof Products.$inferSelect;

export type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
  productId: string;
};
