const formatter = new Intl.NumberFormat('ru-Ru', {currency:'RUB',style: 'currency'})
export function priceFormatter(value){
  return formatter.format(value)
}