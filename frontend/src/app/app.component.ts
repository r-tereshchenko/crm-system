import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authS: AuthService
  ) {
  }

  ngOnInit(): void {
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken !== null) {
      this.authS.setToken(potentialToken)
    }
  }
}
