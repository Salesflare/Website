var gulp = require('gulp');
var ghPages = require('gulp-gh-pages-will');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var fileInclude = require('gulp-file-include');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('cleanup', () => {

	return del('dist');
})

gulp.task('styles', function() {

	return gulp.src('sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {

	return gulp.src('js/*.js')
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('html', function() {

	return gulp.src('*.html')
        .pipe(fileInclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('fav', (done) => {
	
	gulp.src('fav/*.ico')
		.pipe(gulp.dest('dist'));
	
	gulp.src(['fav/**.*', '!fav/*.ico'])
		.pipe(gulp.dest('dist/img/icon'));

	return done();
});

gulp.task('root', gulp.series('html', 'fav', () => {

		return gulp.src(['*', '!*.html', '!README.md', '!*.js', '!*(package*).json', '!*.gitignore', '!sass', '!node_modules', '!dist', '!fav', '!partials'])
			.pipe(gulp.dest('dist'));
	})
);

gulp.task('img', function() {

	return gulp.src('img/*.{gif,png,svg,jpg,jpeg}')
		.pipe(imagemin([
		    imagemin.jpegtran({ progressive: true}),
			imagemin.gifsicle({ interlaced: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo()
		], { verbose: true }))
		.pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function() {

	return gulp.src('fonts/*')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('deploy', function() {

  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

//Watch task
gulp.task('watch', (done) => {
	gulp.watch('**/*.html', ['html']);
	gulp.watch('sass/*.scss', ['styles']);
	gulp.watch('js/*.js', ['scripts']);
	gulp.watch('img/**.*', ['img']);

	return done();
});

gulp.task('default', gulp.series('cleanup', 'styles', 'scripts', 'root', 'fonts', 'img', 'watch'));
gulp.task('dist', gulp.series('cleanup', 'styles', 'scripts', 'root', 'fonts', 'img'));
