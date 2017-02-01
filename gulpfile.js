// reference https://github.com/Anjmao/angular2-production-workflow
var gulp = require('gulp');
var shell = require('gulp-shell');
var clean = require('gulp-clean');
var htmlreplace = require('gulp-html-replace');
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');
var builder = new Builder('', 'systemjs.config.js');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var bundleHash = new Date().getTime();
var mainBundleName = bundleHash + '.main.bundle.js';
var vendorBundleName = bundleHash + '.vendor.bundle.js';
var minMainBundleName = bundleHash + '.main.bundle.min.js';
var minVendorBundleName = bundleHash + '.vendor.bundle.min.js';

// This is main task for production use
gulp.task('dist', function(done) {
    runSequence('clean', 'compile_ts', 'bundle', 'minify:app:js', 'minify:vendor:js', 'del:app:js', 'del:vendor:js', 'copy_assets', function() {
        done();
    });
});

gulp.task('bundle', ['bundle:vendor', 'bundle:app'], function () {
    return gulp.src(['index.html', 'index.css'])
        .pipe(htmlreplace({
            'app': minMainBundleName,
            'vendor': minVendorBundleName
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('bundle:vendor', function () {
    return builder
        .buildStatic('app/vendor.js', './dist/' + vendorBundleName)
        .catch(function (err) {
            console.log('Vendor bundle error');
            console.log(err);
        });
});

// Minify JS bundle
gulp.task('minify:vendor:js', function() {
  return gulp
    .src('./dist/' + vendorBundleName)
    .pipe(concat(minVendorBundleName))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('del:vendor:js', function() {
  return gulp.src('./dist/' + vendorBundleName, {read: false})
      .pipe(clean());
});

gulp.task('bundle:app', function () {
    return builder
        .buildStatic('app/main.js', './dist/' + mainBundleName)
        .catch(function (err) {
            console.log('App bundle error');
            console.log(err);
        });
});

// Minify JS bundle
gulp.task('minify:app:js', function() {
  return gulp
    .src('./dist/' + mainBundleName)
    .pipe(concat(minMainBundleName))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('del:app:js', function() {
  return gulp.src('./dist/' + mainBundleName, {read: false})
      .pipe(clean());
});

gulp.task('compile_ts', ['clean:ts'], shell.task([
    'tsc'
]));

gulp.task('copy_assets', function() {
     return gulp.src(['./app/**/*.css', './app/**/*.html', './app/**/*.png'])
        .pipe(gulp.dest('./dist/app'));
});

gulp.task('copy_css', function() {
     return gulp.src(['index.css'])
        .pipe(gulp.dest('./dist/'));
});

gulp.task('clean', ['clean:ts', 'clean:dist']);

gulp.task('clean:dist', function () {
    return gulp.src(['./dist'], {read: false})
        .pipe(clean());
});

gulp.task('clean:ts', function () {
    return gulp.src(['./app/**/*.js', './app/**/*.js.map'], {read: false})
        .pipe(clean());
});
