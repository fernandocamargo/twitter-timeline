import api from './api'
import promise from 'es6-promise'
import fetch from 'isomorphic-fetch'

const root = `${api}/twitter`

promise.polyfill()

export function getProfile (username) {
  return fetch(`${root}/users/show.json?screen_name=${username}`)
}

export function getFollowers (username) {
  return fetch(`${root}/followers/list.json?screen_name=${username}`)
}

export function getMedia (username, max_id = '') {
  const pagination = (!!max_id && `&max_id=${max_id}`)
  return fetch(`${root}/statuses/user_timeline.json?screen_name=${username}&count=100&exclude_replies=true&include_rts=false${pagination}`)
}

export function getSuggestionsTopics (username) {
  return fetch(`${root}/users/suggestions.json`)
}

export function getSuggestionsByTopic (topic) {
  return fetch(`${root}/users/suggestions/${topic}.json`)
}

export function getTrends () {
  return fetch(`${root}/trends/place.json?id=1`)
}

export function getTweets (username, max_id = '') {
  const pagination = (!!max_id && `&max_id=${max_id}`)
  return fetch(`${root}/statuses/user_timeline.json?screen_name=${username}&count=100&exclude_replies=true&include_rts=true${pagination}`)
}

