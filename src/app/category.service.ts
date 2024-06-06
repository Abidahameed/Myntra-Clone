import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient ) { }

  getCategoryData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/category/');
  }

  allcategory(): Observable<any[]> {
 
    return this.http.get<any>("http://localhost:5000/api/category/view");
  }


  getSections(): Observable<string[]> {
   
    return this.http.get<string[]>('http://localhost:5000/api/section/view');
  }

  getFilteredProducts(Section: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/api/products/filter?Section=${Section}`);
  }
  getFilteredbyCategory(Section: string, Category: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5000/api/products/filter?section=${Section}&category=${Category}`);
  }
  
}
