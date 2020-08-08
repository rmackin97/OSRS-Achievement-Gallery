import { FormGroup } from '@angular/forms';

// custom validator to check that a control name value is equal to its initial value (case insensitive)
export function editUsername(controlName: string, username: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];

        // set error on control if validation fails (usernames not equal -- case insensitive)
        if (control.value.toLowerCase() !== username.toLowerCase()) {
            control.setErrors({ editUsername: true });
        } else {
            control.setErrors(null);
        }
    }
}