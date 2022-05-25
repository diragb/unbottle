// Packages:
import sanitize from 'sanitize-html'


// Exports:
export default {
  allowedTags: sanitize.defaults.allowedTags.concat([ 'img' ]),
  allowedAttributes: {
    ...sanitize.defaults.allowedAttributes,
    a: sanitize.defaults.allowedAttributes['a'].concat([ 'style' ])
  }
}
