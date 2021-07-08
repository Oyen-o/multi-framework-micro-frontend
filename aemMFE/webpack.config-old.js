const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../../tsconfig.base.json'),
  [/* mapped paths to share */]);

module.exports = {
  output: {
    uniqueName: "appOne",
    publicPath: "auto"
  },
  optimization: {
    runtimeChunk: false
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  plugins: [
    new ModuleFederationPlugin({

        // For remotes (please adjust)
        name: "appOne",
        filename: "remoteEntry.js",
        exposes: {
            './Module': './apps/aem-app/ui.frontend/src/app/app.module.ts',
        },

        // For hosts (please adjust)
        // remotes: {
        //     "appTwo": "appTwo@http://localhost:5002/remoteEntry.js",
        //     "shell": "shell@http://localhost:5000/remoteEntry.js",
        // },

        // shared: {
        //   "@angular/core": { singleton: false, strictVersion: false },
        //   "@angular/common": { singleton: false, strictVersion: false },
        //   "@angular/common/http": { singleton: false, strictVersion: false },
        //   ...sharedMappings.getDescriptors()
        // }

    }),
    sharedMappings.getPlugin()
  ],
};
