import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeeInterface} from '../../employee.interface';
import {EmployeesService} from '../../employees.service';
import {RoleService} from '../../../shared/role/role.service';
import {RoleInterface} from '../../../shared/role/role.interface';
import {formatDate} from '@angular/common';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {EmployeesComponent} from '../../employees.component';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-employeesdialogue',
  templateUrl: './employeesdialogue.component.html',
  styleUrls: ['./employeesdialogue.component.css']
})
export class EmployeesdialogueComponent implements OnInit {

  roleData: RoleInterface = null;
  responseData?: any;
  gender: string[] = ['male', 'female'];
  action: string;
  empdata: EmployeeInterface;
  public empForm;
  private formBuilder = new FormBuilder();
  public disable = false ;

  public employeeValidationMessage = {
    name : [
      { type: 'required', message: 'Name is required' }
    ],
    tableEmployeeEmailAddress : [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter a valid email' }
    ],
    tableEmployeeDOB : [
      { type: 'required', message: 'Date of birth is required' },
    ],
    tableEmployeeDOJ : [
      { type: 'required', message: 'Date of joining is required' },
    ],
    tableEmployeeSalary : [
      { type: 'required', message: 'Salary is required' },
    ],
    tableEmployeeRole : [
      { type: 'required', message: 'Role is required' },
    ],
  };

  constructor(
    public dialogRef: MatDialogRef<EmployeesdialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private employeesService: EmployeesService, private roleService: RoleService,
    private snackBar: MatSnackBar) {
    this.empdata = data.empldata;
    this.action = data.act;
  }
  private _initForm() {
    this.empForm = this.formBuilder.group({
      name: new FormControl({value: '', disabled: this.disable}, Validators.required),
      tableEmployeeEmailAddress: new FormControl({value: '', disabled: this.disable}, Validators.compose([
        Validators.required,
        Validators.email
      ])),
      tableEmployeeDOB: new FormControl({value: '', disabled: this.disable}, Validators.required),
      tableEmployeeDOJ: new FormControl({value: '', disabled: this.disable}, Validators.required),
      tableEmployeeSalary: new FormControl({value: '', disabled: this.disable},
      Validators.compose([
        Validators.required,
      ])),
      tableEmployeeRole: new FormControl({value: '', disabled: this.disable}, Validators.required),
      tableEmployeeGender: new FormControl({value: '', disabled: this.disable}),
    });
  }
  ngOnInit() {
    if (this.action === 'View') {
      this.disable = true;
    }
    this._initForm();
    this.empdata.tableEmployeeGender = 'male';
    this.roleService.fetchRoles().subscribe((res: RoleInterface) => {
      this.roleData = res;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  postForm() {
    if (this.empdata.idtableEmployeeId) {
      this.employeesService.updateEmployees(this.empdata.idtableEmployeeId, this.empdata).subscribe(data => {this.responseData = data;
      if (this.responseData) {
            this.empdata = this.responseData;
            this.dialogRef.close();
          }
        },
        error => {
          const errorMessage = <any> error;
          if (errorMessage.error) {
            this.snackBar.open(errorMessage.error.errorMessage, 'Close', {
              verticalPosition: 'bottom',
              horizontalPosition: 'end'
            });
          }
        }
      );
    } else {
      console.log('startr');
      this.employeesService.createEmployee(this.empdata).subscribe(data => {this.responseData = data;
                                                                            if (this.responseData) {
            this.empdata = this.responseData;
            this.dialogRef.close();
          }
        },
        error => {
          const errorMessage = <any> error;
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
}

