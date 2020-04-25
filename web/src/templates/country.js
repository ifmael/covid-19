import React from 'react'
import Layout from '../components/layout'
import LineChart from '../components/charts/line-chart'
import BarChart from '../components/charts/bar-chart'
import { min, max, addDays, differenceInDays, format, getYear, getMonth, getDate } from 'date-fns'

const Country = ({ pageContext }) => {
  const {name, datesInfo } = pageContext

  const datesString = Object.keys(datesInfo)
  const dates = datesString.map(date => {
    const [day, month, year] = date.split('-')
    return new Date(`20${year}`, Number(month) - 1, day)
  })

  const finishDate = max(dates)
  const startDate = min(dates)
  const confirmed = []; const deaths = []; const recovered = []
  const confirmedDay = { name: 'Confirmed', data: [] }
  const deathsDay = { name: 'Deaths', data: [] }
  const recoveredDay = { name: 'Recovered', data: [] }
  const categories = []
  let firstDateWithCases = true
  let previousDate

  for (let dateIndex = startDate; differenceInDays(dateIndex, finishDate) !== 1; dateIndex = addDays(dateIndex, 1)) {
    const keyDate = format(dateIndex, 'd-M-yy')

    confirmed.push(datesInfo[keyDate].confirmed)
    deaths.push(datesInfo[keyDate].deaths)
    recovered.push(datesInfo[keyDate].recovered)

    if (datesInfo[keyDate].confirmed > 0) {
      if (firstDateWithCases) {
        firstDateWithCases = false
        categories.push(keyDate)

        confirmedDay.data.push(datesInfo[keyDate].confirmed)
        deathsDay.data.push(datesInfo[keyDate].deaths)
        recoveredDay.data.push(datesInfo[keyDate].recovered)
        previousDate = keyDate
      } else {
        const newCasesConfirmed = datesInfo[keyDate].confirmed === datesInfo[previousDate].confirmed ? 0 : datesInfo[keyDate].confirmed - datesInfo[previousDate].confirmed
        const newCasesDeaths = datesInfo[keyDate].deaths === datesInfo[previousDate].deaths ? 0 : datesInfo[keyDate].deaths - datesInfo[previousDate].deaths
        const newCasesRecovered = datesInfo[keyDate].recovered === datesInfo[previousDate].recovered ? 0 : datesInfo[keyDate].recovered - datesInfo[previousDate].recovered
        previousDate = keyDate

        categories.push(keyDate)
        confirmedDay.data.push(newCasesConfirmed)
        deathsDay.data.push(newCasesDeaths)
        recoveredDay.data.push(newCasesRecovered)
      }
    }
  }

  const seriesLineChart = [
    { name: 'Confirmed', data: confirmed },
    { name: 'Deaths', data: deaths },
    { name: 'Recovered', data: recovered }
  ]
  const confLineChart = {
    title: `Country: ${name}`,
    pointStart: Date.UTC(getYear(startDate), getMonth(startDate), getDate(startDate)),
    pointInterval: (24 * 3600 * 1000),
    scale: ['lineal', 'logarithmic'],
    series: seriesLineChart
  }

  const confBarChart = {
    title: 'New cases each day',
    yTitle: 'Number of people',
    categories: categories,
    series: [confirmedDay, deathsDay, recoveredDay]
  }

  return (
    <Layout>
      <LineChart conf={confLineChart}/>
      <BarChart conf={confBarChart}/>
    </Layout>
  )
}

export default Country
