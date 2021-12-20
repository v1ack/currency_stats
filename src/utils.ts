import {CurrencyChartData} from "./types";
import {colorMap, currenciesList} from "./assets/currenciesList";
import {ChartData} from "chart.js";

export function convertTextToDOM(buffer: BufferSource): Document {
    const decoder = new TextDecoder('windows-1251');
    const text = decoder.decode(buffer);
    let parser = new DOMParser();
    return parser.parseFromString(text, "text/xml");
}

export async function currenciesByDate(date: Date): Promise<CurrencyChartData> {
    const date_str = date.toLocaleDateString("en-GB", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"
    })

    return await fetch(`/XML_daily.asp?date_req=${date_str}`)
        .then(r => r.arrayBuffer())
        .then(convertTextToDOM)
        .then(xmlDoc => {
            let list: CurrencyChartData = {x: date}
            // @ts-ignore
            for (let i of xmlDoc.getElementsByTagName('Valute'))
                list[i.getElementsByTagName("CharCode")[0].textContent] = Number(i.getElementsByTagName("Value")[0].textContent.replace(",", "."))
            return list
        })
}

export function convertDataToChart(data: CurrencyChartData[], currencies: string[] = ["USD", "EUR"]): ChartData<"line"> {
    let currenciesSet = new Set(currencies)
    data = data.reverse()
    let basisList = data[0]
    for (let i = 1; i < data.length; i++) {
        // @ts-ignore
        for (let currency in data[i]) {
            if (typeof data[i][currency] !== "number") continue
            data[i][currency] = 1 + ((data[i][currency] as number) - (basisList[currency] as number)) / (basisList[currency] as number)
        }
    }
    for (let currency in basisList) {
        if (typeof basisList[currency] !== "number") continue
        basisList[currency] = 1
    }


    return {
        labels: data.map(value => value["x"].toLocaleDateString()),
        // @ts-ignore
        datasets: currenciesList.map(currency => ({
            label: currency,
            data: data,
            borderColor: colorMap[currency],
            backgroundColor: colorMap[currency],

            hidden: !currenciesSet.has(currency),
            parsing: {
                yAxisKey: currency
            }
        }))
    }
}
