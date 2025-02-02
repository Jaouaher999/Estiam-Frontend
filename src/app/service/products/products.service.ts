import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../model/product/product';
import { Category } from '../../model/category/category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiHost = 'https://api.escuelajs.co/api/v1';
  private _item!: Product;
  private _items!: Array<Product>

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiHost}/products`);
  }
  createProduct(product: any): Observable<Product> {
    return this.http.post<Product>(`${this.apiHost}/products/`, product);
  }
  updateProduct(product: any): Observable<Product> {
    return this.http.put<Product>(`${this.apiHost}/products/` + product.id, product);
  }
  deleteProduct(product: Product): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiHost}/products/` + product.id);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('https://api.escuelajs.co/api/v1/categories');
  }
  getCategory(categoryId: number): Observable<Category> {
    return this.http.get<Category>('https://api.escuelajs.co/api/v1/categories/'+ categoryId);
  }


  get item(): Product {
    if (this._item == null) {
      this._item = new Product();
    }
    return this._item;
  }

  set item(value: Product) {
    this._item = value;
  }

  get items(): Array<Product> {
    if (this._items == null) {
      this._items = new Array<Product>();
    }
    return this._items;
  }

  set items(value: Array<Product>) {
    this._items = value;
  }
}
