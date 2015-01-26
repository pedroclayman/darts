var gulp        = require('gulp');
var jsmin       = require('gulp-jsmin');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
// define tasks here
gulp.task('default', ['minify'], function(){

});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['default']);
});

gulp.task('minify', function() {
  gulp.src('src/**/*.js')
    .pipe(concat('darts.js'))
    .pipe(gulp.dest('dist'))
    .pipe(jsmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

gulp.task
