import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {getURL, getRepliesLink, getMediaLink} from '../utils/twitter'

export default class Filter extends Component {
  static propTypes = {}

  renderFilter (filters, filter, key) {
    const details = filters[filter]
    const active = (key === 0)
    const Children = (active ? 'span' : 'a')
    const defaults = {
      className: (active ? 'fragment' : 'anchor'),
      children: details.title
    }
    const attributes = Object.assign(defaults, (active || {
      href: details.href,
      title: details.title,
      target: '_blank'
    }))
    const className = classnames({
      [filter]: true,
      active: active,
      item: true
    })
    return <li {...{className, key}}>
      <Children {...attributes} />
    </li>
  }

  renderFilters () {
    const filters = this.getFilters()
    return Object
      .keys(filters)
      .map(this.renderFilter.bind(this, filters))
  }

  getFilters () {
    const {profile} = this.props
    const screenname = profile.get('screen_name')
    return {
      tweets: {title: 'Tweets', href: getURL(screenname)},
      replies: {title: 'Tweets e respostas', href: getRepliesLink(screenname)},
      media: {title: 'Mídia', href: getMediaLink(screenname)}
    }
  }

  render () {
    const {profile} = this.props
    const screenname = profile.get('screen_name')
    return <nav className="navigation filter">
      <small className="title">Filtrar por:</small>
      <ul className="collection">
        {this.renderFilters()}
      </ul>
    </nav>
  }
}
