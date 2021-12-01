import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // Declaring the Variables with assigned a strict type
  public productList : any ;
  public filterCategory : any ;
  searchKey:string ="";

  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {

    /**
     * used to get the products from the api and categorize the products by using services
     * 
     * @params {Object}
     * @returns {Object}
     */
    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a:any) => {
        if(a.category ==="women's clothing" || a.category ==="men's clothing"){
          a.category ="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price});
      });
      console.log(this.productList)
    });

    this.cartService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  // addtocart is used to add the product into the cart
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }

  /** 
     * used to filter the items categorize the products by using services
     * 
     * @params {Object}
     * @returns {Object}
     */
  filter(category:string){
    this.filterCategory = this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }

}
