import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService) {

      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
   }

  ngOnInit() {
    this.createForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    if (this.createForm.invalid) {
      return;
    }

    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/activity']);
        },
        error => {
          this.router.navigate(['/']);
        }
      );
  }
}
