var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var imageminOptipng = require('imagemin-optipng');
var imageminGifsicle = require('imagemin-gifsicle');

gulp.task('styles', function() {
	return gulp.src('sass/*.scss')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
	return gulp.src('js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
	return gulp.src('*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('fav', function() {
	return gulp.src('fav/**.*')
		.pipe(gulp.dest('dist'));
});

gulp.task('root', ['html', 'fav'] ,function() {
    return gulp.src(['*', '!README.md', '!*.js', '!*.json', '!*.gitignore', '!sass', '!node_modules', '!dist', '!fav'])
    	.pipe(gulp.dest('dist'));
});

gulp.task('img', function(){
	return gulp.src('img/*.{gif,png,svg,jpg,jpeg}')
		.pipe(imagemin({
		    progressive: true,

		    use: [imageminOptipng({optimizationLevel: 5})]
		}))
		.pipe(imageminGifsicle({interlaced: true})())
		.pipe(gulp.dest('dist/img'));
});


gulp.task('fonts', function(){
	return gulp.src('fonts/*')
		.pipe(gulp.dest('dist/fonts'));
});


gulp.task('default', ['styles', 'scripts', 'root', 'fonts', 'img', 'watch']);


//Watch task
gulp.task('watch', function(){
	gulp.watch('*.html', ['html']);
	gulp.watch('sass/*.scss', ['styles']);
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('img/**.*', ['img']);
})