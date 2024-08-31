import { getUsers } from "@/services/usersActions";

export type UsersDTO = Awaited<ReturnType<typeof getUsers>>[0];
