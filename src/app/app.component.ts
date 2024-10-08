import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from '../services/http.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private http: ConfigService) {}

  getaaa() {
    this.http.get();
  }
  title = 'shopmeAdmin';
}
