import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public loading: Boolean = false;
  constructor() { }

  show() {
    this.loading = true
  }

  hide() {
    this.loading = false
  }

  isLoading():Boolean {
    return this.loading;
  }
}
