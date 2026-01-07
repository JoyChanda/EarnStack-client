/**
 * 📋 FORM VALIDATION UTILITIES
 * Reusable validation functions for consistent error handling
 */

/**
 * Email validation
 */
export const validateEmail = (email) => {
  if (!email || email.trim() === '') {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null; // No error
};

/**
 * Password validation
 * Requirements: min 6 chars, 1 uppercase, 1 lowercase
 */
export const validatePassword = (password) => {
  if (!password || password.trim() === '') {
    return 'Password is required';
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  return null; // No error
};

/**
 * Required field validation
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * URL validation
 */
export const validateURL = (url) => {
  if (!url || url.trim() === '') {
    return 'URL is required';
  }
  
  try {
    new URL(url);
    return null; // Valid URL
  } catch {
    return 'Please enter a valid URL';
  }
};

/**
 * Phone number validation (basic)
 */
export const validatePhone = (phone) => {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }
  
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
    return 'Please enter a valid phone number';
  }
  
  return null;
};

/**
 * Number validation
 */
export const validateNumber = (value, min = null, max = null) => {
  if (value === '' || value === null || value === undefined) {
    return 'This field is required';
  }
  
  const num = Number(value);
  
  if (isNaN(num)) {
    return 'Please enter a valid number';
  }
  
  if (min !== null && num < min) {
    return `Value must be at least ${min}`;
  }
  
  if (max !== null && num > max) {
    return `Value must be at most ${max}`;
  }
  
  return null;
};

/**
 * Min length validation
 */
export const validateMinLength = (value, minLength, fieldName = 'This field') => {
  if (!value) {
    return `${fieldName} is required`;
  }
  
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  
  return null;
};

/**
 * Max length validation
 */
export const validateMaxLength = (value, maxLength, fieldName = 'This field') => {
  if (value && value.length > maxLength) {
    return `${fieldName} must be at most ${maxLength} characters`;
  }
  
  return null;
};

/**
 * Match validation (for password confirmation)
 */
export const validateMatch = (value1, value2, fieldName = 'Passwords') => {
  if (value1 !== value2) {
    return `${fieldName} do not match`;
  }
  
  return null;
};

/**
 * Form validator - validates multiple fields at once
 * @param {Object} values - Form values { fieldName: value }
 * @param {Object} rules - Validation rules { fieldName: validatorFunction }
 * @returns {Object} - Errors object { fieldName: errorMessage }
 */
export const validateForm = (values, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((fieldName) => {
    const validator = rules[fieldName];
    const value = values[fieldName];
    const error = validator(value);
    
    if (error) {
      errors[fieldName] = error;
    }
  });
  
  return errors;
};

/**
 * Check if form has errors
 */
export const hasErrors = (errors) => {
  return Object.keys(errors).length > 0;
};
