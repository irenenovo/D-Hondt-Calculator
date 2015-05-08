var gulp = require('gulp');
var cordova = require('gulp-cordova');
var uglify = require('gulp-uglify');
//var cordova = require('gulp-cordovacli');

gulp.task('cordova:init', function () {
    gulp.src('./cordovaGulp.json').pipe(cordova());
});

gulp.task('uglify', function () {
    return gulp.src('js/*.js').pipe(uglify()).pipe(gulp.dest('dist'));
});
