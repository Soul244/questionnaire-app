const env = require('./env.js')

module.exports= {
    "presets": ["next/babel"],
    "plugins": ["styled-components", { ssr: true, displayName: true }],
    "plugins": ['transform-define', env],
    "plugins": ["babel-plugin-styled-components"]
}
