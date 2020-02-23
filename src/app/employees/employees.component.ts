import { Component, OnInit } from '@angular/core';
import {EmployeeInterface} from './employee.interface';
import {EmployeesService} from './employees.service';
import {MatDialog} from '@angular/material';
import {EmployeesdialogueComponent} from './CRUD/employeesdialogue/employeesdialogue.component';
import {ConfimationOnDeleteComponent} from './CRUD/confimation-on-delete/confimation-on-delete.component';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  displayedColumns: string[] = ['idtableEmployeeId', 'name', 'tableEmployeeEmailAddress', 'tableEmployeeDOB', 'tableEmployeeDOJ',
    'tableEmployeeSalary', 'tableEmployeeGender', 'tableEmployeeRole', 'actions'];
  employeesData: EmployeeInterface[] = [];
  public employeeForm;
  private formBuilder = new FormBuilder();
  constructor(private employeesService: EmployeesService, public dialog: MatDialog, private snackBar: MatSnackBar) { }
  ngOnInit() {
    this._initForm();
    this.getEmployees();
  }
  private getEmployees() {
    this.employeesService.fetchEmployees().subscribe((response: any) => {
      this.employeesData = response;
    }, error => {
      const errorMessage = error;
      if (errorMessage.error) {
        this.snackBar.open(errorMessage.error.errorMessage, 'Close', {
          verticalPosition: 'bottom',
          horizontalPosition: 'end'
        });
      }
    });
  }

  private _initForm() {
    this.employeeForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9]+$')
        // this is for the letters (One Character / One Numeric / One special Character / Min Length 8) validation
      ]))
    });
  }

  openDialog(employeedata: EmployeeInterface | {}, act): void {
    let empldata = {};
   if (employeedata != null) {
      empldata = employeedata;
   }
    const dialogRef = this.dialog.open(EmployeesdialogueComponent, {
      width: '600px',
      data: {empldata, act}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
      }
    });
  }

  confirmationDialogue(empid: string): void {
    const dialogRef = this.dialog.open(ConfimationOnDeleteComponent, {
      width: '400px',
      data: {module: 'Employee', id: empid},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
      }
    });
  }



}
