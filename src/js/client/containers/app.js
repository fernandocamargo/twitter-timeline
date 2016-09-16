import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import * as twitterActions from './../actions/twitter'
import App from './../components/app'

function mapStateToProps (state) {
  const {twitter} = state
  return {
    twitter
  }
}

class AppContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func
  }

  retrieveFromTwitter (username, type) {
    const {dispatch} = this.props
    return dispatch(twitterActions.retrieve.bind(type, username))
  }

  getResources () {
    return [
      'profile',
      'followers',
      'media',
      'suggestions',
      'trends',
      'tweets'
    ]
  }

  getDataFromTwitter (username) {
    return this.getResources()
      .forEach(this.retrieveFromTwitter.bind(this, username))
  }

  getData () {
    const query = (window.location.search.substring(1) || 'americanascom')
    const username = query.trim().toLowerCase()
    this.getDataFromTwitter(username)
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    const {twitter} = this.props
    return <App {...{twitter}} />
  }
}

export default connect(mapStateToProps)(AppContainer)
