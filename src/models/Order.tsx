import { Product } from "./Product";

export interface Order {
    date: string | Date;
    products: Product[];
    totalProducts: number;
    totalPrice: number;
}