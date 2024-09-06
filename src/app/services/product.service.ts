import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../../../data-type';
import { HttpClient } from '@angular/common/http';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cancelOrder(orderId: number) {
    throw new Error('Method not implemented.');
  }
  id(id: any) {
    throw new Error('Method not implemented.');
  }
  cartData = new EventEmitter<product[] | []>()
  constructor(private http: HttpClient) { }
  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data, { observe: 'response' });
  }
  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
  updateProduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product)
  }
  trendyProduct() {
    return this.http.get<product[]>("http://localhost:3000/products?_limit=8");
  }
  searchProduct(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }
  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    console.log("Product service", productId);
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      console.log("service if block");
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id)
      console.log("items after filter", items);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }
  getCartList(userId: String) {
    return this.http.get<product[]>('http://localhost:3000/cart?userId=' + userId, {
      observe: 'response'
    }).subscribe((result) => {
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    })
  }
  removeToCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId)
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId=' + userData.id);
  }
  orderNow(data: order) {
    return this.http.post('http://localhost:3000/orders', data);
  }
  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId=' + userData.id);
  }
  deleteCartItems(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })

  
  }
  cancelOrderItem(orderId: number){
    return this.http.delete('http://localhost:3000/orders/' + orderId)
    }
}

