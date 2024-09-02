import Header from "@/components/Header";
import Rating from "@/components/Rating";
import { SearchParams } from "@/types";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { getter } from "@/services";
import { ProductDTO } from "@/types/products";

const Products = async ({ searchParams }: { searchParams: SearchParams }) => {
  const searchTerm = new URLSearchParams(searchParams).get("q");

  const products = await getter<ProductDTO[]>({
    route: `/products${searchTerm ? `?q=${searchTerm}` : ""}`,
  });

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <SearchBar />
      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <Button
          asChild
          className="flex items-center text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded"
        >
          <Link href={"/products/create"}>
            <PlusCircleIcon className="w-5 h-5 mr-2 text-white" /> Create
            Product
          </Link>
        </Button>
      </div>

      {/* BODY PRODUCTS LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {products?.map((product) => (
          <div
            key={product.productId}
            className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
          >
            <div className="flex flex-col items-center">
              {/* <Image
                src={`https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/product${
                  Math.floor(Math.random() * 3) + 1
                }.png`}
                alt={product.name}
                width={150}
                height={150}
                className="mb-3 rounded-2xl w-36 h-36"
              /> */}
              <div>Img</div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                }).format(+product.price)}
              </p>
              <div className="text-sm mt-1">Stock: {product.stockQuantity}</div>
              {product.rating && (
                <div className="flex items-center mt-2">
                  <Rating rating={+product.rating} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
