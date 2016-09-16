import React from 'react'

export const cloneElementsinArray = (element, key) => {
  return (!!element && React.cloneElement(element, {key}))
}
