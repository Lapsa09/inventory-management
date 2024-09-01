import Header from "@/components/Header";
import React from "react";
import Table from "./table";
import { getter } from "@/services";
import { UsersDTO } from "@/types/users";

async function page() {
  const data = await getter<UsersDTO[]>({ route: "/users" });
  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <Table data={data} />
    </div>
  );
}

export default page;
