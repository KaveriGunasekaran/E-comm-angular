import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../../../data-type';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  menuType: string = 'default';
  sellerName:string="";
  userName:string='';
  searchResult:undefined|product[];
  cartItems=0;
  constructor(private route:Router, private product:ProductService){}

  ngOnInit(): void {
    this.route.events.subscribe((val:any) => {
    if(val.url){
      if(localStorage.getItem('seller') && val.url.includes('seller')){
        let sellerStore= JSON.parse(localStorage.getItem('seller') || '').name;
        this.sellerName=sellerStore;  
        console.log(this.sellerName);
        this.menuType = 'seller';
      }
      else if(localStorage.getItem('user')){
        let userStore = localStorage.getItem('user');
        let userData = userStore && JSON.parse(userStore);
        this.userName =userData.name;
        this.menuType='user';
        this.product.getCartList(userData.id);
      }
      else{
        this.menuType='default';
      }
    }
    });
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length
    }
    this.product.cartData.subscribe((items)=>{
      this.cartItems = items.length
    })
  } 
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/'])
  }
  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth'])
    this.product.cartData.emit([])
  }
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      console.log(element.value)
      this.product.searchProduct(element.value).subscribe((result) =>{
        console.log(result);
        if(result.length>5){
          result.length=length
        }
        this.searchResult=result;
      })
    }
  }
  hideSearch(){
    this.searchResult=undefined
  }
  //today(23/08/24)
  redirectToDetails(id:number){
    this.route.navigate(['/product-details/'+id])  
  }
  submitSearch(val:string){
    console.log(val);
    this.route.navigate([`search/${val}`]);
  }
}



