export const getSearchLink = () => {
  return '//twitter.com/search-home'
}

export const getHashtagLink = (hashtag) => {
  return `//twitter.com/hashtag/${encodeURIComponent(hashtag)}?src=hash`
}

export const getVerifiedAccountLink = () => {
  return '//twitter.com/help/verified'
}

export const getFindFriendsLink = () => {
  return '//twitter.com/who_to_follow/import'
}

export const getSuggestionsLink = () => {
  return '//twitter.com/who_to_follow/suggestions'
}

export const getMediaLink = (screenname) => {
  return `//twitter.com/${screenname}/media`
}

export const getFollowersyouFollowLink = (screenname) => {
  return `//twitter.com/${screenname}/followers_you_follow`
}

export const getUsername = (screenname) => {
  return `@${screenname}`
}

export const getURL = (screenname) => {
  return `//twitter.com/${screenname}`
}

export const getLikesLink = (screenname) => {
  return `//twitter.com/${screenname}/likes`
}

export const getFollowersLink = (screenname) => {
  return `//twitter.com/${screenname}/followers`
}

export const getFollowingLink = (screenname) => {
  return `//twitter.com/${screenname}/following`
}

export const getRepliesLink = (screenname) => {
  return `//twitter.com/${screenname}/with_replies`
}

export const getTweetLink = (tweet) => {
  return `//twitter.com/americanascom/status/${tweet}`
}

export const getBanner = (url) => {
  return `${url}/1500x500`
}

export const getProfileImage = (url) => {
  return url.replace('normal', '400x400')
}

export const getDateFormat = () => {
  return 'ddd MMM D hh:mm:ss ZZ YYYY'
}

export const getInstitutionalLinks = () => {
  return {
    about: {title: 'Sobre', href: '//twitter.com/about'},
    help: {title: 'Ajuda', href: '//support.twitter.com/'},
    terms: {title: 'Termos', href: '//twitter.com/tos'},
    privacy: {title: 'Privacidade', href: '//twitter.com/privacy'},
    cookies: {
      title: 'Cookies',
      href: '//support.twitter.com/articles/20170514'
    },
    advertising: {
      title: 'Informações de anúncios',
      href: '//support.twitter.com/articles/20170451'
    }
  }
}
