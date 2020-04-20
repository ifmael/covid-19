import React from 'react'
import { imageUrlFor } from '../lib/image-url'

const Flag = ({ image }) => (
  <img src={imageUrlFor(image.asset._id)} />
)

export default Flag
