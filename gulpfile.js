// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var path = require('path');
var bump = require('gulp-bump');
var pkg = require('./package.json');
var es6transpiler = require('gulp-es6-transpiler');
var karma = require('karma').server;

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(es6transpiler())
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Compile less files to css
gulp.task('less', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('dist/css'));
});

// Watch Files For Changes and compile scripts and less
gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['lint', 'scripts']);
    gulp.watch('src/less/**/*.less', ['less']);
});

// Bump up the version numer in package and bower
gulp.task('bump', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});

// tag the version
gulp.task('tag', function () {
  var pkg = require('./package.json');
  var v = 'v' + pkg.version;
  var message = 'Release ' + v;

  return gulp.src('./')
    .pipe(git.commit(message))
    .pipe(git.tag(v, message))
    .pipe(git.push('origin', 'master', '--tags'))
    .pipe(gulp.dest('./'));
});

// push the version to the repo
gulp.task('npm', function (done) {
  require('child_process').spawn('npm', ['publish'], { stdio: 'inherit' })
    .on('close', done);
});

// Travis CI integration
gulp.task('build', ['scripts', 'less']);

// compiles, tests, and releases
gulp.task('release', ['lint', 'build', 'test', 'bump', 'tag', 'npm']);

// code integration task used travis CI
gulp.task('ci', ['lint', 'build', 'test']);

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'less', 'watch']);