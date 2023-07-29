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

  constructor(private httpClient: HttpClient) { }

  public getProducts():Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(`${environment.apiUrl}banks`);
  }
}
