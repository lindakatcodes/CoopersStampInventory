var gulp = require('gulp');
//var connect = require('gulp-connect');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./",
        }
    });
});

/*gulp.task('connect', function() {
    connect.server({
        root: 'testing',
        livereload: true
    });
});*/

gulp.task('html', function() {
    gulp.src('./*.html')
    //.pipe(connect.reload());
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('css', function() {
    gulp.src('./*.css')
    //.pipe(connect.reload());
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('js', function() {
    gulp.src('./*.js')
    //.pipe(connect.reload());
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('watch', function() {
    gulp.watch('./*.html', ['html']);
    gulp.watch('./*.css', ['css']);
    gulp.watch('./*.js', ['js']);
    
});

//gulp.task('start', ['connect', 'watch']);
gulp.task('start', ['browser-sync', 'watch']);