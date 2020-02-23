import { Component, OnInit } from '@angular/core';
import {SignupService} from './signup.service';
import {SignupInterface} from './signup.interface';
import {RoleInterface} from '../shared/role/role.interface';
import {RoleService} from '../shared/role/role.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupValidationMessage = {
    userName : [
      { type: 'required', message: 'Username is required' }
    ],
    userEmail : [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    userPass: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 8 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, one number and minimum 8 characters' }
    ],
    userRole: [
      { type: 'required', message: 'Role is required' },
    ]
  };
  public signup: SignupInterface  = {};
  roleData: RoleInterface[] ;
  responseData: any;
  public signupForm;
  private formBuilder = new FormBuilder();

  constructor(private signupService: SignupService, private roleService: RoleService, private router: Router, private snackBar: MatSnackBar) {}

  private _initForm() {
    this.signupForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required),
      userEmail: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
        ])),
      userPass: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=.*[$@$!%*?&]).{8,}$')
      ])),
      userRole: new FormControl('', Validators.required)
    });
  }


  ngOnInit() {
    this._initForm();
    // @ts-ignore
    this.roleService.fetchRoles().subscribe((res: RoleInterface[]) => {
      this.roleData = res;
    });
  }

  onSignup() {
    this.signupService.signup(this.signup).subscribe(data => {
        this.responseData = data;
        if (this.responseData) {
          this.router.navigate(['/login']);
        }
      },
      error => {
        const errorMessage = error;
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
