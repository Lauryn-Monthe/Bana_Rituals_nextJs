import { User } from "./user";
import { OrderItem } from "./orderItem";

export interface Order {
    id: number;
    userId?: number;
    guestEmail?: string;
    guestName?: string;
    total: number;
    status: "pending" | "paid" | "shipped";
    created_at: string;

    user?: User;
    items?: OrderItem[];
}
