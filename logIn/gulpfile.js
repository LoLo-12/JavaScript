var gulp = require("gulp");
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');

gulp.task('pug', function buildHTML() {
    return gulp.src('./source/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
});

gulp.task('sass', function () {
    return gulp.src('./source/scss/**/*.sass')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', function () {
    gulp.watch('./source/scss/**/*.sass', gulp.series('sass'));
    gulp.watch('./source/*.pug', gulp.series('pug'));
});

gulp.task('default', gulp.series('pug', 'sass', 'watch'));