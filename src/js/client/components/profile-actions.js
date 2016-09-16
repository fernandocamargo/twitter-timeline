import React, {Component, PropTypes} from 'react'

export default class ProfileActions extends Component {
  static propTypes = {}

  render () {
    const {profile} = this.props
    const name = profile.get('name')
    const username = profile.get('username')
    return <nav className="navigation actions">
      <small className="title">Opções:</small>
      <ul className="collection">
        <li className="item mention">
          <a href="" title={`Tweetar para ${username}`} className="anchor">
            <span className="fragment action">Tweetar para </span>
            <span className="fragment username">{name}</span>
          </a>
        </li>
      </ul>
    </nav>
  }
}
