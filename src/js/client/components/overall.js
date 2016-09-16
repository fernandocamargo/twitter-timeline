import React, {Component, PropTypes} from 'react'
import WhoToFollow from './who-to-follow'
import TrendingTopics from './trending-topics'
import Institutional from './institutional'

export default class Overall extends Component {
  static propTypes = {}

  render () {
    const {profile, suggestions, trends} = this.props
    return <div className="wrapper overall">
      {suggestions && <WhoToFollow {...{suggestions}} />}
      {trends && <TrendingTopics {...{trends}} />}
      <Institutional />
    </div>
  }
}
