import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Article } from "../interfaces/article";
import { Order } from "../interfaces/order";
import { ListItem } from "../interfaces/list-item";

@Injectable({
    providedIn: "root"
})
export class BaseService {
    private ekszerekUrl: string = "http://localehost:3000/ekszerek/";
    private rendelesekUrl: string = "http://localehost:3000/rendelesek/";
    public cartListRef: BehaviorSubject<ListItem[]> = new BehaviorSubject<ListItem[]>([]);

    constructor(private http: HttpClient) {}

    // Ékszerek

    public getekszerList(): Observable<Article[]> {
        return this.http.get<Article[]>(this.ekszerekUrl);
    }

    public getEkszer(id: number): Observable<Article> {
        const url: string = `${this.ekszerekUrl}/${id}`;
        return this.http.get<Article>(url);
    }

    public addEkszer(item: Article): void {
        this.http.post(this.ekszerekUrl, item);
    }

    public updateEkszer(id: number, item: Article): void {
        const url: string = `${this.ekszerekUrl}/${id}`;
        this.http.put(url, item);
    }

    public deleteEkszer(id: number): void {
        const url: string = `${this.ekszerekUrl}/${id}`;
        this.http.delete(url);
    }

    // Kosár

    public addToCart(item: ListItem): void {
        const currentList: ListItem[] = this.cartListRef.getValue();

        const existingItem = currentList.find(existingItem => existingItem.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            currentList.push(item);
        }
        this.cartListRef.next(currentList);
    }

    public removeFromCart(item: ListItem): void {
        const currentList: ListItem[] = this.cartListRef.getValue();
        currentList.filter(article => article.id !== item.id);
        this.cartListRef.next(currentList);
    }

    // Rendelés

    public addOrder(item: Order): void {
        this.http.post(this.rendelesekUrl, item);
        this.cartListRef.next([]);
    }
}
