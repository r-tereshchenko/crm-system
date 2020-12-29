import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss']
})
export class CategoriesPageComponent implements OnInit {
  categories: Category[] = [];
  categories$: Observable<Category[]>;

  constructor(
    private categoryS: CategoriesService
  ) {
  }

  ngOnInit(): void {
    this.categories$ = this.categoryS.getCategories()
  }

}
