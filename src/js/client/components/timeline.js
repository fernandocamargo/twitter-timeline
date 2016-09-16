import React, {Component, PropTypes} from 'react'
import Filter from './filter'
import Tweet from './tweet'

export default class Timeline extends Component {
  static propTypes = {}

  renderTweet (tweet, key) {
    return <Tweet {...{tweet, key}} />
  }

  render () {
    const {profile, tweets} = this.props
    return <div className="wrapper timeline">
      <h2 className="title">Timeline</h2>
      <Filter {...{profile}} />
      {tweets && tweets.map(this.renderTweet.bind(this))}
    </div>
  }
}
