import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/interfaces';
import { MaterialService } from '../../shared/classes/material.service';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('uploadInput') inputRef: ElementRef
  form: FormGroup
  image: File
  imagePreview: string | ArrayBuffer
  isNewCategory = true
  editingCategory: Category

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesS: CategoriesService
  ) {
  }

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
            this.imagePreview = category.imageSrc
            this.editingCategory = category
            MaterialService.updateTextInputs()
          }
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.message)
        }
      )
  }

  get categoryNameControl(): AbstractControl {
    return this.form.get('categoryName')
  }

  triggerUploadInput(): void {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0]
    this.image = file

    const reader = new FileReader()
    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  deleteCategory(): void {
    const decision = window.confirm(`Are you sure you want to remove ${this.editingCategory.name} category`)

    if (decision) {
      this.categoriesS.deleteCategory(this.editingCategory._id).subscribe(
        (response) => {
          MaterialService.toast(response.message, {status: 'success'})
        },
        error => {
          MaterialService.toast(error.error.message, {status: 'danger'})
        },
        () => {
          this.router.navigate(['/categories'])
        }
      )
    }
  }

  submitForm(): void {
    this.form.disable()
    let obs$: Observable<Category>
    let toastMessage = ''
    let categoryAction = ''

    if (this.isNewCategory) {
      obs$ = this.categoriesS.createCategory(this.form.value.categoryName, this.image)
      toastMessage = 'Category has been created successfully'
      categoryAction = 'creating'
    } else {
      obs$ = this.categoriesS.updateCategory(this.editingCategory._id, this.form.value.categoryName, this.image || null)
      toastMessage = 'Category has been updated successfully'
      categoryAction = 'editing'
    }

    obs$.subscribe(
      (category) => {
        this.form.enable()
        MaterialService.toast(toastMessage, {status: 'success'})
        if (categoryAction === 'creating') this.form.reset()
      },
      error => {
        this.form.enable()
        MaterialService.toast(error, {status: 'danger'})
      })
  }
}
