import head from 'lodash/head'
import React, {Component, PropTypes} from 'react'
import {getMediaLink} from '../utils/twitter'

export default class Media extends Component {
  static propTypes = {}

  renderMedia (item, index) {
    const media = head(item.entities.media)
    const backgroundImage = `url(${media.media_url})`
    const style = {backgroundImage}
    return <li className="item" style={style} key={index}>
      <a href={media.expanded_url} target="_blank" title={item.text} className="anchor">{item.text}</a>
    </li>
  }

  render () {
    const {profile = {}, media = []} = this.props
    const screenname = profile.get('screen_name')
    const url = getMediaLink(screenname)
    return <div className="wrapper media">
      <h2 className="title">Mídia</h2>
      <p className="paragraph total">
        <a href={url} target="_blank" title="Fotos e videos" className="anchor">Fotos e videos</a>
      </p>
      <nav className="navigation">
        <small className="title">Ir para:</small>
        <ul className="collection">
          {media && media.map(this.renderMedia.bind(this))}
        </ul>
      </nav>
    </div>
  }
}
