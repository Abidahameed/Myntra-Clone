import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/signup.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  // MobileNumberForm: FormGroup;
  // PasswordForm: FormGroup;

signupForm: any;


  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private signupservice: SignupService,
    private toastr: ToastrService
  ) {

    // this.MobileNumberForm = this.formBuilder.group({
    //   MobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    // });

    // this.PasswordForm = this.formBuilder.group({
    //   Password: ['', [Validators.required, Validators.minLength(8)]]
    // });
  }


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      Password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  onSubmit()
    {
      this.signupForm.markAllAsTouched();
      if (this.signupForm.valid) {

        const Password = this.signupForm.get('Password').value;
       
        // localStorage.setItem('signupPassword', Password);

        console.log('Form data:', this.signupForm.value);
   
        this.signupservice.signup(this.signupForm.value).subscribe(
          (res:any)=> {
            if(res.result){
            console.log('Signup successful:', res);
            // Redirect or show a success message
          }
        })
        alert('successfully registered')
        this.router.navigate(['/login']);
      }

    
  }
}