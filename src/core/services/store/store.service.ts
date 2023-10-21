import { IProduct } from '../models/product.models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/enviroment/environment';
import { BehaviorSubject } from 'rxjs';
import { OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { IVenta } from '../models/ventas.models';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private cartKey = 'cart'; // Nombre para la clave en sessionStorage
  private cart = '';
  idUser = '';

  private totalUnidades: number =0;
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
    return this.httpClient.get<IProduct[]>(`${environment.apiUrlMock}products`);
  }

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
  /**
   * Añadir a la cesta
   * @param product 
   */
  addToCart(product: any): void {
    const currentCart = this.getCart();
    const existingProduct = currentCart.find((item) => item._id === product._id);

    if (existingProduct) {
      console.log('Ya existe');
      existingProduct.unidades++;
      existingProduct.totalPrice =
        existingProduct.precio * existingProduct.unidades;
    } else {
      console.log('No existe');
      product.unidades = 1;
      product.totalPrice = product.precio;
      currentCart.push(product);
    }

    this.updateCart(currentCart);
  }
  /**
   * Actualizar Cesta
   * @param cart 
   */

  updateCart(cart: any[]): void {
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
  /**
   * eliminar un articulo de la cesta
   * @param cartId 
   */

  clearCartId(cartId: string): void {
    const cartDataString = sessionStorage.getItem(this.cartKey);

    if (cartDataString) {
      try {
        const cartData: any[] = JSON.parse(cartDataString);

        const cartIndex = cartData.findIndex((item) => item._id === cartId);

        if (cartIndex !== -1) {
          cartData.splice(cartIndex, 1);

          sessionStorage.setItem(this.cartKey, JSON.stringify(cartData));
        }
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }
  buyProducts(products: IProduct[]){
    const user = localStorage.getItem('user');
    if(user !== null){      
      const objetoJSON = JSON.parse(user);
      this.idUser = objetoJSON.data.id;
    }
    const payload = {
      idUser: this.idUser, // Agrega el ID de usuario al payload
      products: products // Agrega los productos al payload
    };

    return this.httpClient.post<IProduct[]>(`${environment.apiUrlMock}products`,payload);
  }

  getOrders(){
    return this.httpClient.get<IVenta[]>(`${environment.apiUrlMock}ventas`);    
  }
  /**
   * cambiar el estado del pedido
   */
  changeStateOrders(id: string, estado: string){

    console.log(id,estado);
    const payload = {
      id: id, // Agrega el ID de usuario al payload
      estado: estado // Agrega los productos al payload
    };
    console.log(id,'id');
    return this.httpClient.put<IVenta[]>(`${environment.apiUrlMock}ventas/${id}`, payload);
    //return this.httpClient.put<IVenta[]>(`${environment.apiUrlMock}ventas`,id);

  }

  /**
   * Añadir o quitar unidades de productos
   * @param id 
   * @param unidades 
   * @returns 
   */
  public ChangeUnits(id: string, unidades: number): Observable<IProduct[]> {
    console.log(id,unidades);
    const payload = {
      id: id, // Agrega el ID de usuario al payload
      unidades: unidades // Agrega los productos al payload
    };
    return this.httpClient.put<IProduct[]>(`${environment.apiUrlMock}products/inventario/${id}`, payload);
  }

  public addProduct(body: any): Observable<any> {
    const formData = new FormData();
    console.log(body,'body');
    formData.append('name', body.name);
    formData.append('description', body.description);
    formData.append('pCompra', body.pCompra);
    formData.append('pvp', body.pvp);
    formData.append('unidades', body.unidades);
    formData.append('image', body.image);
    return this.httpClient.post<any>(
      `${environment.apiUrlMock}products/addProduct`,
      formData
    );
  }

  

  
}
