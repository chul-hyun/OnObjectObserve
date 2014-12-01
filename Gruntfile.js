module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		umd: {
			'build': {
				src: 'src/index.js',
				dest: 'dist/index.js',
				template: 'umd.hbs',
				objectToExport: 'OnObjectObserve',
				deps: {
					args : ['EventEmitter'],
					amd: {
						items: ['EventEmitter'],
						prefix: '\"',
						separator: ',\n',
						suffix: '\"'
					},
					cjs: {
						items: ['wolfy87-eventemitter'],
						prefix: 'require(\"',
						separator: ',\n',
						suffix: '\")'
					},
					global: {
						items: ['EventEmitter'],
					},
					pipeline: {
						items : ['wolfy87-eventemitter'],
						prefix: '//= require ',
						separator: '\n',
					}
				}
			}
		},
		uglify: {
			'build': {
				options: {
					sourceMap: true,
					sourceMapIncludeSources: true
				},
				files: {
					'dist/index.min.js': ['dist/index.js']
				}
			}
		},
		jsdoc : {
			dist : {
				src: ['dist/index.js', 'README.md'], 
				options: {
					destination: 'doc',
					configure: 'conf.json',
					template: 'node_modules/jaguarjs-jsdoc'
				}
			}
		},
		clean: {
			doc   : ['doc/'],
			dist  : ['dist/']
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['clean', 'umd', 'uglify', 'jsdoc']);
};