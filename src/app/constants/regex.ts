import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RegexConstant {
  REGEX_NUMBER_ONLY = /^[0-9]*$/;
}
