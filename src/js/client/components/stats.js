import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import numeral from 'numeral'
import language from 'numeral/languages/pt-br'
import {
  getLikesLink,
  getFollowersLink,
  getFollowingLink
} from '../utils/twitter'

numeral.language('pt-br', language).language('pt-br')

export default class Stats extends Component {
  static propTypes = {}

  renderTweets (profile) {
    const tweets = numeral(profile.get('statuses_count'))
    return <span className="fragment" title={`${tweets.format('0,0')} curtidas`}>{tweets.format('0 a')}</span>
  }

  renderFollowing (profile) {
    const screenname = profile.get('screen_name')
    const following = numeral(profile.get('friends_count'))
    return <a href={getFollowingLink(screenname)} target="_blank" title={`${following} seguindo`} className="anchor">{following.format('0,0')}</a>
  }

  renderFollowers (profile) {
    const screenname = profile.get('screen_name')
    const followers = numeral(profile.get('followers_count'))
    return <a href={getFollowersLink(screenname)} target="_blank" title={`${followers.format('0,0')} Seguidores`} className="anchor">{followers.format('0 a')}</a>
  }

  renderLikes (profile) {
    const screenname = profile.get('screen_name')
    const likes = profile.get('favourites_count')
    return <a href={getLikesLink(screenname)} target="_blank" title={`${likes} Curtidas`} className="anchor">{likes}</a>
  }

  renderInfo (infos, info, key) {
    const {profile} = this.props
    const className = classnames({
      definition: true,
      active: (key === 0),
      [info]: true
    })
    const details = infos[info]
    return <dl {...{className, key}}>
      <dt className="title">{details.title}</dt>
      <dd className="description">{details.value.call(this, profile)}</dd>
    </dl>
  }

  renderInfos () {
    const infos = this.getInfos()
    return Object
      .keys(infos)
      .map(this.renderInfo.bind(this, infos))
  }

  getInfos () {
    return {
      tweets: {title: 'Tweets', value: this.renderTweets},
      following: {title: 'Seguindo', value: this.renderFollowing},
      followers: {title: 'Seguidores', value: this.renderFollowers},
      likes: {title: 'Curtidas', value: this.renderLikes}
    }
  }

  render () {
    return <div className="wrapper stats">
      <h2 className="title">Atividade</h2>
      {this.renderInfos()}
    </div>
  }
}
