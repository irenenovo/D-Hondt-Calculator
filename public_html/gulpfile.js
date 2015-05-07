var gulp = require('gulp');
var cordova = require('gulp-cordova');
//var cordova = require('gulp-cordovacli');

gulp.task('cordova:init', function () {
    gulp.src('./cordovaGulp.json').pipe(cordova());
});
