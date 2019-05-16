
module.exports= {
    "presets": ["next/babel"],
    "plugins": [
        "babel-plugin-styled-components",
        "transform-define",
        [
            "@babel/plugin-proposal-decorators",
            {
              "legacy": true
            }
        ]
    ],
}
