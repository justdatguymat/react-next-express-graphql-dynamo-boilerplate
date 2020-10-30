/* eslint-disable prefer-template */

module.exports = {
  sourceMaps: "inline",
  presets: ["@babel/preset-typescript", "@babel/preset-env"],
  plugins: [
    ["source-map-support", {}],
    [
      "@babel/plugin-proposal-decorators",
      {
        //decoratorsBeforeExport: true,
        legacy: true,
      },
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true,
      },
    ],
    ["@babel/plugin-transform-modules-commonjs", {}],
    "@babel/plugin-transform-runtime",
    "babel-plugin-transform-typescript-metadata",
    [
      "module-resolver",
      {
        alias: {
          "@app": "./src/app",
          "@config": "./src/config",
          "@dynamodb": "./src/dynamodb",
          "@graphql": "./src/graphql",
          "@logger": "./src/logger",
          "@manager": "./src/manager",
          "@middleware": "./src/middleware",
          "@models": "./src/models",
          "@resolvers": "./src/resolvers",
          "@routes": "./src/routes",
          "@server": "./src/server",
          "@types": "./src/types",
          "@utils": "./src/utils",
        },
      },
    ],
  ],
};
