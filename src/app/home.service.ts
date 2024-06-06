import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor( private http: HttpClient ) { }

  productList(): Observable<any[]> {
  
    return this.http.get<any[]>('http://localhost:5000/api/products/');
  }
  

  getSections(): Observable<string[]> {
   
    return this.http.get<string[]>('http://localhost:5000/api/section/view');
  }

  getCategories(Section: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/api/products/filter?Section=${Section}`);
  }

  allcategory(): Observable<any[]> {
 
    return this.http.get<any>("http://localhost:5000/api/category/view");
  }

  

}
