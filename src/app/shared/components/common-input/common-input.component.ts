import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';

import { IRuleValidate } from '../../models/common-input.model';

@Component({
  selector: 'app-common-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './common-input.component.html',
  styleUrl: './common-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommonInputComponent),
      multi: true,
    },
  ],
})
export class CommonInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() inputControl: AbstractControl<any, any> | null = null;
  @Input() ruleValidators: Array<IRuleValidate> = [];

  _value: string = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this._value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this._value = input.value;
    this.onChange(this._value); // Emit giá trị mới ra ngoài
    this.onTouched(); // Đánh dấu input là đã được chạm
  }
}
