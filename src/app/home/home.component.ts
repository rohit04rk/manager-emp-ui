import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '@services/employee.service';
import { Employee } from '@models/employee';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { AddUpdateEmployeeComponent } from 'app/add-update-employee/add-update-employee.component';
import { DialogData } from '@models/common';
import { ConfirmPopupComponent } from 'app/confirm-popup/confirm-popup.component';
import { TokenService } from '@services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  employees: Array<Employee>
  showSpinner: boolean = true

  constructor(private employeeService: EmployeeService,
    public dialog: MatDialog, private snackBar: MatSnackBar,
    private token: TokenService, private router: Router) { }

  ngOnInit() {
    this.employeeService.allEmployees().subscribe(
      res => {
        if (!res.error) {
          this.showSpinner = false
          this.employees = res.data
        }
      }
    )
  }

  addEmployee() {

    if (this.token.checkLogin()) {
      let dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false
      dialogConfig.width = '500px'
      dialogConfig.height = '500px'
      let dialogData = new DialogData()
      dialogData.action = "ADD"
      dialogConfig.data = dialogData

      const dialogRef = this.dialog.open(AddUpdateEmployeeComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.employees.push(result)
        }
      });
    } else {
      this.router.navigateByUrl("/login")
      this.openSnackBar("Log in first")
    }

  }

  updateEmployee(employeeUuid: string, index: number) {

    if (this.token.checkLogin()) {
      let dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false
      dialogConfig.width = '500px'
      dialogConfig.height = '500px'
      let dialogData = new DialogData()
      dialogData.action = "UPDATE"
      dialogData.employeeUuid = employeeUuid
      dialogConfig.data = dialogData

      const dialogRef = this.dialog.open(AddUpdateEmployeeComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.employees[index] = result
        }
      });
    } else {
      this.router.navigateByUrl("/login")
      this.openSnackBar("Log in first")
    }
  }

  deleteEmployee(employeeUuid: string, index: number) {

    if (this.token.checkLogin()) {
      let dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false
      dialogConfig.width = '400px'
      dialogConfig.height = '250px'

      const dialogRef = this.dialog.open(ConfirmPopupComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.employees.splice(index, 1)
          this.employeeService.deleteEmployee(employeeUuid).subscribe(
            res => {
              if (!res.error) {
                this.openSnackBar("Employee deleted successfully")
              }
            }
          )
        }
      });
    } else {
      this.router.navigateByUrl("/login")
      this.openSnackBar("Log in first")
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
    });
  }
}
