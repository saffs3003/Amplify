import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const allowedRoles = childRoute.data['roles'] as string[];
    const userRole = this.authService.getRole();

    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    if (userRole === 'admin') {
      this.router.navigate(['/admin-dashboard']);
    } else if (userRole === 'user') {
      this.router.navigate(['/user-dashboard']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
}
