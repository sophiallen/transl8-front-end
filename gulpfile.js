'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');
var historyApiFallback = require('connect-history-api-fallback');

var config = {
	port: 3004,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',  
			'./src/css/*.css'
		],
		mainJs: './src/index.js',
		dist: './dist'
	}
}

//start a local dev server that can live-reload.
gulp.task('connect', function(){
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true,
		middleware: function(connect, opt){
            return [historyApiFallback({})];
        }
	});
});

//open new tab in default browser. 
gulp.task('open', ['connect'], function(){
	gulp.src('dist/index.html')
		.pipe(open({url: config.devBaseUrl + ':' + config.port + '/'}));
});

//move html files to dist (no transforms necessary)
gulp.task('html',['css'], function(){
	gulp.src(config.paths.html)
	.pipe(gulp.dest(config.paths.dist))
	.pipe(connect.reload()); //reload if html has chanced
});

gulp.task('css', function(){
	gulp.src(config.paths.css)
	.pipe(concat('bundle.css'))
	.pipe(gulp.dest(config.paths.dist + '/css'));
})

gulp.task('js', function(){
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});


gulp.task('watch', function(){
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js']);
	gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'css', 'js','open','watch']);

