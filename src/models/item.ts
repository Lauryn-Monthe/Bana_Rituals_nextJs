export interface Item {
    id: string;
    name: string;
    description?: string;
    longDescription?: string;
    usage?: string;
    ingredients?: string;
    price: number;
    discountPercent?: number;
    stock: number;
    images: string[];
    // orderItems?: OrderItem[];
}
