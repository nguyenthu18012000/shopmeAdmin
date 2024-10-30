import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocalStorageConstant {
  static ACCESS_TOKEN = 'access_token';
  static REFRESH_TOKEN = 'refresh_token';
}
