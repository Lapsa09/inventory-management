import React from "react";
import Header from "@/components/Header";
import { UserSetting } from "@/types";
import Settings from "./Settings";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockSettings: UserSetting[] = [
  { label: "Username", value: "john_doe", type: "text" },
  { label: "Email", value: "john.doe@example.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: true, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

const page = () => {
  return (
    <div className="w-full">
      <Header name="User Settings" />
      <div className="overflow-x-auto mt-5 border rounded-xl border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Setting</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <tbody>
            <Settings settings={mockSettings} />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default page;
