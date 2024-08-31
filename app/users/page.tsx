import Header from "@/components/Header";
import React from "react";
import Table from "./table";
import { getUsers } from "@/services/usersActions";

async function page() {
  const data = await getUsers();
  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <Table data={data} />
    </div>
  );
}

export default page;
