import shuffle from 'lodash/shuffle'
import head from 'lodash/head'
import last from 'lodash/last'
import get from 'lodash/get'
import sample from 'lodash/sample'
import moment from 'moment'
import {toJSON} from '../utils/requests'
import * as actions from '../constants/twitter'
import * as Data from '../../data/twitter'
import {
  getUsername,
  getURL,
  getBanner,
  getProfileImage,
  getDateFormat,
  getTweetLink
} from '../utils/twitter'

export const setLoadingStatus = (type, status) => {
  const types = {
    profile: 'SET_TWITTER_PROFILE_LOADING_STATUS',
    followers: 'SET_TWITTER_FOLLOWERS_LOADING_STATUS',
    media: 'SET_TWITTER_MEDIA_LOADING_STATUS',
    suggestions: 'SET_TWITTER_SUGGESTIONS_LOADING_STATUS',
    trends: 'SET_TWITTER_TRENDS_LOADING_STATUS',
    tweets: 'SET_TWITTER_TWEETS_LOADING_STATUS'
  }
  return {
    type: actions[types[type]],
    status
  }
}

export const receive = function (data) {
  const types = {
    profile: 'SET_TWITTER_PROFILE',
    followers: 'SET_TWITTER_FOLLOWERS',
    media: 'SET_TWITTER_MEDIA',
    suggestions: 'SET_TWITTER_SUGGESTIONS',
    trends: 'SET_TWITTER_TRENDS',
    tweets: 'SET_TWITTER_TWEETS'
  }
  return {
    type: actions[types[this]],
    data
  }
}

export const formatProfile = (user) => {
  const dateFormat = getDateFormat()
  return Object.assign(user, {
    username: getUsername(user.screen_name),
    'banner-url': getBanner(user.profile_banner_url),
    'profile-image-url': getProfileImage(user.profile_image_url),
    'twitter-url': getURL(user.screen_name),
    'created-at': moment(user.created_at, dateFormat, 'en-us').utc()
  })
}

export const formatFollower = (user) => {
  return Object.assign(user, {
    'twitter-url': getURL(user.screen_name),
  })
}

export const formatFollowers = (data) => {
  const users = shuffle((data.users || []).map(formatFollower))
  return Object.assign(data, {users})
}

export const filterMedia = (item) => {
  const type = get(item, 'extended_entities.media.0.type')
  return (type === 'photo')
}

export const formatMedia = function (data) {
  const quantity = 6
  const attempts = 10
  const context = (this || {})
  const username = (context.username || '')
  const retries = (context.retries || 0)
  const stack = (context.stack || [])
  const retry = !!retries
  const media = (stack).concat(data || []).filter(filterMedia)
  const enough = ((media.length >= quantity) || (retries >= attempts))
  const meta = (data.search_metadata || {})
  const max = (last(data) || {})
  const id = (max.id || '')
  return (enough ? media : Data
    .getMedia(username, id)
    .then(toJSON)
    .then(formatMedia.bind({
      username,
      stack: media,
      retries: (retries + 1)
    }))
  )
}

export const formatTweetsAuthor = (tweet) => {
  const dateFormat = getDateFormat()
  const user = formatProfile(tweet.user)
  return Object.assign(tweet, {
    user,
    'created-at': moment(tweet.created_at, dateFormat, 'en-us').utc(),
    'tweet-url': getTweetLink(tweet.id_str)
  })
}

export const formatTweets = function (data) {
  const quantity = 20
  const attempts = 10
  const context = (this || {})
  const username = (context.username || '')
  const retries = (context.retries || 0)
  const stack = (context.stack || [])
  const retry = !!retries
  const tweets = (stack).concat((data || []).map(formatTweetsAuthor))
  const enough = ((tweets.length >= quantity) || (retries >= attempts))
  const meta = (data.search_metadata || {})
  const max = (last(data) || {})
  const id = (max.id || '')
  return (enough ? tweets : Data
    .getTweets(username, id)
    .then(toJSON)
    .then(formatTweets.bind({
      username,
      stack: tweets,
      retries: (retries + 1)
    }))
  )
  return data
}

export const formatSuggestions = (data) => {
  const users = shuffle((data.users || []).map(formatProfile))
  return Object.assign(data, {users})
}

export const getSuggestionsByTopic = (topics) => {
  return Data.getSuggestionsByTopic(sample(topics).slug)
}

export const getSuggestions = () => {
  return Data
    .getSuggestionsTopics()
    .then(toJSON)
    .then(getSuggestionsByTopic)
}

export const formatTrends = (data) => {
  return head(data)
}

export const dispatchLoadingStatus = function (type) {
  return this(setLoadingStatus(type, false))
}

export const dispatchFetchResponse = function (handler, data) {
  return this(handler(data))
}

export const fetch = function (type, dispatch) {
  const context = {username: this}
  const providers = {
    profile: {get: Data.getProfile, format: formatProfile},
    followers: {get: Data.getFollowers, format: formatFollowers},
    media: {get: Data.getMedia, format: formatMedia},
    suggestions: {get: getSuggestions, format: formatSuggestions},
    trends: {get: Data.getTrends, format: formatTrends},
    tweets: {get: Data.getTweets, format: formatTweets}
  }
  const provider = providers[type]
  dispatch(setLoadingStatus(type, true))
  return provider
    .get(this)
    .then(toJSON)
    .then(provider.format.bind(context))
    .then(dispatchFetchResponse.bind(dispatch, receive.bind(type)))
    .then(dispatchLoadingStatus.bind(dispatch, type))
}

export const shouldFetch = (type, state) => {
  const {twitter} = state
  const loading = twitter.getIn(['loading', type])
  const profile = twitter.get(type)
  return (!loading && !profile)
}

export const retrieve = function (username, dispatch, getState) {
  const state = getState()
  const cached = !shouldFetch(this, state)
  return (!cached ? dispatch(fetch.bind(username, this)) : state)
}
