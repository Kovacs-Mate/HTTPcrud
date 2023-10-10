import { Article } from "./article";

export interface Order {
    id: number;
    customerName: string;
    CustomerAddress: String;
    list: Article[];
}
