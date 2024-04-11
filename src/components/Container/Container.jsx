import React from 'react'
import Card from '../Card/Card'
import List from '../List/List'
import './Container.scss'

function Container() {
  return (
    <div className='container'>
      <List />
      <Card />
    </div>
  )
}

export default Container