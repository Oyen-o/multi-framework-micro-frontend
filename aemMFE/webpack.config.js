const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

    module.exports = {
      output: {
        publicPath: "http://localhost:4205/",
        uniqueName: "aemMFE"
      },
      optimization: {
        // Only needed to bypass a temporary bug
        runtimeChunk: false
      },
      // devServer: {
      //   proxy: {
      //     '/content': 'http://localhost:4502',
      //   },
      // },
      plugins: [
        new ModuleFederationPlugin({
          
            // For remotes (please adjust)
            name: "aemMFE",
            library: { type: "var", name: "aemMFE" },
            filename: "remoteEntry.js",
            exposes: {
              './web-components': './src/bootstrap.ts',
            },        
          
            // For hosts (please adjust)
            /*
            remotes: {
                'mfe1': "mfe1@http://localhost:3000/remoteEntry.js" 
            },
            */

          //  shared: {"@angular/core":{requiredVersion:"12.1.0"}, "@angular/common":{requiredVersion:"12.1.0"}, "@angular/router":{requiredVersion:"12.1.0"}}
          })
      ],
    };
