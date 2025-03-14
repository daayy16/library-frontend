import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'library-frontend';
  constructor(private storageService: StorageService){}

  isLogged():boolean {
   if(this.storageService.getSessionStorage('token') != null) {
    return true
   } else {
    return false
   }
  }
}
