var gulp = require("gulp");
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');


gulp.task('sass', function () {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});