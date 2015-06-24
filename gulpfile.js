var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('styles', function() {
	gulp.src('sass/*.scss')
		.pipe(sass({
			errLogToConsole: true
		}))
		.pipe(minifyCss())
		.pipe(gulp.dest('dist/css'))
});

gulp.task('scripts', function(){
	gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
    gulp.src('*.html')
      .pipe(gulp.dest('dist'));
});

gulp.task('img', function(){
	gulp.src('img/*')
	.pipe(gulp.dest('dist/img'));
});


gulp.task('fonts', function(){
	gulp.src('fonts/*')
	.pipe(gulp.dest('dist/fonts'));
});

//Watch task
gulp.task('default', ['styles', 'scripts', 'html', 'fonts', 'img']);