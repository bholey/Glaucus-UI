import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public login: {email?: string, password?: string} = {};
  responseData: any;
  public loginForm;
  private formBuilder = new FormBuilder();
  public loginValidationMessage = {
    email : [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, one number and minimum 8 characters' }
    ]
  };
  constructor(private loginService: LoginService, private router: Router, private snackBar: MatSnackBar) { }
  private _initForm() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[$@$!%*?&]).{8,}$')
      ]))
    });
  }
  ngOnInit() {
    this._initForm();
    // if user login then set into logout state
    if (localStorage.getItem('idtableUserId')) {
      localStorage.removeItem('idtableUserId');
    }
  }

  onLogin() {
    this.loginService.login(this.login).subscribe(data => {this.responseData = data;
    if (this.responseData) {
          localStorage.setItem('idtableUserId', this.responseData);
          this.router.navigate(['/employees']);
        }
      },
      error => {
        let errorMessage = <any> error;
        if (errorMessage.error) {
          this.snackBar.open(errorMessage.error.errorMessage, 'Close', {
            verticalPosition: 'bottom',
            horizontalPosition: 'end'
          });
        }
      }
    );
  }


}
