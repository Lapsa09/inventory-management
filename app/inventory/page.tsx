import Header from "@/components/Header";
import React from "react";
import Table from "./table";
import { getter } from "@/services";
import { ProductDTO } from "@/types/products";

async function page() {
  const data = await getter<ProductDTO[]>({ route: "/products" });
  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <Table data={data} />
    </div>
  );
}

export default page;
