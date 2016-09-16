import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {getInstitutionalLinks} from '../utils/twitter'

export default class TrendingTopics extends Component {
  static propTypes = {}

  renderLink (links, link, key) {
    const details = links[link]
    const className = classnames({
      [link]: true,
      item: true
    })
    return <li {...{className, key}}>
      <a href={details.href} target="_blank" title={details.title} className="anchor">{details.title}</a>
    </li>
  }

  renderLinks () {
    const links = getInstitutionalLinks()
    return Object
      .keys(links)
      .map(this.renderLink.bind(this, links))
  }

  render () {
    return <div className="wrapper institutional">
      <h2 className="title">Institucional</h2>
      <p className="paragraph copyrights">© 2016 Twitter</p>
      <nav className="navigation actions">
        <small className="title">Opções:</small>
        <ul className="collection">
          {this.renderLinks()}
        </ul>
      </nav>
    </div>
  }
}
