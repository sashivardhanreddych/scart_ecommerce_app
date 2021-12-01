import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit {
  // Declaring the Variables with assigned a strict type
  public products: any = [];
  public grandTotal!: number;
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    /**
     * used to get the products from the api and categorize the products by using services
     *
     * @params {Object}
     * @returns {Object}
     */
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  // removeItem is used to remove the product from the cart
  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  // emptycart is used to remove all the products from the cart
  emptycart() {
    this.cartService.removeAllCart();
  }
}
