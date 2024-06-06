import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { WishlistService } from '../wishlist.service';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  isUserLoggedIn: boolean = false;
  wishlistItems: any[] = [];
Items: any[] = [];
  constructor(private authservice: AuthService, private wishlistservice: WishlistService, private cartservice: CartService,private router:Router) { }

  ngOnInit(): void {

    const userId = this.authservice.getUserId();
    this.isUserLoggedIn = !!userId; // Check if user is logged in
    if (userId) {
      this.wishlistservice.getWishlistItems(userId).subscribe(
        response => {
          this.wishlistItems = response['Items'];
          console.log('wishlist items:', this.wishlistItems);
        },
        error => {
          console.error('Error fetching wishlist items:', error);
        }
      );
    } else {
      console.error('User ID not found');
    }
  }

  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
  addToCart(item: any): void {
    const userId = this.authservice.getUserId();
    if (userId) {
      const payload = {
        user_Id: userId,
        products_Id: item.products_Id._id
      };

      this.cartservice.addToCart(payload).subscribe(
        response => {
          console.log('Product added to cart:', response);

           
    this.router.navigate(['/cart']).then(()=>{
      window.location.reload();
    });


        },
        error => {
          console.error('Error adding product to cart:', error);
          // Handle error
        }
      );
    } else {
      console.error('User ID not found');
    }




}

removeFromWishlist(item: any): void {
  const userId = this.authservice.getUserId();
  if (userId) {
    const payload = {
      user_Id: userId,
      products_Id: item.products_Id._id
    };

    this.wishlistservice.removeWishlistItem(payload).subscribe(
      () => {
  
        this.wishlistItems = this.wishlistItems.filter(w => w.products_Id._id !== item.products_Id._id);
      },
      error => {
        console.error('Error removing item from wishlist', error);
      }
    );
    window.location.reload();
  }
}



}