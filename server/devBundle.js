import WebpackDevMiddleware from 'webpack-dev-middleware'
import webpack from 'webpack'
//const config = require('../webpack.config.js')
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.client'


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

 export default compile