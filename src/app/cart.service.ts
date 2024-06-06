import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  

  constructor(
    private http: HttpClient
  ) { }

 
  getCartItems(userId: string): Observable<any> {
    const params = new HttpParams().set('user_Id', userId);
    return this.http.get<any>('http://localhost:5000/api/cart/viewcart', { params });
  }
  


  addToCart(payload: any): Observable<any> {
    const params = new HttpParams()
      .set('user_Id', payload.user_Id)
      .set('products_Id', payload.products_Id);

    return this.http.post<any>('http://localhost:5000/api/cart/', {}, { params });
  }

  removeCartItem(payload: any): Observable<void> {
    const params = new HttpParams()
      .set('user_Id', payload.user_Id)
      .set('products_Id', payload.products_Id);
  
    return this.http.delete<void>('http://localhost:5000/api/cart/deletecartitem', { params });
  }



}
