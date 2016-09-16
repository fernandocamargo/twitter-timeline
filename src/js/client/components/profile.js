import React, {Component, PropTypes} from 'react'
import About from './about'
import Stats from './stats'
import ProfileActions from './profile-actions'
import Followers from './followers'
import Media from './media'

export default class Profile extends Component {
  static propTypes = {}

  render () {
    const {profile, followers, media} = this.props
    return <div className="wrapper profile">
      <About {...{profile}} />
      <Stats {...{profile}} />
      <ProfileActions {...{profile}} />
      {followers && <Followers {...{profile, followers}} />}
      {media && <Media {...{profile, media}} />}
    </div>
  }
}
