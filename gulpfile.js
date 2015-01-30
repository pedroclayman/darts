var gulp        = require('gulp');
var jsmin       = require('gulp-jsmin');
var rename      = require('gulp-rename');
var concat      = require('gulp-concat');
var karma       = require('gulp-karma');
var sass        = require('gulp-sass');
var minifyCss   = require('gulp-minify-css');
var concatCss   = require('gulp-concat-css');
var rename      = require('gulp-rename');



gulp.task('default', ['copy-content','minify', 'scss-convert', 'test'], function(){

});

gulp.task('watch', ['test-watch'], function() {
  gulp.watch('src/**/*.js', ['minify']);
  gulp.watch('src/styles/**/*.scss', ['scss-convert']);
  gulp.watch('src/index.html', ['copy-content']);
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
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/angular-local-storage/dist/angular-local-storage.js',
    'src/app/app.js',
    'src/app/controllers/**/*.js',
    'src/app/directives/**/*.js',
    'src/app/services/**/*.js',
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

gulp.task('scss-convert', function() {
  gulp.src('src/styles/**/*.scss')
    .pipe(sass( { errLogToConsole: true } ))
    .pipe(gulp.dest('dist/styles'))
    .pipe(concatCss("darts.css"))
    .pipe(gulp.dest('dist'))
    .pipe(minifyCss())
    .pipe(rename('darts.min.css'))
    .pipe(gulp.dest('dist'));

});

gulp.task('copy-content', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
})
