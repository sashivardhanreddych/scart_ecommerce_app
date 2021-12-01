import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Initializing cartItemList as an empty array
  public cartItemList: any = [];

  //Creating new behavior subjects
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor() {}

  /**
   * @description Creates a new Observable with this Subject as the source.
   * You can do this to create customize Observer-side logic of the
   * Subject and conceal it from code that uses the Observable.
   *
   *
   * @return productList items
   * */

  // Used to get Products
  getProducts() {
    return this.productList.asObservable();
  }

  // Used to set the product in the productList array
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  // Used to set the product in the productList array
  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }

  // Used to calculate the total price of all items in the cartItemList array
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

  // Used to delete the item in cartItemList array
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }

  /**
   * Used to delete all the items in the cartItemList array.
   * Declaring the empty array to cartItemList
   * 
   */
  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
