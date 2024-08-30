import { db } from "@/drizzle";
import fs from "fs";
import path from "path";
import {
  Products,
  ExpenseSummary,
  Sales,
  SalesSummary,
  Purchases,
  PurchaseSummary,
  Users,
  Expenses,
  ExpenseByCategory,
} from "@/drizzle/schema";
import { NextResponse } from "next/server";

const schema = {
  Products,
  ExpenseSummary,
  Sales,
  SalesSummary,
  Purchases,
  PurchaseSummary,
  Users,
  Expenses,
  ExpenseByCategory,
};

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model = schema[modelName as keyof typeof schema];
    if (model) {
      await db.delete(model);
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

export async function POST() {
  const dataDirectory = path.join("drizzle", "seedData");
  const orderedFileNames = [
    "products.json",
    "expenseSummary.json",
    "sales.json",
    "salesSummary.json",
    "purchases.json",
    "purchaseSummary.json",
    "users.json",
    "expenses.json",
    "expenseByCategory.json",
  ];

  await deleteAllData(orderedFileNames);

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(
      fileName.substring(0, 1).toUpperCase() + fileName.substring(1),
      path.extname(fileName)
    );
    const model = schema[modelName as keyof typeof schema];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await db.insert(model).values(data).execute();
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
  return NextResponse.json({ message: "Data seeded successfully" });
}
