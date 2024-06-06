import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor( private http: HttpClient ) { }

  

  placeOrder(orderData: any) :Observable<any[] > {
    return this.http.post<any>('http://localhost:5000/api/orders/', orderData);


  }

  getOrders(payload: any): Observable<any[]> {
    const params = new HttpParams().set('user_Id', payload.user_Id);
  
    return this.http.get<any[]>('http://localhost:5000/api/orders/userorder', { params });
  }
  
  
}
