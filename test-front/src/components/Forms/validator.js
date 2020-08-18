
// @flow

import validator from 'validator';

export function isName(fieldName: String, value: String) {
  if (!/^([A-Za-z]{3,}(\s)?)+/.test(value)) {
    return `El ${fieldName} no es valido`;
  }
  return '';
}

export function isEmail(fieldName: String, value: string) {
  if (!validator.isEmail(value)) {
    return `El ${fieldName} no es valido`;
  }
  return '';
}

export function isSecurePassword(fieldName: String, value: string) {
  if (value.match(/[a-z]/g) &&
    value.match(/[A-Z]/g) &&
    value.match(/[0-9]/g) &&
    value.match(/[#$%&*-_!]/g) &&
    value.length >= 8)
    return;
  return `La contraseña no es lo suficientemente segura`;
}

export function isSecurePasswordConfirm(password: String) {
  return function (fieldName: String, value: String) {
    if (password !== value) {
      return `${fieldName}: las contraseñas no coinciden`
    }
    return '';
  }
}
