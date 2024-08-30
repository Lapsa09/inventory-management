import Header from "@/components/Header";
import Rating from "@/components/Rating";
import { getProducts } from "@/services/productActions";
import { SearchParams } from "@/types";
import SearchBar from "./SearchBar";
import CreateProductModal from "./CreateProductModal";

const Products = async ({ searchParams }: { searchParams: SearchParams }) => {
  const searchTerm = new URLSearchParams(searchParams).get("q") || "";

  const products = await getProducts(searchTerm);

  return (
    <div className="mx-auto pb-5 w-full">
      {/* SEARCH BAR */}
      <SearchBar />
      {/* HEADER BAR */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <CreateProductModal />
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
              <h3 className="text-lg text-gray-900 font-semibold">
                {product.name}
              </h3>
              <p className="text-gray-800">
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                }).format(+product.price)}
              </p>
              <div className="text-sm text-gray-600 mt-1">
                Stock: {product.stockQuantity}
              </div>
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
