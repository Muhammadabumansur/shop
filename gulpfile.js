var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    compass = require('gulp-compass'),
    htmlmin = require('gulp-htmlmin'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify');

var jadePath = 'app/jade/_pages/*.jade';
var scssPath = 'app/sass/**/*.scss';

// Сервер
gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'dest'
    }
  });
});

//compass
gulp.task('compass', function() {
  gulp.src(scssPath)
    .pipe(plumber())
    .pipe(compass({
      config_file: 'config.rb',
      css: 'app/css',
      sass: 'app/sass'
    }))
    .pipe(gulp.dest('app/css'));
});


//jade
gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src(jadePath)
    .pipe(plumber())
    .pipe(jade({
      locals: YOUR_LOCALS,
      pretty : '\t',
    }))
    .pipe(gulp.dest('app'))
});


// Слежка
gulp.task('watch', function () {
  gulp.watch([
    'app/*.html',
    'app/js/**/*.js',
    'app/css/**/*.css'
  ]).on('change', browserSync.reload);
  gulp.watch(jadePath, ['jade']); 
  gulp.watch('app/sass/**/*.scss', ['compass'])
});

// Минификация CSS
gulp.task('cssnano', function() {
    return gulp.src('app/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dest/css'));
});

// Минификация HTML
gulp.task('minify', function() {
  return gulp.src('app/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dest'))
});


// Минификация js
gulp.task('compress', function() {
  return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dest/js'));
});

// Задачи минификации
gulp.task('watch', ['cssnano', 'minify', 'compress']);

// Задача по-умолчанию
gulp.task('default', ['server', 'jade', 'compass', 'watch']);

