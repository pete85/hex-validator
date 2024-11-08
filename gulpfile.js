'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const { src, dest, watch, series, parallel } = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

// Compile SCSS into CSS, minify with cssnano, and output with sourcemaps
const scssTask = () => {
  return src('styles/styles.scss', { sourcemaps: true })
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([cssnano()]))
      .pipe(dest('dist', { sourcemaps: '.' }))
      .pipe(browserSync.stream());
};

// Minify JavaScript and output with sourcemaps
const jsTask = () => {
  return src('scripts/hex.js', { sourcemaps: true })
      .pipe(terser())
      .pipe(dest('dist', { sourcemaps: '.' }))
      .pipe(browserSync.stream());
};

// Copy HTML files to dist folder
const htmlTask = () => {
  return src('*.html')
      .pipe(dest('dist'))
      .pipe(browserSync.stream());
};

// Serve files with BrowserSync
const browserSyncServe = (cb) => {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });
  cb();
};

// Reload BrowserSync
const browserSyncReload = (cb) => {
  browserSync.reload();
  cb();
};

// Watch files for changes and trigger appropriate tasks
const watchTask = () => {
  watch('*.html', series(htmlTask, browserSyncReload));
  watch('./styles/**/*.scss', series(scssTask, browserSyncReload));
  watch('./scripts/**/*.js', series(jsTask, browserSyncReload));
};

// Build task for Netlify deployment
exports.build = series(
    parallel(htmlTask, scssTask, jsTask)
);


// Default task sequence: build, serve, and watch
exports.default = series(
    parallel(htmlTask, scssTask, jsTask),
    browserSyncServe,
    watchTask
);
