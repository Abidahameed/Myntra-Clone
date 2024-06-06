import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VerificationComponent } from './login/verification/verification.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';

import { SignupComponent } from './login/signup/signup.component';
import { CategroryComponent } from './categrory/categrory.component';
import { SubcategoryComponent } from './categrory/subcategory/subcategory.component';
import { ViewpageComponent } from './categrory/subcategory/viewpage/viewpage.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OrderComponent } from './order/order.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FormsModule } from '@angular/forms'; 

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verification', component: VerificationComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'cart', component: CartComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'category', component: CategroryComponent },
  { path: 'subcategory', component: SubcategoryComponent },
  { path: 'viewpage', component: ViewpageComponent},
  { path: 'order', component: OrderComponent},
  { path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    VerificationComponent,
    WishlistComponent,
    CartComponent,
    SignupComponent,
    CategroryComponent,
    SubcategoryComponent,
    ViewpageComponent,
    OrderComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule ,
    BrowserAnimationsModule, // required for Toastr
    ToastrModule.forRoot({
      positionClass: 'toast-top-right', // Change position as needed
      preventDuplicates: true,
      progressBar: true,
      closeButton: true,
      timeOut: 5000, // Set timeout

    })
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
