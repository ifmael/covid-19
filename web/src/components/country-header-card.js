import React from 'react'
import Grid from '@material-ui/core/Grid'
import Flag from './flag'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    'align-items': 'center',
    padding: '1rem'
  }
})

const CountryHeaderCard = ({ name, image }) => {
  const classes = useStyles()
  return (
    <Grid className={classes.root} container spacing={3}>
      <Grid item xs={9}>
        <Typography variant="h5" component="h2" >
          {name}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Flag name={name} image={image} />
      </Grid>
    </Grid>
  )
}

export default CountryHeaderCard
