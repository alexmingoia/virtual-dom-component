/*!
 * virtual-dom-component
 * https://github.com/alexmingoia/virtual-dom-component
 *
 * Copyright (c) 2014 Alex Mingoia <talk@alexmingoia.com>
 * Licensed under the BSD license.
 */

'use strict';

var Browserify = require('browserify')
  , clean = require('gulp-clean')
  , gulp = require('gulp')
  , instrument = require('gulp-instrument')
  , jshint = require('gulp-jshint')
  , mochaPhantomJS = require('gulp-mocha-phantomjs')
  , source = require('vinyl-source-stream')
  , stylish = require('jshint-stylish')
  , spawn = require('child_process').spawn;

gulp.task('coverage', ['instrument'], function() {
  process.env.JSCOV=1;

  return spawn('node_modules/gulp-mocha-phantomjs/node_modules/mocha-phantomjs/node_modules/mocha/bin/mocha', [
    'test', '--reporter', 'html-cov'
  ]).stdout
    .pipe(source('coverage.html'))
    .pipe(gulp.dest('./'));
});

gulp.task('instrument', function() {
  return gulp.src('lib/**.js')
    .pipe(instrument())
    .pipe(gulp.dest('lib-cov'));
});

gulp.task('wrap-umd', function() {
  var bundler = new Browserify({
    standalone: 'VirtualComponent'
  });

  bundler.add('./lib/virtual-dom-component.js');
  bundler.ignore('../lib-cov/virtual-dom-component');

  return bundler.bundle()
    .pipe(source('virtual-dom-component.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('browserify-tests', function() {
  var bundler = new Browserify();

  bundler.add('./test/virtual-dom-component.js');
  bundler.ignore('../lib-cov/virtual-dom-component');

  return bundler.bundle()
    .pipe(source('tests.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('mocha-phantomjs', ['browserify-tests'], function() {
  return gulp.src('test/virtual-dom-component.html')
    .pipe(mochaPhantomJS({
      mocha: {
        timeout: 6000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'spec'
      }
    }));
});

gulp.task('test', ['mocha-phantomjs'], function () {
  return gulp.src('dist/tests.js').pipe(clean());
});

gulp.task('jshint', function () {
  return gulp.src(['lib/**/*.js', 'test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('default', ['jshint', 'test']);
