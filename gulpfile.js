'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const { src, dest, watch, series } = require('gulp');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

const scssTask = () => {
  return src('styles/styles.scss', { sourcemaps: true })
    .pipe(sass({}, {}))
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }));
};

const jsTask = () => {
  return src('scripts/hex.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(dest('dist', { sourcemaps: '.' }));
};

const browserSyncServe = (cb) => {
  browserSync.init({
    server: {
      baseDir: '.'
    }
  });
  cb();
}

const browserSyncReload = (cb) => {
  browserSync.reload();
  cb();
}

gulp.task('watch', function () {
  gulp.watch('./styles/*.scss', gulp.series('scss'));
  gulp.watch('./scripts*.js', gulp.series('js'));
  livereload.listen({ host: 'localhost' });
});

const watchTask = () => {
  watch('*.html', browserSyncReload);
  watch(['./styles/**/*.scss', './scripts/**/*.js'], series(scssTask, jsTask, browserSyncReload));
}

exports.default = series(
  scssTask,
  jsTask,
  browserSyncServe,
  watchTask
);
// gulp.task('html', () => {
//   return gulp.src('*.html')
//     .pipe(concat('index.html'))
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('./styles/'));
// });
