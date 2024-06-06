import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor( private http: HttpClient ) {  
  }

  getSubcategoryData(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/category/');
  }

  allSubcategory(): Observable<any[]> {
 
    return this.http.get<any>("http://localhost:5000/api/subcategory/view");
  }


}
