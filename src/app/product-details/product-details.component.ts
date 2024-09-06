import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../../../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productData:undefined|product;
  productQuantity:number=1;
  removeCart= signal(false);
  cartData:product|undefined;
  private cdr = inject(ChangeDetectorRef);
  constructor(private activeRoute:ActivatedRoute , private product:ProductService){ }

  ngOnInit():void{
    let productId= this.activeRoute.snapshot.paramMap.get('productId');
    console.log(productId);
    productId &&  this.product.getProduct(productId).subscribe((result)=>{
      this.productData=result;
    
      let cartData=localStorage.getItem('localCart');
      if(productId && cartData){
        let items = JSON.parse(cartData);
        items = items.filter((item:product) => productId === item.id.toString());
       
        if(items.length){
          this.removeCart.set(true);
        }else{
           this.removeCart.set(false);
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);

        this.product.cartData.subscribe((result)=>{
          let item = result.filter((item:product)=>productId?.toString()===item.productId?.toString())
          if(item.length){
            this.cartData=item[0];
            this.removeCart.set(true);
          }
        })
      }
      
    })
  }

handleQuantity(val:string){
if(this.productQuantity<20 && val==='plus'){
  this.productQuantity+=1;
}else if (this.productQuantity>1 && val === 'min'){
  this.productQuantity-=1;
}
}
addToCart(){
  if(this.productData){
    this.productData.quantity = this.productQuantity;
    if(!localStorage.getItem('user')){
     this.product.localAddToCart(this.productData);
     this.removeCart.set(true);
    }else{
      
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      
      let cartData:cart={
        ...this.productData,
        productId:this.productData.id,
        userId
      }
      delete cartData.id;
      console.log("pdt-details",cartData);
     this.product.addToCart(cartData).subscribe((result)=>{
      if(result){
        console.log("if block",result);
      this.product.getCartList(userId);
      this.removeCart.set(true);
      }
     })
    }
    
  }
}
removeToCart(productId:number){
if(!localStorage.getItem('user')){
  this.product.removeItemFromCart(productId);
    this.removeCart.set(false);
}else{
  console.log("cartData",this.cartData);
  
  this.cartData  && this.product.removeToCart(this.cartData.id)
  .subscribe((result)=>{
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    this.product.getCartList(userId)
  })
}
this.removeCart.set(false);
}

}
