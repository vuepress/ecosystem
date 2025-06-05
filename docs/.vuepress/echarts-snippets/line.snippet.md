::: echarts Dynamic Data & Time Axis

```js
const oneDay = 86400000
const data = []
let now = new Date(1997, 9, 3)
let value = Math.random() * 1000

const randomData = () => {
  now = new Date(now.getTime() + oneDay)
  value = value + Math.random() * 21 - 10

  return {
    name: now.toString(),
    value: [
      [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
      Math.round(value),
    ],
  }
}

for (let i = 0; i < 1000; i++) data.push(randomData())

const option = {
  tooltip: {
    trigger: 'axis',
    formatter: (params) => {
      const item = params[0]
      const date = new Date(item.name)

      return `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} : ${item.value[1]}`
    },
    axisPointer: {
      animation: false,
    },
  },
  xAxis: {
    type: 'time',
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    splitLine: {
      show: false,
    },
  },
  toolbox: {
    show: true,
    feature: {
      mark: {
        show: true,
      },
      dataView: {
        show: true,
        readOnly: false,
      },
      restore: {
        show: true,
      },
      saveAsImage: {
        show: true,
      },
    },
  },
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      showSymbol: false,
      data,
    },
  ],
}
const timeId = setInterval(() => {
  if (echarts._disposed) {
    clearInterval(timeId)
    return
  }

  for (let i = 0; i < 5; i++) {
    data.shift()
    data.push(randomData())
  }
  echarts.setOption({
    series: [{ data }],
  })
}, 1000)
```

:::
