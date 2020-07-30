const path = require('path');
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
                res.redirect(req.originalUrl);
            });
        }
    },
	lintOnSave: false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                // path.resolve(__dirname, 'src/assets/style/variables.scss'),
                // path.resolve(__dirname, 'src/assets/style/_mixins.scss')
            ]
        }
    },
    // css: {
    //     loaderOptions: {
    //         sass: {
    //             data: `
    //                 @import "~@/variables.scss"
    //             `
    //         }
    //     }
    // }
	chainWebpack: config => {
	    config.module
	      .rule('i18n')
	      .resourceQuery(/blockType=i18n/)
	      .type('javascript/auto')
	      .use('i18n')
	        .loader('@kazupon/vue-i18n-loader')
	        .end();
	  }
};