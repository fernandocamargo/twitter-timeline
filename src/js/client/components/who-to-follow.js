import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import slug from 'slug'
import {getSuggestionsLink, getFindFriendsLink} from '../utils/twitter'

export default class WhoToFollow extends Component {
  static propTypes = {}

  renderSuggestions (item, index) {
    const backgroundImage = `url(${item.profile_image_url})`
    const style = {backgroundImage}
    const className = classnames({
      definition: true,
      [slug(item.screen_name)]: true,
      'verified-account': item.verified
    })
    const seal = (item.verified ? 'Conta verificada:' : '')
    return <dl className={className} style={style} key={index}>
      <dt className="title">
        <a href={item['twitter-url']} target="_blank" title={item.username} className="anchor">
          <span className="fragment name">{item.name}</span>
          <span className="fragment separator">{` (${seal} `}</span>
          <span className="fragment username">{item.username}</span>
          <span className="fragment separator">)</span>
        </a>
      </dt>
      <dd className="description">
        <nav className="navigation actions">
          <small className="title">Opções:</small>
          <ul className="collection">
            <li className="item follow">
              <a href={item['twitter-url']} target="_blank" title="Seguir" className="anchor">Seguir</a>
            </li>
            <li className="item ignore">
              <a href="" title="Ignorar" className="anchor">Ignorar</a>
            </li>
          </ul>
        </nav>
      </dd>
    </dl>
  }

  render () {
    const {profile = {}, suggestions = {}} = this.props
    const users = (suggestions.get('users') || []).slice(0, 3)
    return <div className="wrapper who-to-follow">
      <h2 className="title">Quem seguir</h2>
      <nav className="navigation actions">
        <small className="title">Opções:</small>
        <ul className="collection">
          <li className="item refresh">
            <a href="" title="Atualizar" className="anchor">Atualizar</a>
          </li>
          <li className="item view-all">
            <a href={getSuggestionsLink()} target="_blank" title="Ver todos" className="anchor">Ver todos</a>
          </li>
          <li className="item find-friends">
            <a href={getFindFriendsLink()} target="_blank" title="Encontrar amigos" className="anchor">Encontrar amigos</a>
          </li>
        </ul>
      </nav>
      {users && users.map(this.renderSuggestions.bind(this))}
    </div>
  }
}
