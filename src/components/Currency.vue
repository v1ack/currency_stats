<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {CurrencyChartData} from "../types";
import {convertDataToChart} from "../utils";
import {LineChart} from "vue-chart-3";

import {Chart, ChartOptions, registerables} from "chart.js";

Chart.register(...registerables);

let options: ChartOptions<"line"> = {

  plugins: {
    title: {
      display: true,
      text: "Прирост иностранных валют к рублю по данным ЦБРФ",
    },
  },
}
let loaded = ref<boolean>(false)
let list = ref<any>([])

onMounted(async () => {
  let datesList: Date[] = []
  const currentDate = new Date()
  let years = 3
  let per_year = 4
  for (let i = 0; i < years * per_year; i++) {
    let date = new Date(currentDate.getFullYear() - Math.floor(i / per_year), 10 - i % per_year * 12 / per_year, 1)
    datesList.push(date)
  }

  /**
   * Load data from CB
   */
      // let data = await Promise.all(datesList.map(date => currenciesByDate(date)))

  let data: CurrencyChartData[] = await fetch("/list.json").then(r => r.json())
  data.forEach(i => i["x"] = new Date(i["x"]))
  list.value = convertDataToChart(data, ["USD", "EUR"])
  loaded.value = true
})
</script>

<template>
  <div class="container">
    <LineChart
        v-if="loaded"
        :chartData="list"
        :options="options"
    />
  </div>
</template>
