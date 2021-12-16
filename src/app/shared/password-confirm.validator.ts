import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordValidator {
    static confirmed = (controlName: string, matchingControlName: string) => {
        return (control: AbstractControl): ValidationErrors | null => {
            const input = control.get(controlName);
            const matchingInput = control.get(matchingControlName);

            if (input === null || matchingInput === null) {
                return null;
            }

            if (matchingInput?.errors && !matchingInput.errors['confirmed']) {
                return null;
            }

            if (input.value !== matchingInput.value) {
                matchingInput.setErrors({ confirmed: true });
                return ({ confirmed: true });
            } else {
                matchingInput.setErrors(null);
                return null;
            }
        };
    }
}