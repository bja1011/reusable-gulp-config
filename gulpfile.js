var gulp = require('gulp');

var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');


gulp.task('index',function(){
	return gulp.src('src/index.html')	
	.pipe(gulp.dest('dist'))
});

gulp.task('copyBootstrap',function(){
	return gulp.src('node_modules/bootstrap/dist/*/*')	
	.pipe(gulp.dest('dist/assets/bootstrap'))	
});

gulp.task('copyFonts',function(){
	return gulp.src('src/fonts/*.*')	
	.pipe(gulp.dest('dist/assets/fonts/'))	
});

gulp.task('copyImages',function(){
	return gulp.src('src/img/*')	
	.pipe(gulp.dest('dist/assets/img'))	
});

gulp.task('lint',function(){
	return gulp.src('src/js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
})

gulp.task('less',function(){
	return gulp.src('src/less/*.less')
	.pipe(less())
	.pipe(autoprefixer())
	.pipe(gulp.dest('dist/assets/css'))	
})



gulp.task('copyCSS',function(){
	return gulp.src('src/css/*.css')
	.pipe(gulp.dest('dist/assets/css'))
})

gulp.task('prefixer', function () {
    return gulp.src('dist/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css/main.css'));
})

gulp.task('scripts',function(){
	return gulp.src(['src/js/modernizr.custom.19116.js','src/js/jquery.touchSwipe.min.js','src/js/TweenMax.min.js','src/js/jq-px.js','src/js/ScrollToPlugin.min.js','src/js/main.js'])
	.pipe(concat('all.min.js'))
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/assets/js'))
	.pipe(livereload());
})

gulp.task('minifycss',function(){
	return gulp.src('src/css/*.css')
	.pipe(minifycss())
	.pipe(gulp.dest('dist/assets/css'))
})

gulp.task('watchIndex',function(){
	livereload.listen();
	gulp.watch(['src/js/*.js'],['lint','scripts']);
})

gulp.task('watch',function(){
	livereload.listen();
	gulp.watch(['src/less/*.less'],['less']);
	gulp.watch(['src/index.html'],['index']);
})

gulp.task('default', function(){
	//runSequence('index','copyBootstrap','copyFonts','copyImages' ,'less','copyCSS','scripts','watch','watchIndex');
	runSequence('index','less','copyCSS','scripts','watch');
});


gulp.task('init', function(){
	runSequence('index','copyBootstrap','copyFonts','copyImages' ,'less','copyCSS','scripts','watch');
	
});