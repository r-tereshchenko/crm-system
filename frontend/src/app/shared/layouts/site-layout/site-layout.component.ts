import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements AfterViewInit {
  @ViewChild('floatingButton', {static: false}) floatingButton: ElementRef

  links = [
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Add order'},
    {url: '/categories', name: 'Categories'}
  ]

  constructor(
    private authS: AuthService,
    private router: Router
  ) {}

  logout(event: Event) {
    event.preventDefault()

    this.authS.logout()
    this.router.navigate(['/login'])
  }

  ngAfterViewInit(): void {
    MaterialService.initializeFloatingButton(this.floatingButton)
  }
}
