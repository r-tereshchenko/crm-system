import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';
import { MaterialService, toastStatus } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup

  // Subscriptions
  authLoginSub: Subscription

  constructor(
    private authS: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4)
      ])
    })

    this.route.queryParams.subscribe((params) => {
      if (params['registered']) {
        MaterialService.toast(
          'Your acc has been successfully registered, please login using your registered data',
          {class: 'success'}
        )
      } else if (params['accessDenied']) {
        MaterialService.toast(
          'Access denied, please authorize the system',
          {class: 'danger'}
        )
      } else if (params['sessionExpired']) {
        MaterialService.toast(
          'Token has been expired, please log in again',
          {class: 'warning'}
        )
      }
    })
  }

  // Getters for form controls
  public get emailControl(): AbstractControl {
    return this.form.get('email')
  }

  public get passwordControl(): AbstractControl {
    return this.form.get('password')
  }

  submitForm(): void {
    this.form.disable();

    this.authLoginSub = this.authS.login(this.form.value).subscribe(
      response => {
        this.router.navigate(['/overview'])
      },
      error => {
        console.log('Error login: ', error)
        this.form.enable()
        if (error.status === 504) {
          MaterialService.toast(error.message, {class: 'warning'})
        } else {
          MaterialService.toast(error.error.message, {class: 'warning'})
        }
      }
      )
  }

  ngOnDestroy(): void {
    if (this.authLoginSub) {
      this.authLoginSub.unsubscribe()
      this.authLoginSub = null;
    }
  }
}
