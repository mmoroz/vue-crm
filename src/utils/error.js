const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'Email не найден!',
  INVALID_PASSWORD: 'Неверный пароль',
  auth: 'Нужно пройти аутентификацию'
}
export function error(code){
  return ERROR_CODES[code] ? ERROR_CODES[code] : 'Неизвестная ошибка'
}