import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function RoleValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.length === 0)
      return { required: { value: control.value } };
    return null;
  };
}
