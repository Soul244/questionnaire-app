
module.exports= {
    "presets": ["next/babel"],
    "plugins": [
        "babel-plugin-styled-components",
        "transform-define",
        ["babel-plugin-root-import", {
            "rootPathPrefix": "~"
        }],
        [
            "@babel/plugin-proposal-decorators",
            {
              "legacy": true
            }
        ]
    ],
}
