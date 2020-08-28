import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManagerService } from '@services/manager.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  emailRegex: string = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@"
    + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
  passwordRegex: string = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{5,20}$"

  constructor(private formBuilder: FormBuilder, private managerService: ManagerService,
    private router: Router,private tokenService:TokenService) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({

      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailRegex)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordRegex)])

    })
  }

  submit() {
    if (this.loginForm.valid) {

      this.managerService.login(this.loginForm.value).subscribe(
        res => {
          if (res.code == 200) {
            this.tokenService.setToken(res.data.token)
            this.router.navigateByUrl('/')
          } else if (res.error) {
            if (res.code == 111) {
              this.loginForm.controls['email'].setErrors({
                "notExists": true
              })
            }
          }
        },
        err =>{
          console.log(err)
          if(err.status == 401){
            this.loginForm.controls['email'].setErrors({
              "unauthorized": true
            })
          }
        }
      )
    }
  }

}
