import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../../../data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {
  productData:undefined|product;
  productMessage:undefined|string;
  constructor(private route: ActivatedRoute, private product: ProductService) { }

  ngOnInit(): void {
    // Get the 'id' from the route parameters and handle potential spaces
    let productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      // Remove any spaces from the productId
      productId = productId.replace(/%20/g, '').trim();
      console.log('Product ID:',productId);

      this.product.getProduct(productId).subscribe((data) => {
        console.log(data);
        this.productData=data;
      });
    } else {
      console.error('Product ID is missing or invalid.');
    }
  }

  submit(data: any): void {
    // Handle form submission logic here
   
    if(this.productData){
      data.id=this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result)=> {
      if(result){
        this.productMessage = 'Product has updated';
      }
    });
    setTimeout(()=>{
      this.productMessage = undefined;
    },3000);
    console.log(data);
  }
}
