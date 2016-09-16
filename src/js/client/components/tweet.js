import moment from 'moment'
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import {cloneElementsinArray} from '../utils/components'
import {getURL, getHashtagLink} from '../utils/twitter'
import TweetActions from './tweet-actions'
import TweetMedia from './tweet-media'

export default class Tweet extends Component {
  static propTypes = {}

  getEntitiesReplacements () {
    return {
      media: false.valueOf.bind(false),
      urls: this.renderURL,
      user_mentions: this.renderMention,
      hashtags: this.renderHashtag,
      symbols: this.renderSymbol
    }
  }

  formatEntity (details) {
    const type = this
    return {details, type}
  }

  groupEntities (entities, stack, type) {
    return stack.concat(entities[type].map(this.formatEntity.bind(type)))
  }

  sortEntitiesByIndices (a, b) {
    return (a.details.indices[0] - b.details.indices[0])
  }

  createTweet (reference, entity, index, entities) {
    const {tweet, fragments, pointer} = reference
    const {type, details} = entity
    const {indices} = details
    const last = (index === (entities.length - 1))
    const begin = indices[0]
    const end = indices[1]
    const before = (begin > reference.pointer)
    const after = (last && (end < (tweet.length - 1)))
    const replacements = this.getEntitiesReplacements()
    const replace = (replacements[type] || this.renderRaw).bind(this, details)
    const raw = this.renderRaw.bind(this, details)
    const element = replace(tweet.substring(begin, end))
    return Object.assign(reference, {
      fragments: reference.fragments
        .concat(!before ? [] : raw(tweet.substring(pointer, begin)))
        .concat(!element ? [] : element)
        .concat(!after ? [] : raw(tweet.substring(end, tweet.length))),
      pointer: end
    })
  }

  renderTweet (tweet) {
    const entities = (tweet.entities || {})
    return Object
      .keys(entities)
      .reduce(this.groupEntities.bind(this, entities), [])
      .sort(this.sortEntitiesByIndices.bind(this))
      .reduce(this.createTweet.bind(this), {
        tweet: (tweet.text || ''),
        fragments: [],
        pointer: 0
      })
      .fragments
      .map(cloneElementsinArray)
  }

  renderURL (details, fragment) {
    return <a href={details.url} target="_blank" title={details.expanded_url} className="anchor">{details.display_url}</a>
  }

  renderMention (details, fragment) {
    return <a href={getURL(details.screen_name)} target="_blank" title={details.name} className="anchor">{details.screen_name}</a>
  }

  renderHashtag (details, fragment) {
    return <a href={getHashtagLink(details.text)} target="_blank" title={`#${details.text}`} className="anchor">{details.text}</a>
  }

  renderSymbol (details, fragment) {
    return <u className="fragment">{fragment}</u>
  }

  renderRaw (details, fragment) {
    return <span className="fragment">{fragment}</span>
  }

  render () {
    const {tweet} = this.props
    const {user} = tweet
    const className = classnames({
      article: true,
      tweet: true
    })
    const style = {backgroundImage: `url(${user['profile-image-url']})`}
    const difference = moment().diff(tweet['created-at'], 'days')
    const createdAt = tweet['created-at']
      .locale('pt-br')
      .format('D [de] MMM')
      .toLowerCase()
    const createdAtFull = tweet['created-at']
      .locale('pt-br')
      .format('hh:mm [-] D [de] MMM [de] [de] YYYY')
      .toLowerCase()
    const fromNow = tweet['created-at']
      .locale('pt-br')
      .fromNow('s')
      .toLowerCase()
    const timeAgo = ((difference > 1) ? createdAt : fromNow)
    return <article {...{className, style}}>
      <dl className="definition author">
        <dt className="title">Autor</dt>
        <dd className="description">
          <a href={user['twitter-url']} target="_blank" title={user.username} className="anchor">
            <span className="fragment name">{user.name}</span>
            <span className="fragment separator"> (</span>
            <span className="fragment username">{user.username}</span>
            <span className="fragment separator">)</span>
          </a>
        </dd>
      </dl>
      <dl className="definition date">
        <dt className="title">Data</dt>
        <dd className="description">
          <a href={tweet['tweet-url']} target="_blank" title={user.username} className="anchor">
            <span className="fragment relative">{timeAgo} </span>
            <span className="fragment separator">(</span>
            <span className="fragment absolute">{createdAtFull}</span>
            <span className="fragment separator">)</span>
          </a>
        </dd>
      </dl>
      <blockquote className="quote">
        <span className="fragment">{this.renderTweet(tweet)}</span>
      </blockquote>
      <TweetMedia />
      <TweetActions {...{tweet}} />
    </article>
  }
}
