require("dotenv").config()
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const { DefinePlugin } = require("webpack")

module.exports = {
	entry: { main: "./src/components/index.js" },
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
		publicPath: "",
	},
	mode: "development",
	devServer: {
		static: path.resolve(__dirname, "./dist"),
		compress: true,
		port: 8080,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: "babel-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				loader: "html-loader",
				options: {
					sources: {
						list: ["..."],
					},
				},
			},
			{
				test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
				type: "asset/resource",
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
			},
		],
	},
	plugins: [
		new DefinePlugin({
			"process.env.API_BASE_URL": JSON.stringify(process.env.API_BASE_URL),
			"process.env.USER_TOKEN": JSON.stringify(process.env.USER_TOKEN),
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
	],
	optimization: {
		minimizer: [`...`, new CssMinimizerPlugin()],
	},
}
