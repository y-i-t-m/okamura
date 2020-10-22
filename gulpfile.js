const gulp = require("gulp");
const setting = require('./settings');
// const fs = require("fs-extra");
// const gulpEjs = require("gulp-ejs");
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const notify  = require('gulp-notify');

const ejs = (cb) => {
  gulp
  .src('src/**/!(_)*.ejs')
  // エラー後もwatchを止めない
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  // .ejsを.htmlへリネーム
  .pipe(rename({ extname: '.html' }))
  .pipe(gulp.dest(setting.basedir));
  cb();
};

exports.ejs = ejs;
exports.watch = () => {
  gulp.watch('src/**/*.ejs', ejs);
};