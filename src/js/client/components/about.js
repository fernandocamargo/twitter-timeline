import head from 'lodash/head'
import isFunction from 'lodash/isFunction'
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {cloneElementsinArray} from '../utils/components'
import {getVerifiedAccountLink} from '../utils/twitter'

export default class About extends Component {
  static propTypes = {}

  renderVerifiedAcountSeal () {
    const label = 'Conta verificada'
    const url = getVerifiedAccountLink()
    return [
      <span className="fragment"> (</span>,
      <a href={url} target="_blank" title={label} className="anchor">
        <span className="fragment">{label}</span>
      </a>,
      <span className="fragment">)</span>
    ]
  }

  renderName (profile) {
    const name = profile.get('name')
    const twitterUrl = profile.get('twitter-url')
    const verified = profile.get('verified')
    const seal = (verified ? this.renderVerifiedAcountSeal() : [])
    return [
      <a href={twitterUrl} target="_blank" title={name} className="anchor">{name}</a>
    ]
      .concat(seal)
      .map(cloneElementsinArray)
  }

  renderUsername (profile) {
    const username = profile.get('username')
    const twitterUrl = profile.get('twitter-url')
    return <a href={twitterUrl} target="_blank" title={username} className="anchor">{username}</a>
  }

  renderURL (profile) {
    const url = head(profile.get('entities').url.urls)
    return <a href={url.url} target="_blank" title={url.expanded_url} className="anchor">{url.display_url}</a>
  }

  renderJoinDate (profile) {
    const createdAt = profile.get('created-at')
      .locale('pt-br')
      .format('MMMM [de] YYYY')
      .toLowerCase()
    return `Participa desde ${createdAt}`
  }

  renderInfo (infos, info, key) {
    const {profile} = this.props
    const className = classnames({
      definition: true,
      [info]: true
    })
    const defaults = {className, key}
    const details = infos[info]
    const title = details.title
    const value = details.value
    const description = (isFunction(value) ? value.call(this, profile) : value)
    const attributes = Object.assign((details.attributes || {}), defaults)
    return <dl {...attributes}>
      <dt className="title">{title}</dt>
      <dd className="description">{description}</dd>
    </dl>
  }

  renderInfos () {
    const infos = this.getInfos()
    return Object
      .keys(infos)
      .map(this.renderInfo.bind(this, infos))
  }

  getInfos () {
    const {profile} = this.props
    const profileImage = profile.get('profile-image-url')
    return {
      name: {
        title: 'Nome',
        value: this.renderName,
        attributes: {
          style: {backgroundImage: `url(${profileImage})`}
        }
      },
      username: {title: 'Nome de usuário', value: this.renderUsername},
      bio: {title: 'Bio', value: profile.get('description')},
      location: {title: 'Localização', value: profile.get('location')},
      url: {title: 'URL', value: this.renderURL},
      'join-date': {title: 'Data de inscrição', value: this.renderJoinDate}
    }
  }

  renderProfile () {
    const {profile} = this.props
    const banner = profile.get('banner-url')
    const style = {backgroundImage: `url(${banner})`}
    const className = classnames(['wrapper', 'about'])
    return <div {...{className, style}}>
      <h2 className="title">Sobre</h2>
      {this.renderInfos()}
    </div>
  }

  render () {
    const {profile} = this.props
    return (profile && this.renderProfile(profile))
  }
}
