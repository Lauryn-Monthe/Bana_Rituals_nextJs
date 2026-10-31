import { Item } from "./item";
import { Order } from "./order";

export interface OrderItem {
    id: number;
    orderId: number;
    itemId: number;
    quantity: number;
    price: number;

    item?: Item;
    order?: Order;
}
