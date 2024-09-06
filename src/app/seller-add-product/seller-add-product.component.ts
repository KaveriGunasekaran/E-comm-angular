import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../../../data-type';

@Component({
  selector: 'app-seller-add-product', 
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss'
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage:string | undefined
  constructor(private product:ProductService){
  }
  ngOnInit():void{
  }
  submit(data:product){
    this.product.addProduct (data).subscribe ((result) =>{
console.log(result);
if(result){
  this.addProductMessage="Product is Added Successfully";
}
    });
    setTimeout(()=>{
      this.addProductMessage=undefined
    },3000)
  }

}
