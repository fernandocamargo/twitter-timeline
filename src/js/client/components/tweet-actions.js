import React, {Component, PropTypes} from 'react'

export default class TweetActions extends Component {
  static propTypes = {}

  render () {
    const {tweet} = this.props
    const retweets = (tweet.retweet_count || '')
    const likes = (tweet.favorite_count || '')
    return <nav className="navigation actions">
      <small className="title">Opções:</small>
      <ul className="collection">
        <li className="item reply">
          <a href="" title="Responder" className="anchor">
            <span className="fragment label">Responder</span>
          </a>
        </li>
        <li className="item retweet">
          <a href="" title="Retweetar" className="anchor">
            <span className="fragment label">Retweetar</span>
            <span className="fragment separator"> (</span>
            <span className="fragment counter">{retweets}</span>
            <span className="fragment separator">)</span>
          </a>
        </li>
        <li className="item like">
          <a href="" title="Curtir" className="anchor">
            <span className="fragment label">Curtir</span>
            <span className="fragment separator"> (</span>
            <span className="fragment counter">{likes}</span>
            <span className="fragment separator">)</span>
          </a>
        </li>
        <li className="item more">
          <a href="" title="Mais" className="anchor">
            <span className="fragment label">Mais</span>
          </a>
          <ul className="collection">
            <li className="item share">
              <a href="" title="Compartilhar por Mensagem Direta" className="anchor">
                <span className="label">Compartilhar por Mensagem Direta</span>
              </a>
            </li>
            <li className="item copy">
              <a href="" title="Copiar link para o Tweet" className="anchor">
                <span className="label">Copiar link para o Tweet</span>
              </a>
            </li>
            <li className="item incorporate">
              <a href="" title="Incorporar Tweet" className="anchor">
                <span className="label">Incorporar Tweet</span>
              </a>
            </li>
            <li className="item mute">
              <a href="" title="Silenciar" className="anchor">
                <span className="label">Silenciar</span>
              </a>
            </li>
            <li className="item block">
              <a href="" title="Bloquear" className="anchor">
                <span className="label">Bloquear</span>
              </a>
            </li>
            <li className="item report">
              <a href="" title="Denunciar" className="anchor">
                <span className="label">Denunciar</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  }
}
