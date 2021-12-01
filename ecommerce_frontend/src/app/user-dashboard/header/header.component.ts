import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Declarations variables along with type for strict use
  public totalItem : number = 0;
  public searchTerm !: string;

  constructor(private cartService : CartService) { }

  ngOnInit(): void {

    // Used to get products from the cart service
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }

  // Used to get the products by using the search function
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
}
