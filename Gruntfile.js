'use strict';

module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-php');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-firebase');

	grunt.initConfig({
		watch: {
			php: {
				files: ['app/index.php']
			}, 
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		},
		sass: {
			dev: {
				options: {
					style: 'compressed'
				},
				files: {
					'app/admin/css/theme.css': 'app/admin/css/theme.scss'
				}
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: '**/*'
				},
				options: {
					proxy: '127.0.0.1:8010', //our PHP server
					port: 8080, // our new port
					open: true,
					watchTask: true
				}
			}
		},
		php: {
			dev: {
				options: {
					port: 8010,
					base: 'app'
				}
			}
		}, 
		firebase: {
		  options: {
			reference: 'https://patternlabcreator.firebaseio.com/',
			token: 'rXXDMV9ML2PuyLpdx30VQ81CHhWclAZrG8h7clMm'
		  }
		}
	});

	grunt.registerTask('default', ['php', 'browserSync', 'watch', 'firebase']);




};