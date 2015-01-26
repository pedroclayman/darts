var gulp        = require('gulp');
var jsmin       = require('gulp-jsmin');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var karma       = require('gulp-karma');



gulp.task('default', ['minify', 'test'], function(){

});

gulp.task('watch', ['test-watch'], function() {
  gulp.watch('src/**/*.js', ['minify']);
});

gulp.task('minify', function() {
  gulp.src('src/**/*.js')
    .pipe(concat('darts.js'))
    .pipe(gulp.dest('dist'))
    .pipe(jsmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

var test = function(shouldWatch) {
  var testFiles = [
  'bower_components/angular/angular.min.js',
  'bower_components/angular-mocks/angular-mocks.js',
  'bower_components/angular-growl/build/angular-growl.min.js',
  'src/**/*.js',
  'tests/**/*.spec.js'
  ];

  gulp.src(testFiles)
  .pipe(karma({
    configFile: 'karma.conf.js',
    action: (shouldWatch === true ? 'watch' : 'run')
  }))
  .on('error', function(err) {
    throw err;
  });
}

gulp.task('test', function() {
  test(false);
});

gulp.task('test-watch', function() {
  test(true);
});
