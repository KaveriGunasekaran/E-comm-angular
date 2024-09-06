import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../../../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchResult:undefined|product[];
  constructor(private activeRoute: ActivatedRoute,private product:ProductService){ }

  ngOnInit():void{
let query = this.activeRoute.snapshot.paramMap.get('query');
console.log(query);
query && this.product.searchProduct(query).subscribe((result)=>{
  this.searchResult=result;
})
  }

} 
