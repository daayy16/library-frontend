import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageService } from './services/storage.service';
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'library-frontend';
  isClosed = true;
  constructor(private storageService: StorageService){}

  isLogged():boolean {
   if(this.storageService.getSessionStorage('token') != null) {
    return true
   } else {
    return false
   }
  }
}
