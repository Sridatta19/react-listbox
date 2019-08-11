
import { join } from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const include = join(__dirname, 'src')

export default {
  entry: './src/index',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'DoubleListBox',
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "react-listbox.css"
    })
  ],
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          babelrc: false,
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-react-constant-elements',
            'add-module-exports'
          ]
        },
        include
      },
      {
        test: /\.json$/, loader: 'json', include
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?-autoprefixer!postcss')
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  externals: [
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      }
    },
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }
  ]
}
