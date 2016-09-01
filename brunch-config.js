'use strict';

var config_css_autoprefixer = ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'];
var livereload_local_site = 'tiger.dev:80';
var reload_on_files_change = [
    'app/js/*.js',
    'app/js/**/*.js',
    'app/templates/*.hbs',
    'app/templates/**/*.hbs',
    'app/templates/**/**/*.hbs'
];

module.exports = {
    modules: {
        autoRequire: {
            // outputFileName : [ entryModule ]
            'js/app.js': ['js/main']
        }
    },
    files: {
        javascripts: {
            joinTo: {
                'js/app.js': /^app/,
                'js/vendor.js': /^(?!app)/
            },
            order: {
                before: [
                        'bower_components/jquery/dist/jquery.js'
                        // ,'bower_components/jquery-easyui/jquery.easyui.min.js'
                    ]
                    // ,after: ['src/js/init.js']
            }
        },
        stylesheets: {
            joinTo: 'css/styles.css'
        },
        templates: {
            joinTo: 'js/app.js'
        }
    },

    plugins: {

        // sass is hidden here because has no config ??

        // change modern javascript into vanilla cross platform javascript
        // babel: {
        //   pattern: /\.(js|jsx)$/
        // },

        assetsmanager: {
            copyTo: {
                'fonts': ['bower_components/font-awesome/fonts/*'],
                // 'img': ['src/img/*'],
                // '.': ['src/index.html.twig'],
                // 'img/icheck': ['bower_components/iCheck/skins/square/blue*.png'],
                'css': [
                    'bower_components/jquery-easyui/themes/metro/images',
                    'bower_components/jquery-easyui/themes/icons'
                ]
            },
            minTimeSpanSeconds: 120 // assets won't be copied more frequent than once per X seconds.
        },

        // clean unused css rules
        cleancss: {
            keepSpecialComments: 0,
            removeEmpty: true
        },

        postcss: {
            processors: [
                // add css browser prefixes
                require('autoprefixer')(config_css_autoprefixer)
            ]
        },
        // allow browser livereload
        browserSync: {
            port: 3333,
            logLevel: 'info', // logLevel: 'debug',
            files: reload_on_files_change,
            proxy: livereload_local_site,
            open: false,
            notify: true,
            minify: false,
            reloadOnRestart: false,
            logConnections: true
        },

        // beforeBrunch: [
        //         './pre-brunch.sh'
        //     ]
            // afterBrunch: []
    }, // end plugin

    overrides: {

        // specific production config
        production: {

            sourceMaps: false,

            plugins: {
                // uglify js files
                // uglify: {
                //   mangle: true,
                //   compress: {
                //     global_defs: {
                //       DEBUG: false
                //     }
                //   }
                // },
                postcss: {
                    processors: [
                        require('autoprefixer')(config_css_autoprefixer),
                        // uglify css
                        require('csswring')
                    ]
                },
                browserSync: false
            } // end plugin

        } // end production
    }, // end overrides
};
