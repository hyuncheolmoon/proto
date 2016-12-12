/* 
 Created on : 2016. 11. 4, PM 4:36:04
 Author     : Hyuncheol Moon 
 */
var gulp = require("gulp");
var less = require("gulp-less");
var bower = require("gulp-bower");
var webserver = require("gulp-webserver");
//var bowerRequireJS = require("bower-requirejs");


/**
 * @description 수정상태를 반영
 */
gulp.task("default", ["less", "watch"]);

/**
 * @description less를 css로 변환
 */
gulp.task("less", function () {
    return gulp.src("./**/cfm202_admin.less")
        .pipe(less())
        .pipe(gulp.dest("./"));
});
/**
 * @description 브라우저 실행부분
 */
gulp.task("serve", function () {
    gulp.src("www")
        .pipe(webserver({
            livereload: true,
            //directoryListing: true,
            open: true,
            port: 8002,
            host: "localhost"
        }));
});

/* 기존 bower의 업데이트를 이용하기 위한 ... 아직 안해봄 */
gulp.task("bower", function () {
    return bower({cmd: "update"})
        .pipe(gulp.dest("lib/"));
});
gulp.task('bower', function () {
    return bower({cmd: 'update'});
});
//gulp.task("watch", function () {
//    gulp.watch("./**/*.less", ["less"]);
//});