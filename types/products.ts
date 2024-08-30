import { getProducts } from "@/services/productActions";

export type ProductDTO = Awaited<ReturnType<typeof getProducts>>[0];

export type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
  productId: string;
};
