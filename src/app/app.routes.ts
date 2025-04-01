import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { BooksComponent } from './components/books/books.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { MyBooksComponent } from './components/my-books/my-books.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'books',
    component: BooksComponent
  },
  {
    path: 'my-books',
    component: MyBooksComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
