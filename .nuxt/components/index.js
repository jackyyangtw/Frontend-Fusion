export { NoScript } from '../..\\node_modules\\@nuxt\\bridge\\dist\\runtime\\head\\components'
export { Link } from '../..\\node_modules\\@nuxt\\bridge\\dist\\runtime\\head\\components'
export { Base } from '../..\\node_modules\\@nuxt\\bridge\\dist\\runtime\\head\\components'
export { Title } from '../..\\node_modules\\@nuxt\\bridge\\dist\\runtime\\head\\components'
export { Meta } from '../..\\node_modules\\@nuxt\\bridge\\dist\\runtime\\head\\components'
export { Style } from '../..\\node_modules\\@nuxt\\bridge\\dist\\runtime\\head\\components'
export { Head } from '../..\\node_modules\\@nuxt\\bridge\\dist\\runtime\\head\\components'
export { Html } from '../..\\node_modules\\@nuxt\\bridge\\dist\\runtime\\head\\components'
export { Body } from '../..\\node_modules\\@nuxt\\bridge\\dist\\runtime\\head\\components'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
