import { IProduct } from '../models/product.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { BehaviorSubject } from 'rxjs';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private cartKey = 'cart'; // Nombre para la clave en sessionStorage
  private cart = '';
  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  constructor(private httpClient: HttpClient) {
    const cartData = sessionStorage.getItem(this.cartKey);
    const initialCart = cartData ? JSON.parse(cartData) : [];
    this.cartDataSubject.next(initialCart);
  }
  /**
   * Obtener productos
   * @returns
   */
  public getProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.apiUrl}banks`);
  }
  /**
   * Añadir a la cesta
   * @param item
   */
  // addToCart(item: any): void {
  //   const cart = this.getCart();
  //   cart.push(item);
  //   this.saveCart(cart);
  // }

  getCartObservable(): Observable<any[]> {
    return this.cartDataSubject.asObservable();
  }
  /**
   * obtener cesta
   * @returns
   */
  getCart(): any[] {
    return this.cartDataSubject.value;
  }

  addToCart(product: any): void {
    const currentCart = this.getCart();
    const existingProduct = currentCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.unidades++;
      existingProduct.totalPrice =
        existingProduct.precio * existingProduct.unidades;
    } else {
      product.unidades = 1;
      product.totalPrice = product.precio;
      currentCart.push(product);
    }

    this.updateCart(currentCart);
  }
  private updateCart(cart: any[]): void {
    this.cartDataSubject.next(cart);
    sessionStorage.setItem(this.cartKey, JSON.stringify(cart));
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

  clearCartId(cartId: string): void {
    // Get the cart data from sessionStorage
    const cartDataString = sessionStorage.getItem(this.cartKey);

    if (cartDataString) {
      try {
        const cartData: any[] = JSON.parse(cartDataString);

        const cartIndex = cartData.findIndex((item) => item.id === cartId);

        if (cartIndex !== -1) {
          cartData.splice(cartIndex, 1);

          sessionStorage.setItem(this.cartKey, JSON.stringify(cartData));
        }
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }
}
