import { Injectable } from '@angular/core';

import { LocalStorageConstant } from '../constants/local-storage.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthCoreService {
  constructor() {}

  static setAccessToken(accessToken: string) {
    localStorage.setItem(LocalStorageConstant.ACCESS_TOKEN, accessToken);
  }

  static getAccessToken() {
    const data = localStorage.getItem(LocalStorageConstant.ACCESS_TOKEN);
    return data || null;
  }

  static setRefreshToken(accessToken: string) {
    localStorage.setItem(LocalStorageConstant.REFRESH_TOKEN, accessToken);
  }

  static getRefreshToken() {
    const data = localStorage.getItem(LocalStorageConstant.REFRESH_TOKEN);
    return data || null;
  }
}
