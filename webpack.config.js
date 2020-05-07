const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const defineUrlQrCodeApi = () => {
    switch (process.env.NODE_ENV) {
        case 'production':
            return 'https://demo-qr-code.herokuapp.com/';
        case 'development':
            return 'http://localhost:8081/api/v1/qrcodes';
        default:
            throw Error(`The ${process.env.NODE_ENV} profile unmapped`);
    }
 }

module.exports = {
    entry: './src/index.js', //location of your main js file
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'  // where js files would be bundled to
   },
   devServer: {
        contentBase: './dist' //where contents are served from
   },
   plugins: [
    new HtmlWebpackPlugin({
       filename: 'index.html', // name of html file to be created
       template: './src/index.html' // source from which html file would be created
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'API_QR_CODE_URL': JSON.stringify(defineUrlQrCodeApi())
        }
    })
   ],
   module: {
     rules: [
         {
             test: /\.js$/, //using regex to tell babel exactly what files to transcompile
             exclude: /node_modules/, // files to be ignored
             use: {
                 loader: 'babel-loader' // specify the loader
             } 
         },
         {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
              'css-loader'
            ]
         },
         {
            test: /\.svg$/,
            use: 'file-loader'
         }
     ]
   }
 }
 
 