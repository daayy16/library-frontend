import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent {

  constructor(
      private loadingService: LoadingService,
    ) {
     }

  isLoading() {
    return this.loadingService.isLoading();
  }
}
