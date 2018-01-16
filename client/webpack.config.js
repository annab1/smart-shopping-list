// We use path.resolve here as it is preferred to use absolute paths with Webpack.
// If you move your configuration below some directory, you'll need to take this in count.
const path = require("path");
// Generates a HTML file. Note that you can pass a custom template to html-webpack-plugin.
// In our case the default template it uses is just fine for our purposes.
const HtmlWebpackPlugin = require("html-webpack-plugin");
// To create a separate bundle for CSS
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
// in package.json under scripts we call build and start with the TARGET env variable to
// easily control which configuration is used.
const TARGET = process.env.TARGET;
const ROOT_PATH = path.resolve(__dirname);
const AUTOPREFIXER_BROWSERS = [
  //'Android 2.3',
  //'Android >= 4',
  "Chrome >= 45",
  "Firefox >= 44"
  //'Explorer >= 8',
  //'iOS >= 6',
  //'Opera >= 12',
  //'Safari >= 6'
];
const APP_VER = 1;

if (TARGET === "production") {
  module.exports = {
    // This jsx file is the entry point for webpack. If recurses through it's import/require
    // statements to load all resources.
    entry: {
      main: path.resolve(ROOT_PATH, "client/src/App.jsx"),
    },
    resolve: {
      extensions: ["", ".js", ".jsx"]
    },
    output: {
      path: path.resolve(ROOT_PATH, "build"),
      filename: "[name].js"
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader")
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
          test: /\.jsx?$/,
          loader: "babel",
          include: path.resolve(ROOT_PATH, "client/src")
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&minetype=application/font-woff"
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&minetype=application/font-woff"
        },
        {
          test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&minetype=application/font-otf"
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&minetype=application/octet-stream"
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file"
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&minetype=image/svg+xml"
        },
        {
          test: /\.png$/,
          loader: "url?mimetype=image/png&limit=8192"
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin("[name]-styles.css"),
      new webpack.DefinePlugin({
        "process.env": {
          // This has effect on the react lib size -
          // React relies on process.env.NODE_ENV based optimizations
          "NODE_ENV": JSON.stringify("production")
        }
      }),
      new HtmlWebpackPlugin({
        title: "Smart Shopping List",
        appversion: APP_VER,
        filename: "main.html",
        template: path.resolve(ROOT_PATH, "main_template.html")
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ],
    postcss: [autoprefixer(AUTOPREFIXER_BROWSERS)]
  };
}

if (TARGET === "dev") {
  const IP = "0.0.0.0";
  const PORT = 8088;
  module.exports = {
    // These will be read by lib/dev_server that runs our local server
    ip: IP,
    port: PORT,
    devtool: "eval",
    // This jsx file is the entry point for webpack. If recurses through it's import/require
    // statements to load all resources.
    // Our entry point is the local server in hot reload mode
    entry: [
      "webpack-dev-server/client?http://" + IP + ":" + PORT,
      "webpack/hot/only-dev-server",
      path.resolve(ROOT_PATH, "src/App.jsx")
    ],
    resolve: {
      extensions: ["", ".js", ".jsx"]
    },
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ["style", "css?", "postcss?", "sass?"]
        },
        {
          test: /\.css$/,
          loaders: ["style", "css?"]
        },
        {
          test: /\.jsx?$/,
          loaders: ["babel"],
          include: path.resolve(ROOT_PATH, "src")
        },
        {
          test: /\.png$/,
          loader: "url?mimetype=image/png&limit=8192"
        },
        {
          test: /\.jpg/,
          loader: "url?mimetype=image/jpg&limit=8192"
        },
        {
          test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&minetype=application/font-woff"
        },
        {
          test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&minetype=application/font-woff"
        },
        {
          test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&minetype=application/font-otf"
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&minetype=application/octet-stream"
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "file"
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url?limit=10000&minetype=image/svg+xml"
        }
      ]
    },
    output: {
      path: __dirname,
      filename: "[name].js",
      publicPath: "/"
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoErrorsPlugin(),
      new HtmlWebpackPlugin({
        title: "Smart Shopping List",
        appversion: APP_VER,
        filename: "index.html",
        template: path.resolve(ROOT_PATH, "main_template.html")
      })
    ],
    postcss: [autoprefixer(AUTOPREFIXER_BROWSERS)]
  };
}
