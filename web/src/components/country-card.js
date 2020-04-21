import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import CountryHeaderCard from '../components/country-header-card'


const CountryCard = ({ info }) => {
  const { country, infoForLastDate, path } = info
  const useStyles = makeStyles({
    root: {
      minWidth: 275
    }

  })
  const classes = useStyles()

  return (
    <Card className={classes.root} >
      <CountryHeaderCard name={country.name} image={country.fourToThree || country.oneToOne} />
      <CardContent>
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
