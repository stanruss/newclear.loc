var gulp         = require('gulp');
var	rename       = require('gulp-rename');
var	postcss      = require('gulp-postcss');
var	assets       = require('postcss-assets');
var	nested       = require('postcss-nested');
var	short        = require('postcss-short');
var	cssnano      = require('gulp-cssnano');
var	cssnext      = require('postcss-cssnext');
var	autoprefixer = require('gulp-autoprefixer');
var	sass         = require('gulp-sass');
var notify       = require('gulp-notify');
	

	gulp.task('sass', function() {
		var processors = [
			short,
			nested,
			cssnext,
			assets({
				loadPaths: ['./src/assets/'],
				relativeTo: './src/styles/'
			})
		];
	return gulp.src('src/sass/**/*.sass')
	.pipe(sass().on("error", notify.onError()))
	.pipe(postcss(processors))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({
    browsers: ['last 12 versions'],
    cascade: false
    }))
	.pipe(cssnano())
	.pipe(gulp.dest('./src/styles/'));
	});
	


gulp.task('watch', ['sass'], function() {
	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch('/*.html');
	
});


	
gulp.task('default', ['watch', 'sass']);
	


