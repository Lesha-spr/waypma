var path = require('path');
var gulp = require('gulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var inject = require('gulp-inject');

gulp.task('markup', function() {
    gulp.src('./public/src/templates/pages/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public/build/pages/'));
});

gulp.task('sass', function() {
    gulp.src('./public/src/app.scss')
        .pipe(inject(gulp.src(['./components/**/*.scss'], {read: false, cwd: 'public/src/'}), {
            starttag: '/* inject:imports */',
            endtag: '/* endinject */',
            transform: function (filepath) {
                return '@import ".' + filepath + '";';
            }
        }))
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(gulp.dest('./public/build/styles'));
});

gulp.task('watch', function() {
    gulp.watch('./public/src/**/*.jade', ['markup']);
    gulp.watch('./public/src/**/*.scss', ['sass']);
});

gulp.task('build', ['markup', 'sass']);
gulp.task('default', ['markup', 'sass', 'watch']);