import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      username: [''],
      password: [''],
      email: [''],
    });
  }

  register() {
    this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        alert('User registered successfully.');
        this.router.navigate(['login']);
      },
      error: (err) => {
        alert(err.error);
      },
    });
  }
}
