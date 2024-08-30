import axios from "axios";

export async function getter<T = any>({ route }: { route: string }) {
  const response = await axios.get<T>(route, {
    baseURL: "http://localhost:3000/api",
  });

  return response.data;
}
