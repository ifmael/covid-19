import React from 'react'
import Layout from '../components/layout'
import Chart from '../components/chart'
import { min, max, addDays, differenceInDays, format, getYear, getMonth, getDate } from 'date-fns'

const Country = ({pageContext}) => {
  const {name, datesInfo } = pageContext

  const datesString = Object.keys(datesInfo)
  const dates = datesString.map(date => {
    const [day, month, year] = date.split('-')
    return new Date(`20${year}`, Number(month) - 1, day)
  })

  const finishDate = max(dates)
  const startDate = min(dates)
  const confirmed = []; const deaths = []; const recovered = []
  for (let dateIndex = startDate; differenceInDays(dateIndex, finishDate) !== 1; dateIndex = addDays(dateIndex, 1)) {
    const keyDate = format(dateIndex, 'd-M-yy')
    confirmed.push(datesInfo[keyDate].confirmed)
    deaths.push(datesInfo[keyDate].deaths)
    recovered.push(datesInfo[keyDate].recovered)
  }

  const series = [
    { name: 'Confirmed', data: confirmed },
    { name: 'Deaths', data: deaths },
    { name: 'Recovered', data: recovered }
  ]
  const confLineChart = {
    title: `Country: ${name}`,
    pointStart: Date.UTC(getYear(startDate), getMonth(startDate) - 1, getDate(startDate)),
    pointInterval: (24 * 3600 * 1000),
    scale: ['lineal', 'logarithmic'],
    series
  }

  return (
    <Layout>
      <Chart conf={confLineChart}/>
    </Layout>
  )
}

export default Country
