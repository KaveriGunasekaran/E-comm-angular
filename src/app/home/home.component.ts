import { Component, OnInit } from '@angular/core';
import { product } from '../../../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  trendyProducts:undefined|product[];
  constructor(private product:ProductService){ }
 ngOnInit(): void {
   this.product.trendyProduct().subscribe((data)=>{
    this.trendyProducts=data;
    console.log('trendy products',this.trendyProducts);
   })
 }
}
