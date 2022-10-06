// const { merge } = require('webpack-merge')
// const commonConfig = require('./webpack.common.js')

// module.exports = (envVars) => {
//   const { env } = envVars
//   const envConfig = require(`./webpack.${env}.js`)
//   const config = merge(commonConfig, envConfig)
//   return config
// }

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'), // sets the entry point for the app
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // resolves files of these types so the suffix doesn't need to be included when importing into other files/components -- starts with .tsx and works to the right
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/, // uses babel-loader when compiling .tsx, .ts, .jsx, .js files, and excludes everything in the installed third-party libraries (node_modules)
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // need to install style-loader and css-loader for .css files to work
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './dist'), // outputs the build file as bundle.js to the dist directory
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
  ],
  stats: 'errors-only',
  mode: 'development',
}