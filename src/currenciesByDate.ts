import { CurrencyChartData } from "./types"
import { convertTextToDOM } from "./utils"

export async function currenciesByDate(date: Date): Promise<CurrencyChartData> {
  const date_str = date.toLocaleDateString("en-GB", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })

  return await fetch(`/XML_daily.asp?date_req=${date_str}`)
    .then((r) => r.arrayBuffer())
    .then(convertTextToDOM)
    .then((xmlDoc) => {
      let list: CurrencyChartData = { x: date }
      // @ts-ignore
      for (let i of xmlDoc.getElementsByTagName("Valute"))
        list[i.getElementsByTagName("CharCode")[0].textContent] = Number(
          i.getElementsByTagName("Value")[0].textContent.replace(",", ".")
        )
      return list
    })
}
