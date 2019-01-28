const env = require('./env.js')

module.exports= {
    presets: ["next/babel"],
    plugins: ["styled-components"],
    plugins: [['transform-define', env]]
  }
