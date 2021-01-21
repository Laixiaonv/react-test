
/** @type {import('webpack').Configuration} */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RemoveCommentsPlugin = require('./remove-comments-plugin');
const path = require('path')

const config = {
  // parser: 'postcss-scss',
  mode: 'development',
  entry: './src/index.js',
  output: {
    // chunkhash hash的区别：hash是所有输出文件共用一个hash，chunkhash是不同文件是不同的hash，可以用这个做缓存
    // 是入口文件的输出名字  hash:4 加4位的哈希值
    filename: '[name].[hash:4].bundle.js',
    // 输出绝对路径
    path: path.resolve(__dirname, './dist'),
  },
  // devtool: 'source-map', // source map 设置
  module: {
    rules: [
      {
        // .js 或者 .jsx格式的文件都会使用下面配置的loader去解析
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          // 使用babel-loader解析
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              // 支持react ES6语法
              // presets: ['react', 'es2015'],
              plugins: [
                "@babel/plugin-proposal-class-properties"
                // 3) react-hot-loader for HMR
                // 'react-hot-loader/babel',
                // // 支持class属性
                // 'transform-class-properties'
              ]
            }
          }
        ]
      },
      {
        // .scss或.css文件使用下面的loader
        test: /\.(scss|css)$/,
        // loader使用顺序，postcss-loader --> sass-loader  --> css-loader --> style-loader
        // 执行顺序从右向左
        use: ['style-loader', 'css-loader', 'sass-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: [require('autoprefixer')]
          }
        }]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new RemoveCommentsPlugin(),
  ]
}

module.exports = config