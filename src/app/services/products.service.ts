import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL: string = 'https://dummyjson.com/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.API_URL}products?limit=10`);
  }

  getAllProducts(
    limit: number,
    skip: number,
    category: string = '',
  ): Observable<Product[]> {
    const url: string =
      category != '' ? 'products/category/' + category : 'products';

    return this.http.get<Product[]>(
      `${this.API_URL}${url}?limit=${limit}&skip=${skip}`,
    );
  }

  getAllProductsByCategory(
    limit: number,
    skip: number,
    category: string = '',
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.API_URL}products/${
        category ? 'category/' + category : ''
      }?limit=${limit}&skip=${skip}`,
    );
  }

  getDetailProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.API_URL}products/${id}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API_URL}products/categories`);
  }
}
