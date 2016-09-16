import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import slug from 'slug'
import numeral from 'numeral'
import language from 'numeral/languages/pt-br'
import {getSearchLink} from '../utils/twitter'

numeral.language('pt-br', language).language('pt-br')

export default class TrendingTopics extends Component {
  static propTypes = {}

  renderTrend (trend, key) {
    const query = window.decodeURIComponent(trend.query).trim()
    const hashtag = (query.substring(0, 1) === '#')
    const type = (hashtag ? 'hashtag' : 'search')
    const label = (hashtag ? 'Hashtag' : 'Busca')
    const className = classnames({
      definition: true,
      [slug(query)]: true,
      [type]: true
    })
    const volume = numeral(trend.tweet_volume).format('0 a')
    return <dl {...{className, key}}>
      <dt className="title">
        <span className="fragment">{label}: </span>
        <a href={trend.url} target="_blank" title={trend.name} className="anchor">{trend.name}</a>
      </dt>
      <dd className="description">{volume} Tweets</dd>
    </dl>
  }

  renderTrends () {
    const {trends = {}} = this.props
    const topics = (trends.get('trends') || []).slice(0, 10)
    return topics.map(this.renderTrend.bind(this))
  }

  render () {
    return <div className="wrapper trending-topics">
      <h2 className="title">
        <span className="fragment">Assuntos do Momento: </span>
        <span className="fragment">Mundial</span>
      </h2>
      <nav className="navigation actions">
        <small className="title">Opções:</small>
        <ul className="collection">
          <li className="item change">
            <a href={getSearchLink()} target="_blank" title="Alterar" className="anchor">Alterar</a>
          </li>
        </ul>
      </nav>
      {this.renderTrends()}
    </div>
  }
}
