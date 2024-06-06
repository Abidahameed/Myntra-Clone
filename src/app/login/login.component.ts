import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  incorrectPassword: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private loginservice:LoginService,
    private router: Router,
  private authservice: AuthService) 
  { 
    
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
     
      PhoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      Password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  Submit(): void {

    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {

      const enteredPassword = this.loginForm.get('Password')!.value;
    // const storedPassword = localStorage.getItem('signupPassword');

    // if (enteredPassword !== storedPassword) {
    //   this.incorrectPassword = true; 
    //   return; 
    // }
      const formValues = this.loginForm.value;
      this.loginservice.userlogin(formValues).subscribe(
        (response: any) => {
       
          console.log('Login response:', response); 
          const userId = response.MyData._id; 
          const userName = response.MyData.Name;
                
            if (userId && userName) {
                      this.authservice.setUserId(userId);
                      this.authservice.setUserName(userName);
                      console.log('User ID and Name stored:', userId, userName);

            this.router.navigate(['/']); 
          } else {
            console.error('User ID not found in response');
          }
        },
        error => {
          console.log('incorrect password');
          this.incorrectPassword = true; 
          console.error('Login error:', error);
          return;
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
  
  
  // onSubmit():void{
  
   
  //   this.loginservice.userlogin(this.loginForm.value).subscribe((result)=>{
  //     console.warn(result)
  //   });
  //   if (this.loginForm.valid) {
  //     // Handle form submission
  //     this.router.navigate(['/'])
  //   }
  // }
}
