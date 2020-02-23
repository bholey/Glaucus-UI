import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EmployeesService} from '../../employees.service';
import {RoleService} from '../../../shared/role/role.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-confimation-on-delete',
  templateUrl: './confimation-on-delete.component.html',
  styleUrls: ['./confimation-on-delete.component.css']
})
export class ConfimationOnDeleteComponent implements OnInit {

  module: string;
  id: number;
  responseData: any;
  constructor(
  public dialogRef: MatDialogRef<ConfimationOnDeleteComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,  private employeesService: EmployeesService, private snackBar: MatSnackBar) {
    this.module = data.module;
    this.id = data.id;
}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(id: number) {
    this.employeesService.deleteEmployee(id).subscribe(data => {this.responseData = data
        if (this.responseData) {
          this.dialogRef.close(true);
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
