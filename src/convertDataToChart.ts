import { CurrencyChartData } from "./types"
import { ChartData } from "chart.js"
import { colorMap, currenciesList } from "./assets/currenciesList"

export function convertDataToChart(
  data: CurrencyChartData[],
  currencies: string[] = ["USD", "EUR"]
): ChartData<"line"> {
  let currenciesSet = new Set(currencies)
  if (data.length < 2) {
    return {
      labels: [],
      // @ts-ignore
      datasets: currenciesList.map((currency) => ({
        label: currency,
        data: { [currency]: 0 },
        borderColor: colorMap[currency],
        backgroundColor: colorMap[currency],

        hidden: !currenciesSet.has(currency),
        parsing: {
          yAxisKey: currency,
        },
      })),
    }
  }
  data = data.reverse()
  let basisList = data[0]
  for (let i = 1; i < data.length; i++) {
    // @ts-ignore
    for (let currency in data[i]) {
      if (typeof data[i][currency] !== "number") continue
      data[i][currency] =
        ((data[i][currency] as number) - (basisList[currency] as number)) /
        (basisList[currency] as number)
    }
  }
  for (let currency in basisList) {
    if (typeof basisList[currency] !== "number") continue
    basisList[currency] = 0
  }

  return {
    labels: data.map((value) => value["x"].toLocaleDateString()),
    // @ts-ignore
    datasets: currenciesList.map((currency) => ({
      label: currency,
      data: data,
      borderColor: colorMap[currency],
      backgroundColor: colorMap[currency],

      hidden: !currenciesSet.has(currency),
      parsing: {
        yAxisKey: currency,
      },
    })),
  }
}
