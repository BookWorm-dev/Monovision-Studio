import gulp from 'gulp';
import browserSync from 'browser-sync';
import * as sass from 'sass';  
import sassCompiler from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer'; 

const sassProcessor = sassCompiler(sass);

gulp.task('server', function () {
    browserSync({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function () {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sassProcessor({ outputStyle: 'compressed' }).on('error', sassProcessor.logError))
        .pipe(rename({ suffix: '.min', prefix: '' }))
        .pipe(autoprefixer())
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
