const WebpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')
//const config = require('../webpack.config.js')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config.client')


const compile = (app) => {
    console.log(app)
    if (process.env.NODE_ENV == "development") {
        const compiler = webpack(webpackConfig)
        const middleware = WebpackDevMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
        })
        app.use(middleware)
        app.use(webpackHotMiddleware(compiler))
    }
}

 module.exports =  {compile}