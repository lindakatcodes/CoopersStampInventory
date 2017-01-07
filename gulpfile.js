var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./",
        }
    });
});

gulp.task('html', function() {
    gulp.src('./*.html')
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('css', function() {
    gulp.src('./*.css')
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('js', function() {
    gulp.src('./*.js')
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('watch', function() {
    gulp.watch('./*.html', ['html']);
    gulp.watch('./*.css', ['css']);
    gulp.watch('./*.js', ['js']);
    
});

gulp.task('start', ['browser-sync', 'watch']);