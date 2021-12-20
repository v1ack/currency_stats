<script lang="ts" setup>
import { onMounted, ref, watch } from "vue"
import { CurrencyChartData } from "../types"
import { LineChart } from "vue-chart-3"

import { Chart, ChartOptions, registerables } from "chart.js"
import { convertDataToChart } from "../convertDataToChart"
import { currenciesByDate } from "../currenciesByDate"
import { debounce } from "../utils"

Chart.register(...registerables)

const options: ChartOptions<"line"> = {
  plugins: {
    title: {
      display: true,
      text: "Прирост иностранных валют к рублю по данным ЦБРФ",
    },
  },
}

const list = ref<any>([])
const loadFrom = ref<"static" | "api">("static")
const years = ref<number>(3)
const per_year = ref<number>(4)

async function loadData() {
  let datesList: Date[] = []
  const currentDate = new Date()
  let years_ = years.value
  let per_year_v = per_year.value
  for (let i = 0; i < years_ * per_year_v; i++) {
    let date = new Date(
      currentDate.getFullYear() - Math.floor(i / per_year_v),
      10 - ((i % per_year_v) * 12) / per_year_v,
      1
    )
    datesList.push(date)
  }

  let data: CurrencyChartData[]

  if (loadFrom.value === "api") {
    data = await Promise.all(datesList.map((date) => currenciesByDate(date)))
  } else {
    let datesListSet = new Set(datesList.map((i) => i.toDateString()))
    data = await fetch("/currency_stats/list.json").then((r) => r.json())
    data.forEach((i) => (i["x"] = new Date(i["x"])))
    data = data.filter((i) => datesListSet.has(i.x.toDateString()))
  }

  list.value = convertDataToChart(data, ["USD", "EUR"])
}

const debouncedLoadData = debounce(loadData)

watch(years, (newValue, oldValue) => {
  if (newValue > 6 || newValue < 1) years.value = oldValue
  else debouncedLoadData()
})

watch(per_year, (newValue, oldValue) => {
  if (newValue > 12 || newValue < 1) per_year.value = oldValue
  else debouncedLoadData()
})

watch(loadFrom, () => debouncedLoadData())

onMounted(loadData)
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <LineChart :chartData="list" :options="options" />
    </div>
    <div class="panel">
      <div>
        <div>Загрузка данных из</div>
        <label>
          <input
            v-model="loadFrom"
            name="load_from"
            type="radio"
            value="static"
          />
          Сохраненных данных
        </label>
        <label>
          <input v-model="loadFrom" name="load_from" type="radio" value="api" />
          API ЦБ РФ
        </label>
      </div>
      <div class="panel__inputs">
        <label>
          Количество лет:
          <input v-model="years" max="6" min="1" type="number" />
        </label>
        <label>
          Количество значений в год:
          <input v-model="per_year" max="12" min="1" type="number" />
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 300px;
}

.panel__inputs label {
  display: block;
}
</style>
