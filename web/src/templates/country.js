import React from "react";
import Layout from "../components/layout";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { min, max, addDays, differenceInDays, format, getYear, getMonth, getDate } from "date-fns";
import lineChart from '../charts/line-chart'

const Country = ({pageContext}) => {
  const {name, datesInfo } = pageContext;

  const datesString = Object.keys(datesInfo);
  const dates = datesString.map(date => {
    const [day, month, year] = date.split('-');
    return new Date(`20${year}`, Number(month) - 1 , day)
  });

  const finishDate = max(dates);
  const startDate = min(dates)
  let confirmed = [], deaths = [], recovered = [];
  for(let dateIndex = startDate; differenceInDays(dateIndex, finishDate) !==1 ; dateIndex = addDays(dateIndex, 1)){
    const keyDate = format(dateIndex, 'd-M-yy');

    confirmed.push(datesInfo[keyDate].confirmed)
    deaths.push(datesInfo[keyDate].deaths)
    recovered.push(datesInfo[keyDate].recovered)
  }

  const series = [
    { name: `Confirmed`, data: confirmed },
    { name: `Deaths`, data: deaths },
    { name: `Recovered`, data: recovered },
  ]
  const optionsChart = lineChart(`Country: ${name}`, Date.UTC(getYear(startDate), getMonth(startDate) - 1 ,getDate(startDate) ), (24 * 3600 * 1000), 'lineal', series);


  debugger
  return (
    <Layout>
      <p>Hello {name} </p>
      <HighchartsReact
        highcharts={Highcharts}
        options={optionsChart}
      />
    </Layout>
  );
}

export default Country;
