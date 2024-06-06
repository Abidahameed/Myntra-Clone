import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'user_Id'; 
  private userName: string | null = null;
  private cartItemCount = new BehaviorSubject<number>(0);
  
  constructor() {}

  setUserId(_id: string): void {
    console.log('Storing user ID:', _id); 
    localStorage.setItem(this.storageKey, _id);
  }

  setUserName(Name: string): void {
    this.userName = Name;
    localStorage.setItem('userName', Name);
  }

  getUserName(): string | null {
    return this.userName || localStorage.getItem('userName');
  }

  getUserId(): string | null {
    const userId = localStorage.getItem(this.storageKey);
    console.log('Retrieved user ID:', userId); 
    return userId;
  }

  clearUserId(): void {
    console.log('Clearing user ID'); 
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.storageKey);
  }

  login(userId: string): void {
    localStorage.setItem(this.storageKey, userId);
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  setCartItemCount(count: number): void {
    this.cartItemCount.next(count);
  }

  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }
  

}
