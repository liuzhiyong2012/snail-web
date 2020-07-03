const path = require('path')
console.log(process.env.VUE_APP_PROXY);
module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    productionSourceMap: false,
    publicPath: './',
    devServer: {
        port: process.env.VUE_APP_PORT,
        proxy: {

            '/jst': {
                target: process.env.VUE_APP_PROXY_JST,
                changeOrigin: true,
                secure: false,

            },
            '/': {
                target: process.env.VUE_APP_PROXY,
                changeOrigin: true,
                secure: false,
            },
        },
        before(app) {
            app.post('/goform/**', (req, res) => {
                res.redirect(req.originalUrl)
            })
        }
    },
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                // path.resolve(__dirname, 'src/assets/style/_variables.scss'),
                // path.resolve(__dirname, 'src/assets/style/_mixins.scss')
            ]
        }
    }
}