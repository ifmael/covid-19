import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Flag from './flag'

const CountryCard = ({ info }) => {
  const { country, infoForLastDate, path } = info
  const useStyles = makeStyles({
    root: {
      minWidth: 275
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    }
  })
  const classes = useStyles()

  return (
    <Card className={classes.root} >
      <CardContent>
        <Typography variant="h5" component="h2" >
          {country.name}
        </Typography>
        { (country.fourToThree || country.oneToOne ) &&
          <Flag image={ country.fourToThree || country.oneToOne } />
        }
        <Typography variant="body2" >
          Confirmed: {infoForLastDate.confirmed}
        </Typography>
        <Typography variant="body2" component="p">
          Recovered: {infoForLastDate.recovered}
        </Typography>
        <Typography variant="body2" component="p">
        Deaths: {infoForLastDate.deaths}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={path}>
          See more
        </Link>
      </CardActions>
    </Card>
  )
}

export default CountryCard
