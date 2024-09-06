import { Component, OnInit } from '@angular/core';
import { order } from '../../../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent  implements OnInit{

  orderData:order[]|undefined
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.getOrderlist();
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }
  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrderItem(orderId).subscribe((result)=>{
      if(result){
        this.getOrderlist();
      }
      })
      }
      getOrderlist(){
        this.product.orderList().subscribe((result)=>{
          this.orderData=result;
      })
}

  }  
