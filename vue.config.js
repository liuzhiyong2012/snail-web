const path = require('path');
console.log(process.env.VUE_APP_PROXY);

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');

module.exports = {
    configureWebpack: {
        devtool: 'source-map'
    },
    productionSourceMap: false,
    publicPath: './',
    devServer: {
        port: process.env.VUE_APP_PORT,
        proxy: {
			//项目图片映射  
            '/abusimg': {
              target: process.env.VUE_IMAGE_SERVER,//后端接口地址
              changeOrigin: true,//是否允许跨越
              pathRewrite: {
                '^/abusimg': '',//重写,
              }
            },
			//地图图片映射
            '/mapimg': {
                target: process.env.VUE_MAP_SERVER,
                changeOrigin: true,
                secure: false,
				pathRewrite: {
				  '^/mapimg': '',//重写,
				}
            },
			//接口请求地址映射
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
	css: {
	    loaderOptions: {
	      postcss: {
	        plugins: [
	          autoprefixer({
	            browsers: ['Android >= 4.0', 'iOS >= 7']
	          }),
	          pxtorem({
	            rootValue: 100, //37.5,
	            propList: ['*'],
	          })
	        ]
	      }
	    }
	  },
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