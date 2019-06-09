import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService) {
       // redirect to home if already logged in
       if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
    }
  }


  ngOnInit() {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      isActivated: true,
      cellNo: ''
    });
  }

  get f() { return this.createForm.controls; }

  loginRedirect() {
    this.router.navigate(['/login']);
  }
  onSubmit() {
    if(this.createForm.invalid) {
      return;
    }

    this.userService.register(this.createForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.router.navigate(['/']);
        }
      )
  }

}
