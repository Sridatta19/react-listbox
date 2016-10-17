
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
    new ExtractTextPlugin('react-listbox.css')
  ],
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          babelrc: false,
          presets: ['react', 'latest'],
          plugins: [
            'transform-class-properties',
            'transform-react-constant-elements',
            'add-module-exports',
            'transform-react-remove-prop-types',
            'transform-react-constant-elements',
            'transform-react-jsx-self',
            'transform-react-jsx-source'
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
        loader: 'file',
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
