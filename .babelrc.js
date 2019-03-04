
module.exports= {
    "presets": ["next/babel"],
    "plugins": ["styled-components", { ssr: true, displayName: true }],
    "plugins": ['transform-define'],
    "plugins": ["babel-plugin-styled-components"],
    "plugins": [["@babel/plugin-proposal-decorators", { "legacy": true }]]
}
