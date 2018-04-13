'use strict';
var webpack = require('webpack');
var path = require("path");
var autoprefixer=require('autoprefixer');
function p(str){
	let appName=process.env.APP_NAME||'app';
	return str.replace(/__APPNAME__/g,appName);
}
module.exports = {
	entry: {
		'ime': [
			p(path.join(__dirname,'src/app/__APPNAME__/index.js'))
		]
	},
	output:{
		path:p(path.join(__dirname, 'dist')),
		filename:'[name].js',
	},
	resolve: {
		alias: {
			'action': p(path.join(__dirname, 'src/app/__APPNAME__/action/index.js')),
			'reducer': p(path.join(__dirname, 'src/app/__APPNAME__/reducer/index.js')),
			'store': p(path.join(__dirname, 'src/app/__APPNAME__/store/index.js')),
			'view': p(path.join(__dirname, 'src/app/__APPNAME__/view/index.js')),
			'comp': p(path.join(__dirname, 'src/component/index.js')),
			'util': p(path.join(__dirname, 'src/util/index.js')),
			'method': p(path.join(__dirname, 'src/app/__APPNAME__/method/index.js')),
			'ime-react': p(path.join(__dirname, 'src/ime-react/index.js')),
		},
	},
	module: {
		loaders: [
			{
				test: /\.less$/,
				loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!less?outputStyle=expanded&sourceMap'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
				loader: 'url-loader?limit=50000&name=[path][name].[ext]'
			}
		]
	},
	postcss:function(){
		return [autoprefixer];
	},
	externals:{},
	plugins:[
		new webpack.DefinePlugin({
			'process.env.NODE_ENV':JSON.stringify('production')
		})
	]
};
