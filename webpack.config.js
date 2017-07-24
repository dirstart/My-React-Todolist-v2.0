var path = require('path');

module.exports = {
	entry: './app/index.js',
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
			include: path.resolve(__dirname, 'app'),
			query: {
				presets: ['react', 'es2015']
			}
		}, {
			test: /\.css$/,
			loader: 'style-loader!css-loader'
		}]
	}
}