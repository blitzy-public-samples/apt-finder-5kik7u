// Utility functions for validating user input

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// HUMAN ASSISTANCE NEEDED
// The confidence level for this function is below 0.8. Please review and adjust as necessary.
export const isValidPassword = (password: string): boolean => {
  const minLength = 12;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
};

export const isValidZipCode = (zipCode: string): boolean => {
  const zipCodeRegex = /^\d{5}(-\d{4})?$/;
  return zipCodeRegex.test(zipCode);
};