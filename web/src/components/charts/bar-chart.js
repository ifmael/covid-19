import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import barChart from '../../conf/bar-chart'

const BarChart = ({ conf }) => {
  const { title, yTitle, categories, series , specificConf } = conf
  const confLineChart = {
    ...barChart(title, yTitle, categories, series),
    ...specificConf
  }

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        options={confLineChart}
      />
    </>
  )
}

export default BarChart
