const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'scripts/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
              },
            },
          },
        },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|mp3|aac|mp4|m4a)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[contenthash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      title: 'React-Typescript-Boilerplate',
      minify: 'auto',
      meta: {
        description: '',
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
        'theme-color': '#4285f4',
      },
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: 'styles/[id].css',
      ignoreOrder: false,
    }),
    new FaviconsWebpackPlugin({
      logo: './assets/logo.png',
      mode: 'webapp',
      devMode: 'light',
      cache: true,
      inject: true,
      prefix: 'assets/favicons/',
      favicons: {
        appName: 'React-Typescript-Boilerplate',
        appDescription: 'Boilerplate for React and Typescript',
        developerName: 'NettyDev',
        developerURL: 'https://nettydev.xyz',
        background: '#000',
        theme_color: '#000',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
  ],
}