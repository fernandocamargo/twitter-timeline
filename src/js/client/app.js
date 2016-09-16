import React from 'react'
import {render} from 'react-dom'
import Provider from 'react-redux'
import Root from './containers/root'
import configureStore from './store/configure'

const element = document.getElementById('root')
const store = configureStore()

export default render(<Root {...{store}} />, element)
