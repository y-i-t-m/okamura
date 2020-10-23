const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
require('intersection-observer');

module.exports = {
  mode: "production",
  entry: "./src/js/main.js",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "public")
  },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        exclude: /node_modules\/(?!(dom7|ssr-window|swiper|@fortawesome)\/).*/,
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              presets: [
                // プリセットを指定することで、ES2020 を ES5 に変換
                "@babel/preset-env"
              ],
            },
          },
        ],
      },
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.(scss|css)$/, // 対象となるファイルの拡張子
        use: [
          // CSSファイルを書き出すオプションを有効にする
          {
            loader: miniCssExtractPlugin.loader,
          },
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            }
          },
          {
            loader: "import-glob-loader"
          }
        ],
      },
    ],
  },
  plugins: [
    new miniCssExtractPlugin({
      // ファイル名を設定します
      filename: "style.css",
    }),
    new StylelintPlugin({
      // 自動で修正
      fix: true,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/img', to: 'img' },
        { from: 'src/font', to: 'font' },
      ],
    }),
  ],
};
