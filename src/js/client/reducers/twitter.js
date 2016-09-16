import {fromJS, Map, List} from 'immutable'
import * as actions from '../constants/twitter'

export const initialState = fromJS({
  profile: false,
  followers: false,
  media: false,
  suggestions: false,
  trends: false,
  tweets: false,
  loading: {
    profile: false,
    followers: false,
    media: false,
    suggestions: false,
    trends: false,
    tweets: false
  }
})

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_TWITTER_PROFILE:
      return state.set('profile', Map(action.data))
    case actions.SET_TWITTER_PROFILE_LOADING_STATUS:
      return state.setIn(['loading', 'profile'], action.status)
    case actions.SET_TWITTER_FOLLOWERS:
      return state.set('followers', Map(action.data))
    case actions.SET_TWITTER_FOLLOWERS_LOADING_STATUS:
      return state.setIn(['loading', 'followers'], action.status)
    case actions.SET_TWITTER_MEDIA:
      return state.set('media', List(action.data))
    case actions.SET_TWITTER_MEDIA_LOADING_STATUS:
      return state.setIn(['loading', 'media'], action.status)
    case actions.SET_TWITTER_SUGGESTIONS:
      return state.set('suggestions', Map(action.data))
    case actions.SET_TWITTER_SUGGESTIONS_LOADING_STATUS:
      return state.setIn(['loading', 'suggestions'], action.status)
    case actions.SET_TWITTER_TRENDS:
      return state.set('trends', Map(action.data))
    case actions.SET_TWITTER_TRENDS_LOADING_STATUS:
      return state.setIn(['loading', 'trends'], action.status)
    case actions.SET_TWITTER_TWEETS:
      return state.set('tweets', List(action.data))
    case actions.SET_TWITTER_TWEETS_LOADING_STATUS:
      return state.setIn(['loading', 'tweets'], action.status)
    default:
      return state
  }
}
