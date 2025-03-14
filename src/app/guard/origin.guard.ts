import { CanActivateFn } from '@angular/router';

export const originGuard: CanActivateFn = (route, state) => {
  return true;
};
