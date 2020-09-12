/**
 * Used for converting stringified HTML into
 * rendered HTML
 */
import React from "react"

const HTML = props => {
  function createMarkup() {
    return { __html: props.body }
  }
  return <div dangerouslySetInnerHTML={createMarkup()} />
}

export default HTML
