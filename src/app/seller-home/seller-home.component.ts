import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../../../data-type';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss'
})
export class SellerHomeComponent implements OnInit {
  productList:undefined| product[];
  productMessage:undefined|string;
  icon=faTrashCan;
  iconEdit=faEdit;
  pdtid: number | undefined;
   constructor(private product:ProductService){ }
    
   ngOnInit():void{
    this.list();
   }

   deleteProduct(id:number){
   this.product.deleteProduct(id).subscribe((result) =>{
    if(result){
      this.productMessage ="Product is deleted";
      this.pdtid=id;
      
      this.list();
    }
   });
setTimeout(()=>{
  this.productMessage =undefined
},3000);
  }

  list(){
    this.product.productList().subscribe((result)=>{
      console.log(result);
      if(result){
        this.productList=result;
      
      }
    });
  }
}
