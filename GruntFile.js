'use strict';


module.exports = function(grunt){
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ['./src/public/less']
                },
                files: {
                    './src/public/css/style.css': './src/public/less/style.less'
                }
            }
        },
        postcss: {
            options: {
                map: false,
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}),
                    require('cssnano')()
                ]
            },
            dist: {
                src: './src/public/css/style.css'
            }
        },
        watch: {
            files: ['./src/public/less/**/*'],
            tasks: ['less', 'postcss']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less', 'postcss']);
};