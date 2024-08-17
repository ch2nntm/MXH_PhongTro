import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStoreService } from '../token-store/token-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private tokenStorageService: TokenStoreService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const currentUser = this.tokenStorageService.getUser();

    if (currentUser) {
      const requiredRoles: string[] = route.data['roles'] || [];

      if (requiredRoles.length === 0 || requiredRoles.includes(currentUser.roles)) {
        return true;
      }
      this.router.navigate(['']);
      return false;
    }
    this.router.navigate(['']);
    return false;
  }
}