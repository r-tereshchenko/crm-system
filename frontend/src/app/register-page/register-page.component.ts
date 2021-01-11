import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: FormGroup

  // Subscription
  authRegisterSub: Subscription

  constructor(
    private authS: AuthService,
    private router: Router
  ) { }

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
  }

  // Getters for form controls
  public get emailControl(): AbstractControl {
    return this.form.get('email')
  }

  public get passwordControl(): AbstractControl {
    return this.form.get('password')
  }

  submitForm(): void {
    this.form.disable()
    this.authRegisterSub = this.authS.register(this.form.value)
      .subscribe(
        () => {
          this.router.navigate(['/login'], {
            queryParams: {
              registered: true
            }
          })
        },
        error => {
          MaterialService.toast(error.error.message, {status: 'danger'})
          this.form.enable()
        }
      )
  }

  ngOnDestroy(): void {
    if (this.authRegisterSub) {
      this.authRegisterSub.unsubscribe()
      this.authRegisterSub = null
    }
  }

}
