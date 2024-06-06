import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  onSubmit(): void {
    
      alert('Order placed successfully');
  
    
  }

  
}
