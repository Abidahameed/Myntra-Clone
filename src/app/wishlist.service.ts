import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor( private http: HttpClient ) { }


  addToWishlist(payload: any): Observable<any> {
    const params = new HttpParams()
      .set('user_Id', payload.user_Id)
      .set('products_Id', payload.products_Id);
  
    return this.http.post<any>('http://localhost:5000/api/WishList/', {}, { params });
  }



  getWishlistItems(userId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/api/WishList/viewWishList?user_Id=${userId}`);
  }


  removeWishlistItem(payload: any): Observable<void> {
    const params = new HttpParams()
      .set('user_Id', payload.user_Id)
      .set('products_Id', payload.products_Id);
  
    return this.http.delete<void>('http://localhost:5000/api/WishList/deleteWishList', { params });
  }


}
