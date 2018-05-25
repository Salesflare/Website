var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

gulp.task('styles', function() {
	return gulp.src('sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
	return gulp.src('js/*.js')
	//.pipe(uglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {
	return gulp.src('*.html')
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('fav', function() {
	gulp.src('fav/*.ico')
		.pipe(gulp.dest('dist'));
	
	gulp.src(['fav/**.*', '!fav/*.ico'])
		.pipe(gulp.dest('dist/img/icon'));
});

gulp.task('root', ['html', 'fav'] ,function() {
    return gulp.src(['*', '!*.html', '!README.md', '!*.js', '!*.json', '!*.gitignore', '!sass', '!node_modules', '!dist', '!fav', '!partials'])
    	.pipe(gulp.dest('dist'));
});

gulp.task('img', function(){
	return gulp.src('img/*.{gif,png,svg,jpg,jpeg}')
		.pipe(imagemin([
		    imagemin.jpegtran({ progressive: true}),
			imagemin.gifsicle({ interlaced: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo()
		], { verbose: true }))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function(){
	return gulp.src('fonts/*')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['styles', 'scripts', 'root', 'fonts', 'img', 'watch']);


//Watch task
gulp.task('watch', function(){
	gulp.watch('**/*.html', ['html']);
	gulp.watch('sass/*.scss', ['styles']);
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('img/**.*', ['img']);
})
