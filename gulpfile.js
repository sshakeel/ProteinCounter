var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var connect = require('gulp-connect');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'watch', 'connect', 'html', 'js']);

gulp.task('sass', function(done) {
  gulp.src('./scss/protein.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);

});

gulp.task('js', function() {
  gulp.src('js/*.js')
    .pipe(connect.reload())
});

gulp.task('html', function() {
  gulp.src('www/*.html')
    .pipe(connect.reload())
});

gulp.task('css', function() {
  gulp.src('./www/*.css')
    .pipe(connect.reload())
});
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(['js/*.js', '*.js', 'www/templates/*.js'], ['js']);
  gulp.watch(['*.html', 'www/*.html', 'www/templates/*.html'], ['html']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('connect', function() {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
