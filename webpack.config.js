var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.js'
	},
	// externals: {
	// 	'react': 'React',
	// 	'react-dom': 'ReactDOM'
	// },
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			include: path.resolve(__dirname, 'app'),
			query: {
				presets: ['react', 'es2015','stage-0']
			}
		}, {
			test: /\.css$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
				options: {
					importLoaders: 1
						// 处理import进来的css文件？
				}
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: (loader) => [
						require('postcss-import')({
							root: loader.resourcePath
						}),
						// 这个是用来处理import情况的
						require('autoprefixer')(),
						require('cssnano')
						// 这句话用来压缩css
					]
				}
			}]
		}, {
			test: /\.styl$/,
			loader: 'style-loader!css-loader!stylus-loader'
		}, {
			test: /\.less$/,
			use: [{
				loader: 'style-loader'
			}, {
				loader: 'css-loader',
				options: {
					importLoaders: 1
				}
			}, {
				loader: 'postcss-loader',
				options: {
					plugins: (loader) => [
						require('postcss-import')({
							root: loader.resourcePath
						}),
						// 这个是用来处理import情况的
						require('autoprefixer')(),
						require('cssnano')
						// 这句话是用来压缩的
					]
				}
			}, {
				loader: 'less-loader'
			}]
		}]
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html'
		})
	]
}