const HtmlWebpackPlugin = require('html-webpack-plugin'); // ，將 bundle 好的 <script> 插入到 body
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

const rootPath = path.join(__dirname, '..');
const appPath = path.join(rootPath, 'client');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: path.join(appPath, 'index.html'),
    filename: 'index.html',
    inject: 'body',
});

module.exports = {
    devtool: 'eval-source-map', // 生产环境应该去掉，否则打包文件会很大
    entry: [ // 项目入口
        path.join(appPath, 'index.js'),
    ],
    output: { // 项目产出
        path: path.join(rootPath, 'dist'),
        filename: 'js/index.bundle.js', // 主入口的文件名
        chunkFilename: "js/[name].chunk.js", // 非主入口的文件名
    },
    module: {
    	// rules 放要使用的 loaders
        rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              include: appPath,
              loader: 'happypack/loader?id=happyBabel',
          },
          {
              test: /\.css$/,
              use:[
                  "style-loader",
                  MiniCssExtractPlugin.loader,
                  "happyPack/loader?id=happyCss",
                  "postcss-loader"
              ], // 注意顺序
          },
          {
              test: /\.less$/,
              use:[
                  "style-loader",
                  MiniCssExtractPlugin.loader,
                  "happyPack/loader?id=happyCss",
                  "postcss-loader",
                  "happyPack/loader?id=happyLess"
              ],
          },
          {
              test: /.(gif|jpg|png$)/,
              use: [{
                  loader: 'file-loader',
                  query: {
                      name: 'images/[name]-[hash:8].[ext]',
                      publicPath: '../', // 发布地址
                  }
              }]
          },
          {
              test: /\.(eot|woff2?|ttf|svg)$/,     
              use: [{            
                  loader: "url-loader",            
                  options: {              
                      name: "[name]-[hash:5].min.[ext]",              
                      limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                      publicPath: "../fonts",              
                      outputPath: "fonts/"
                  }
              }]
          }
        ],
    },
    // 定义变量
    resolve: {
        extensions: ['.js','.jsx','.less','.css'],
        alias: {
            components: path.join(appPath, 'components'),
            pages: path.join(appPath, 'pages'),
            actions: path.join(appPath, 'actions'),
            reducers: path.join(appPath, 'reducers'),
            containers: path.join(appPath, 'containers'),
            constants: path.join(appPath, 'constants'),
            routes: path.join(appPath, 'routes'),
            utils: path.join(appPath, 'utils'),
            plugins: path.join(appPath, 'plugins'),
        }    
    },
    // webpack-dev-server 
    devServer: {
        inline: true,
        port: 8008,
        proxy: {
            // 凡是 `/` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
            '/': {
                  target: 'http://localhost:3000',
                  changeOrigin: true,
                  pathRewrite: {
                    //  '^/api': ''
                  },
                  secure: false,
            }
        },
    },
    // plugins 放置所使用的插件
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].[chunkhash:8].css",
            chunkFilename: "css/[name].css"
        }),
        new WebpackParallelUglifyPlugin({
            uglifyJS: {
                output: {
                    beautify: false, //不需要格式化
                    comments: false //不保留注释
                },
                compress: {
                    warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
                    drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                    collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                    reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
                }
            }
        }),
        new CompressionPlugin({ // 将静态资源压缩，并生成.gz文件
            filename:  '[path].gz[query]',
            algorithm:  'gzip',
            test:  /\.js$|\.css$|\.html$/
        }),
        new HappyPack({
            id: 'happyBabel', // 用id来标识 happypack处理那里类文件
            loaders: [{ // 如何处理  用法和loader 的配置一样
              loader: 'babel-loader',
              query: {
                  cacheDirectory:  true,
                  plugins: [                                             
                      ["import", {libraryName: "antd", style: "css"}]   //需要配置的地方
                  ]                                                    
              }
            }],
            cache: true, // 缓存加载器
            threadPool: happyThreadPool, // 共享进程池
            verbose: true, // 允许 HappyPack 输出日志
        }),
        new HappyPack({
            id: 'happyCss', // 用id来标识 happypack处理那里类文件
            loaders: [{ // 如何处理  用法和loader 的配置一样
              loader: 'css-loader',
            }],
            cache: true, // 缓存加载器
            threadPool: happyThreadPool, // 共享进程池
            verbose: true, // 允许 HappyPack 输出日志
        }),
        new HappyPack({
            id: 'happyLess', // 用id来标识 happypack处理那里类文件
            loaders: [{ // 如何处理  用法和loader 的配置一样
              loader: 'less-loader',
            }],
            cache: true, // 缓存加载器
            threadPool: happyThreadPool, // 共享进程池
            verbose: true, // 允许 HappyPack 输出日志
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(rootPath, 'dist', 'manifest.json')),
        }),
        HTMLWebpackPluginConfig,
        new AddAssetHtmlPlugin({  // 在htmlwebpack后插入一个AddAssetHtmlPlugin插件，用于将vendor插入打包后的页面
            filepath: path.join(rootPath, 'dist/js/vendor.dll.js'), 
            includeSourcemap: false 
        })
    ],
};