import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { DialogData } from '@models/common';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '@services/employee.service';
import { ConfirmPopupComponent } from 'app/confirm-popup/confirm-popup.component';

@Component({
  selector: 'app-add-update-employee',
  templateUrl: './add-update-employee.component.html',
  styleUrls: ['./add-update-employee.component.css']
})
export class AddUpdateEmployeeComponent implements OnInit {

  employeeForm: FormGroup

  mobileRegex: string = "^[6-9]\\d{9}$";
  nameRegex: string = "^[a-zA-Z ]+$";

  maxDate: Date = new Date()

  showBtn: boolean = true
  showSpinner: boolean

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AddUpdateEmployeeComponent>,
    private formBuilder: FormBuilder, private employeeService: EmployeeService,
    private snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {

    this.employeeForm = this.formBuilder.group({

      mobile: new FormControl(null, [Validators.required, Validators.pattern(this.mobileRegex)]),
      firstName: new FormControl(null, [Validators.required, Validators.pattern(this.nameRegex), Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern(this.nameRegex), Validators.maxLength(30)]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
      city: new FormControl(null, [Validators.required, Validators.maxLength(50)])

    })

    if (this.data.action === "UPDATE") {
      this.getEmployeeDetails()
    }

  }

  submit() {
    if (this.employeeForm.valid) {
      this.showSpinner = true
      this.showBtn = false
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        res => {
          if (res.code == 201) {
            this.openSnackBar("Employee added successfully")
            this.dialogRef.close(res.data)
          } else if (res.error) {
            this.showSpinner = false
            this.showBtn = true
            if (res.code == 110) {
              this.openSnackBar("Mobile number already exist")
              this.employeeForm.controls['mobile'].setErrors({
                "alreadyExists": true
              })
            }
          }
        }
      )
    }
  }

  update() {
    if (this.employeeForm.valid) {

      let dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = false
      dialogConfig.width = '400px'
      dialogConfig.height = '250px'

      const dialogRef = this.dialog.open(ConfirmPopupComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.showSpinner = true
          this.showBtn = false
          this.employeeService.updateEmployee(this.employeeForm.value, this.data.employeeUuid).subscribe(
            res => {
              if (res.code == 200) {
                this.openSnackBar("Employee updated successfully")
                this.dialogRef.close(res.data)
              } else if (res.error) {
                this.showSpinner = false
                this.showBtn = true
                if (res.code == 110) {
                  this.openSnackBar("Mobile number already exist")
                  this.employeeForm.controls['mobile'].setErrors({
                    "alreadyExists": true
                  })
                }
              }
            }
          )
        }
      });


    }
  }

  getEmployeeDetails() {
    this.employeeService.getEmployee(this.data.employeeUuid).subscribe(
      res => {
        if (!res.error) {
          this.employeeForm.patchValue({
            mobile: res.data.mobile,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            dateOfBirth: res.data.dateOfBirth,
            address: res.data.address,
            city: res.data.city,
          })
        }
      }
    )
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
    });
  }

  close() {
    this.dialogRef.close(false)
  }

}
