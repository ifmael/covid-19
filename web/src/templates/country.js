import React from "react";
import Layout from "../components/layout";
import { min, max, addDays, differenceInDays, format } from "date-fns";

const Country = ({pageContext}) => {
  const {name, datesInfo } = pageContext;

  const datesString = Object.keys(datesInfo);
  const dates = datesString.map(date => {
    const [day, month, year] = date.split('-');
    return new Date(`20${year}`, Number(month) - 1 , day)
  });

  const finishDate = max(dates);
  let confirmed = [], deaths = [], recovered = [];
  for(let dateIndex = min(dates); differenceInDays(dateIndex, finishDate) !==1 ; dateIndex = addDays(dateIndex, 1)){
    const keyDate = format(dateIndex, 'd-M-yy');

    confirmed.push(datesInfo[keyDate].confirmed)
    deaths.push(datesInfo[keyDate].deaths)
    recovered.push(datesInfo[keyDate].recovered)
  }

  debugger
  return (
    <Layout>
      <p>Hello world </p>
    </Layout>
  );
}

export default Country;
