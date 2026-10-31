import { Order } from "./order";

export type Role = "USER" | "ADMIN";

export interface User {
    id: number;
    email: string;
    password: string;
    name?: string;
    role: Role;
    created_at: string;
    orders?: Order[];
}
