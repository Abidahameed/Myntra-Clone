import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';
import { CategoryService } from 'src/app/category.service';
import { HomeService } from 'src/app/home.service';
import { WishlistService } from 'src/app/wishlist.service';

@Component({
  selector: 'app-viewpage',
  templateUrl: './viewpage.component.html',
  styleUrls: ['./viewpage.component.css']
})
export class ViewpageComponent {
  data: any[] = [];
  selectedProduct = '';
  selectedSection = '';

  constructor(
    private route: ActivatedRoute,
    private homeservice:HomeService,
    private authservice:AuthService,
    private cartservice:CartService,
    private wishlistService:WishlistService ,
    private router: Router,

  ) {
     

  }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.selectedProduct = params['product'];
      this.selectedSection = params['section'];
    });
    this.homeservice.getCategories(this.selectedSection).subscribe(
      (result: any) => {
        console.log(result);
        if (result ) {
          this.data = result;
          this.data = result['MyData'].filter((category: any) => category.Name === this.selectedProduct);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  
  


    this.route.queryParams.subscribe(params => {
      this.selectedProduct = params['product'];
      this.selectedSection = params['section'];
    });
    this.homeservice.getCategories(this.selectedSection).subscribe(
      (result: any) => {
        console.log(result);
        if (result ) {
          this.data = result;
          this.data = result['MyData'].filter((category: any) => category.Name === this.selectedProduct);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  
  }

  addToWishlist(productId: string): void {
    const userId = this.authservice.getUserId();
    if (userId) {
      const payload = {
        user_Id: userId,
        products_Id: productId
      };
  
      this.wishlistService.addToWishlist(payload).subscribe(
        response => {
          console.log('Product added to wishlist:', response);


          this.router.navigate(['/wishlist']).then(()=>{
            window.location.reload();
          });


        },

        error => {
          console.error('Error adding product to wishlist:', error);
          // Handle error
        }
      );
    } else {
      console.error('User ID not found');
    }

    }

  addToCart(product: any): void {
    const userId = this.authservice.getUserId();
    if (userId) {
      const payload = {
        user_Id: userId,
        products_Id: product._id
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

        }
      );
    } else {
      console.error('User ID not found');
    }
  }
  
}

