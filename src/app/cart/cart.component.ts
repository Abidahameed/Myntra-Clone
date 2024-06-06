import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { OrderComponent } from '../order/order.component';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  user_Id: string = '';
  cartItems: any[] = [];
  quantities: number[] = [1, 2, 3, 4, 5];
  isLoggedIn: boolean = false;
  cartItemCount: number = 0;

  constructor(private authservice: AuthService, private cartservice: CartService,
    private orderservice:OrderService

  ) {}

  ngOnInit(): void {

   
  
    if (this.isLoggedIn) {
      this.getCartItems();
    }


    const userId = this.authservice.getUserId();
    this.isLoggedIn = !!this.authservice.getUserId();

    if (userId) {
      this.cartservice.getCartItems(userId).subscribe(
        response => {
          this.cartItems = response['Items'];
          console.log('Cart items:', this.cartItems);

          this.authservice.setCartItemCount(this.cartItems.length); 
          console.log('Cart items:', this.cartItems);

        },
        error => {
          console.error('Error fetching cart items:', error);
        }
      );
    } else {
      console.error('User ID not found');
    }
  }
  getCartItems() {
    throw new Error('Method not implemented.');
  }

  calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.totalprice, 0);
  }

  updateTotalPrice(item: any) {
    // Calculate the new total price based on the selected quantity
    item.totalprice = item.products_Id.Price * item.quantity;
  }



  placeOrder(item: any): void {
 
    const userId = this.authservice.getUserId();
    if (userId) {
      console.log('id:', userId);
      // const payload = this.cartItems.map(item => ({
      //   user_Id: userId, 
      //   products_Id: item.products_Id._id,
      //   quantity: item.quantity ,
      //   subtotal: item.totalprice
      // }));
      const payload = {
        user_Id: userId, 
        products_Id: item.products_Id._id,
        quantity: item.quantity ,
        subtotal: item.totalprice
      };
      // const payload = {
      
      //   orderData: orderData  // Include orderData in the payload

      // };

      this.orderservice.placeOrder(payload).subscribe(
        (response: any) => {
          console.log('Order placed successfully:', response);
        
        },
        (error: any) => {
          console.error('Error placing order:', error);
          // Handle error case
        }
      );
    } else {
      console.error('User is not logged in');
    }
// alert('Order Placed Successfully')

  }

  removeFromCart(item: any): void {
    const userId = this.authservice.getUserId();
    if (userId) {
      const payload = {
        user_Id: userId,
        products_Id: item.products_Id._id
      };
  
      this.cartservice.removeCartItem(payload).subscribe(
        () => {
          // Remove the item from the wishlistItems array
          this.cartItems = this.cartItems.filter(w => w.products_Id._id !== item.products_Id._id);
          this.cartItemCount = this.cartItems.length; 

        },
        error => {
          console.error('Error removing item from wishlist', error);
        }
      );
    }
    window.location.reload();
  }
  

}