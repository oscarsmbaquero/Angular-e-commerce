import { IProduct } from '../models/product.models';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private cartKey = 'cart'; // Nombre para la clave en sessionStorage

  constructor(private httpClient: HttpClient) { }
/**
 * Obtener productos
 * @returns 
 */
  public getProducts():Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.apiUrl}banks`);
  }
  /**
   * Añadir a la cesta
   * @param item 
   */
  addToCart(item: any): void {
    const cart = this.getCart();
    cart.push(item);
    this.saveCart(cart);
  }
  /**
   * obtener cesta
   * @returns 
   */
  getCart(): any[] {
    const cartData = sessionStorage.getItem(this.cartKey);
    return cartData ? JSON.parse(cartData) : [];
  }
/**
 * guarar en cesta
 * @param cart 
 */
  saveCart(cart: any[]): void {
    sessionStorage.setItem(this.cartKey, JSON.stringify(cart));
  }

  /**
   * eliminar cesta
   */
  clearCart(): void {
    sessionStorage.removeItem(this.cartKey);
  }
}
