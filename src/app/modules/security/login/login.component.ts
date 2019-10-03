import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fgValidation: FormGroup;

  constructor(private fb: FormBuilder, 
    private secService: SecurityService,
    private router: Router) {

  }

  ngOnInit() {
    this.fgValidationBuilder();
  }

  fgValidationBuilder() {
    this.fgValidation = this.fb.group({
      username: ['admin@gmail.com', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.email]],
      password: ['1234567890', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]]
    });
  }

  loginEvent(){
    if(this.fgValidation.invalid){
      alert("Invalid data.");
    }else{
      let u = this.fg.username.value;
      let p = this.fg.password.value;
      let user = this.secService.loginUser(u, p);
      if(user != null){
        console.log(user);
        this.router.navigate(['/home']);
      }
    }
  }

  get fg(){
    return this.fgValidation.controls;
  }

}
