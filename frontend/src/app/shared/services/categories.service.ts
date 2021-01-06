import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Category, Message } from '../interfaces';

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

  createCategory(name: string, image?: File): Observable<Category> {
    const formData = new FormData();

    formData.append('name', name)
    if (image) {
      formData.append('image', image, image.name)
    }

    return this.http.post<Category>('/api/category', formData)
  }

  updateCategory(id: string, name: string, image?: File): Observable<Category> {
    const formData = new FormData();

    formData.append('name', name)
    if (image) {
      formData.append('image', image, image.name)
    }

    return this.http.patch<Category>(`/api/category/${id}`, formData)
  }

  deleteCategory(id: string): Observable<Message> {
    return this.http.delete<Message>(`api/category/${id}`)
  }

}
