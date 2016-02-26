var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    compass = require('gulp-compass');

var jadePath = 'app/jade/_pages/*.jade';
var scssPath = 'app/sass/**/*.scss';

// Сервер
gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'app'
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


// Задача по-умолчанию
gulp.task('default', ['server', 'watch']);

