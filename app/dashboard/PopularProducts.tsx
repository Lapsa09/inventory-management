import Rating from "@/components/Rating";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsDTO } from "@/types/dashboard";
import { ShoppingBag } from "lucide-react";
import React from "react";

function PopularProducts({
  popularProducts,
}: {
  popularProducts: MetricsDTO["popularProducts"];
}) {
  return (
    <Card className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl overflow-auto relative">
      <CardHeader className="sticky top-0 bg-white pb-0">
        <CardTitle className="text-lg font-semibold px-7 pb-2">
          Popular Products
        </CardTitle>
        <hr />
      </CardHeader>
      <CardContent className="py-0">
        {popularProducts.map((product) => (
          <div
            key={product.productId}
            className="flex items-center justify-between gap-3 px-5 py-7 border-b"
          >
            <div className="flex items-center gap-3">
              <div>img</div>
              <div className="flex flex-col justify-between gap-1">
                <div className="font-bold text-gray-700">{product.name}</div>
                <div className="flex text-sm items-center">
                  <span className="font-bold text-blue-500 text-xs">
                    {product.price}
                  </span>
                  <span className="mx-2">|</span>
                  <Rating rating={product.rating ? +product.rating : 0} />
                </div>
              </div>
            </div>
            <div className="text-xs flex items-center">
              <button className=" p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                <ShoppingBag className="w-4 h-4" />
              </button>
              {Math.round(product.stockQuantity / 1000)}k Sold
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default PopularProducts;
