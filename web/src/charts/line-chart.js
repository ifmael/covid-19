export default (title, pointStart, pointInterval, scale, series ) => {
  return {
    title: {
      text: title
    },

    yAxis: {
      type: scale,
      minorTickInterval: 1,
      title: {
        text: 'Number of people'
      }
    },

    xAxis: {
      accessibility: {
        rangeDescription: 'Date'
      },
      type: 'datetime'
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: pointStart,
        pointInterval: pointInterval
      }
    },

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    },
    series: series,
    rangeSelector: {
      inputPosition: {
        align: 'left'
      }
    }
  }
}
