import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ManagerService } from '@services/manager.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup

  nameRegex: string = "^[a-zA-Z ]+$";
  emailRegex: string = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
  passwordRegex: string = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{5,20}$"

  maxDate: Date = new Date()

  constructor(private formBuilder: FormBuilder, private managerService: ManagerService,
    private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {

    this.signUpForm = this.formBuilder.group({

      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailRegex)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordRegex)]),
      firstName: new FormControl(null, [Validators.required, Validators.pattern(this.nameRegex), Validators.maxLength(30)]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern(this.nameRegex), Validators.maxLength(30)]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      address: new FormControl(null, [Validators.required, Validators.maxLength(200)])

    })

  }

  submit() {
    if (this.signUpForm.valid) {

      this.managerService.signup(this.signUpForm.value).subscribe(
        res => {
          if (res.code == 201) {
            this.openSnackBar("Manager added successfully")
            this.router.navigateByUrl('/login')
          } else if (res.error) {
            if (res.code == 110) {
              this.signUpForm.controls['email'].setErrors({
                "alreadyExists": true
              })
            }
          }
        }
      )
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
    });
  }

}
