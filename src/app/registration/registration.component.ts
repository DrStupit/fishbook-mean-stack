import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  createForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      isActivated: true,
      cellNo: ''
    });
   }

   addUser(name, surname, email, password, isActivated, cellNo) {
     this.userService.addUser(name, surname, email, password, isActivated, cellNo).subscribe(() => {
       this.router.navigate(['/login']);
     });
   }

  ngOnInit() {
  }

}
