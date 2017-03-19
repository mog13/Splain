let gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename");
const babel = require('gulp-babel');


// task
gulp.task('minify', function () {
    gulp.src('./splain.js') // path to your files
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename("splain.min.js"))
        .pipe(gulp.dest('./'));
});