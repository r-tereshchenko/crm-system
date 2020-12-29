import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Category } from '../interfaces';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService implements OnInit {

  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`/api/category`)
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }

}
