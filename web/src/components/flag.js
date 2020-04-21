import React from 'react'
import { imageUrlFor } from '../lib/image-url'

const noPadding = {
  'margin-bottom': '0px'
}

const Flag = ({ name, image }) => (
  image &&
    <img style={noPadding} src={imageUrlFor(image.asset._id)} alt={`Flag img for ${name}`}/>
)

export default Flag
