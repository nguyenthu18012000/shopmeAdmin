import { isPlatformBrowser } from '@angular/common';
import { CanActivate, Router } from '@angular/router';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

import { AuthCoreService } from '../services/auth-core.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  private platformId = inject(PLATFORM_ID);
  canActivate(): boolean {
    const token = isPlatformBrowser(this.platformId)
      ? AuthCoreService.getAccessToken()
      : '';

    if (token) {
      return true; // Cho phép truy cập
    }

    this.router.navigate(['/login']); // Điều hướng về trang đăng nhập nếu không có token hoặc token đã hết hạn
    return false; // Không cho phép truy cập
  }
}
