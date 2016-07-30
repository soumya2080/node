'use strict';

var browserSync = require('browser-sync').create(),
  gulp = require('gulp'),
  nodemon = require('gulp-nodemon'),
  reload = browserSync.reload;

gulp.task('serve',
  [
    'browser-sync'
  ],
  function () {
    gulp.watch('app/**/*.html').on('change', reload);
    gulp.watch('app/**/*.js').on('change', reload);
    gulp.watch('app/style.css').on('change', reload);
  }
);

gulp.task('browser-sync',
  [
    'nodemon'
  ],
  function() {
    browserSync.init(null, {
      proxy: 'http://localhost:3000',
      browser: 'chrome',
      port: 4000
    });
  }
);

gulp.task('nodemon',
  function (done) {
    var running = false;

    return nodemon({
      script: 'server/app.js',
      watch: ['server/**/*.*']
    })
    .on('start', function () {
      if (!running) {
        done();
      }
      running = true;
    })
    .on('restart', function () {
      setTimeout(function () {
        reload();
      }, 500);
    });
  }
);