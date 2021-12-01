import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * @description Used to get all the items from the database through the api ( String )
   *
   * @return productList items ( String )
   * */
  getProduct() {
    return this.http.get<any>('https://fakestoreapi.com/products').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
