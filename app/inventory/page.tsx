import Header from "@/components/Header";
import React from "react";
import Table from "./table";
import { getProducts } from "@/services/productActions";

async function page() {
  const data = await getProducts("");
  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <Table data={data} />
    </div>
  );
}

export default page;
