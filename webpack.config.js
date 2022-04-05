const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const $ = require('jquery');
const webpack = require('webpack');

const config = require('./config')

const fileName = name =>
  path.basename(
    name.charAt(0).toUpperCase() +
      name.slice(1).replace('.ejs', '').replace('-', ' ')
  )
const isDevelopment = process.env.NODE_ENV !== 'production'
const title = 'Tribunal Superior Eleitoral'

const templateFiles = fs
  .readdirSync(config.paths.source)
  .filter(file => path.extname(file).toLowerCase() === '.ejs')
const htmlPluginEntries = templateFiles.map(
  template =>
    new HTMLWebpackPlugin({
      scriptLoading: 'blocking',
      collapseWhitespace: false,
      collapseInlineTagWhitespace: false,
      keepClosingSlash: true,
      conservativeCollapse: true,
      preserveLineBreaks: false,
      removeComments: false,
      removeTagWhitespace: false,
      removeEmptyAttributes: false,
      removeRedundantAttributes: false,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: false,
      inject: true,
      minify: false,
      excludeChunks: ['partials'],
      hash: false,
      title: title,
      templateParameters: {
        myTitle: title,
      },
      subtitle: fileName(template) === 'Index' ? 'Home' : fileName(template),
      filename: `${template.replace('.ejs', '')}.html`,
      template: `ejs-webpack-loader!${config.paths.source}/${template}`,
      favicon: path.resolve(config.paths.source, 'images', 'favicon.ico'),
    })
)

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment && 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  entry: {
    plugins: [
      path.resolve(config.paths.source, 'scripts', 'plugins.ts'),
      path.resolve(config.paths.source, 'scss', 'plugins.scss'),
    ],
    global: [
      path.resolve(config.paths.source, 'scripts', 'global.ts'),
      path.resolve(config.paths.source, 'scss', 'global.scss')
    ],
  },
  output: {
    path: config.paths.output,
    filename: isDevelopment ? 'scripts/[name].js' : 'js/[name].min.js',
    assetModuleFilename: 'assets/[name][ext]'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer: {
    // contentBase: !isDevelopment ? config.paths.output : config.paths.source,
    static: {
      directory: !isDevelopment ? config.paths.output : config.paths.source,
      publicPath: '/',
      watch: true,
    },
    hot: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? 'css/[name].css' : 'css/[name].min.css'
    }),
    new ImageMinimizerPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      minimizerOptions: {
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }]
        ]
      }
    }),
    new CleanWebpackPlugin({
      verbose: true,
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ['**/*', '!stats.json', '*.LICENSE.txt']
    })
  ].concat(htmlPluginEntries)
    // .concat(htmlBeautifyPlugin)
    .filter(Boolean),
  module: {
    rules: [
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel'),
              isDevelopment && new ReactRefreshWebpackPlugin()
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: config.limits.images
          }
        },
        generator: {
          filename: isDevelopment ? '[path][name][ext]' : 'images/[name][ext]'
        }
      },

      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: config.limits.fonts
          }
        },
        generator: {
          filename: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  target: ['web', 'es5']
}
