var gulp = require('gulp');
var browserify = require('gulp-browserify');
var reactify = require('reactify');
var server = require('gulp-server-livereload');


gulp.task('default', ['watch', 'webserver']);


gulp.task('webserver', function(){
  gulp.src('app')
    .pipe(server({
      livereload: true,
      directoryList: true,
      open: true
    }));
});

gulp.task('watch', function(){
  gulp.watch(['app/js/src/**/*.js', 'app/js/src/**/*.jsx'], ['scripts'])
});

gulp.task('scripts', function(){
  gulp.src('app/js/src/app.js')
    .pipe(browserify({
      insertGoals: false,
      debug: true,
      transform: [reactify]
    }))
    .pipe(gulp.dest('./app/js/dist'));
});