import React, {Component, PropTypes} from 'react'
import Profile from './profile'
import Timeline from './timeline'
import Overall from './overall'

export default class App extends Component {
  static propTypes = {}

  renderTitle (profile) {
    const username = profile.get('username')
    const twitterUrl = profile.get('twitter-url')
    return <h1 className="title">
      <span className="fragment">Últimos tweets de </span>
      <a href={twitterUrl} title={username} className="anchor">{username}</a>
    </h1>
  }

  render () {
    const {twitter} = this.props
    const profile = twitter.get('profile')
    const followers = twitter.get('followers')
    const media = twitter.get('media')
    const suggestions = twitter.get('suggestions')
    const trends = twitter.get('trends')
    const tweets = twitter.get('tweets')
    return <div className="wrapper app">
      {profile && this.renderTitle(profile)}
      {profile && <Profile {...{profile, followers, media}} />}
      {profile && <Timeline {...{profile, tweets}} />}
      {profile && <Overall {...{profile, suggestions, trends}} />}
    </div>
  }
}
