import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/interfaces';
import { MaterialService } from '../../shared/classes/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup
  isNewCategory = true

  constructor(
    private route: ActivatedRoute,
    private categoriesS: CategoriesService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      categoryName: new FormControl(null, Validators.required)
    })

    this.form.disable()
    this.route.params
      .pipe(
        switchMap((params) => {
          if (params['id']) {
            this.isNewCategory = false
            return this.categoriesS.getCategoryById(params['id'])
          }
          return of(null)
        })
      )
      .subscribe(
        (category: Category) => {
          this.form.enable()
          if (category) {
            this.categoryNameControl.patchValue(category.name)
            MaterialService.updateTextInputs()
          }
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        }
      )
  }

  get categoryNameControl() {
    return this.form.get('categoryName')
  }

  submitForm() {

  }
}
