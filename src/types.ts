export type CurrencyItemData = {
  name: string
  value: number
  code: string
}

export type CurrencyItem = {
  date: Date
  items: CurrencyItemData[]
}

export type CurrencyChartData = {
  x: Date
  [key: string]: number | Date
}
