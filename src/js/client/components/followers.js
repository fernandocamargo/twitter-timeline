import React, {Component, PropTypes} from 'react'
import {getFollowersyouFollowLink} from '../utils/twitter'

export default class Followers extends Component {
  static propTypes = {}

  renderFollower (item, index) {
    const backgroundImage = `url(${item.profile_image_url})`
    const style = {backgroundImage}
    return <li className="item" style={style} key={index}>
      <a href={item['twitter-url']} target="_blank" title={item.name} className="anchor">{item.name}</a>
    </li>
  }

  render () {
    const {profile = {}, followers = {}} = this.props
    const screenname = profile.get('screen_name')
    const url = getFollowersyouFollowLink(screenname)
    const users = (followers.get('users') || [])
    return <div className="wrapper followers">
      <h2 className="title">Seguidores</h2>
      <p className="paragraph">
        <a href={url} target="_blank" title="Seguidores que talvez você conheça" className="anchor">Seguidores que talvez você conheça</a>
      </p>
      <nav className="navigation">
        <small className="title">Ir para:</small>
        <ul className="collection">
          {users && users.map(this.renderFollower.bind(this))}
        </ul>
      </nav>
    </div>
  }
}
