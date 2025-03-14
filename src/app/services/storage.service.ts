import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setSessionStorage(name: string, value: string) {
    sessionStorage.setItem(name, value);
  }

  getSessionStorage(name: string) {
    return sessionStorage.getItem(name);
  }

  deleteSession(name: string) {
    return sessionStorage.removeItem(name)
  }
}
