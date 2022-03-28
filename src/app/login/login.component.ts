import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  userRole = 0;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private userService: UserService,
    public snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000,
      panelClass: ['blue-snackbar'],
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });

    if (this.userService.getToken()) {
      this.isLoggedIn = true;
      this.userRole = this.userService.getUser().role;
    }
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.userService.setToken(res.headers.get('Token'));
        this.userService.setUser(res.body);

        const role = res.body.roleId;
        if (role === 1) {
          this.router.navigate(['/reimb-manager']);
        } else {
          this.router.navigate(['/reimb-employee']);
        }
      },
      error: (err) => {
        this.openSnackBar(err.error);
      },
    });
  }
}
