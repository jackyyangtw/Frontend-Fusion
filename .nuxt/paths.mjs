import { joinURL } from 'ufo'
const appConfig = {"basePath":"/","assetsPath":"/_nuxt/","cdnURL":"","middleware":"log","babel":{"plugins":[["@babel/plugin-proposal-class-properties",{"loose":true}],["@babel/plugin-proposal-private-methods",{"loose":true}],["@babel/plugin-proposal-private-property-in-object",{"loose":true}]]},"postcss":{"postcssOptions":{"plugins":{"tailwindcss":{},"autoprefixer":{}}}},"buildAssetsDir":"/_nuxt/","baseURL":"/"}
export const baseURL = () => appConfig.baseURL
export const buildAssetsDir = () => appConfig.buildAssetsDir
export const buildAssetsURL = (...path) => joinURL(publicAssetsURL(), buildAssetsDir(), ...path)
export const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL
  return path.length ? joinURL(publicBase, ...path) : publicBase
}