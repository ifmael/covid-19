import React, { useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import lineChart from '../conf/line-chart'

const Chart = ({conf}) => {
  const { title, pointStart, pointInterval, scale, series } = conf
  const confLinealChart = lineChart(title, pointStart, pointInterval, scale, series)
  const [startOptionsChart, updateYAxis] = useState(confLinealChart)
  const updateScale = (type) => {
    return {
      ...startOptionsChart,
      yAxis: {
        ...startOptionsChart.yAxis,
        type
      }
    }
  }

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={startOptionsChart}
      />
      { scale.length > 1 &&
        scale.map((itemScale, index) => (
          <button key={index} onClick={() => updateYAxis(updateScale(itemScale)) }>{itemScale} Scale</button>
        ))
      }
    </>
  )
}

export default Chart
