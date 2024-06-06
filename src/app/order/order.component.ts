import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  userorder: any[] = [];

  constructor(private orderservice: OrderService,
    public authservice: AuthService
  ) { }

  ngOnInit(): void {
    // Assume userService.getUserId() returns the user ID
    const user_Id = this.authservice.getUserId();
    const payload = { user_Id };

    this.orderservice.getOrders(payload).subscribe(
      (result: any) => {
        console.log('Full API Response:', result);

        if (result && result.userorder
        ) {
          this.userorder = result.userorder
            ;
          console.log('Fetched data:', this.userorder);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }




}
