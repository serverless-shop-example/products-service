const gulp = require('gulp');
const zip = require('gulp-zip');
const merge = require('merge-stream');
const install = require('gulp-install');
const clean = require('gulp-clean');

const dest = 'dist';

gulp.task('clean', () =>
    gulp.src(`dist`)
        .pipe(clean())
);

gulp.task('build', ['clean'], () => merge(
    gulp.src(['src/*', 'package.json'], {base: '.'})
        .pipe(gulp.dest(dest)),
    gulp.src('package.json')
        .pipe(install({
            args: ['--production', '--prefix', dest]
        })),
));

gulp.task('package', ['build'], () =>
    gulp.src(`dist/**/*`)
        .pipe(zip('post-product.zip'))
        .pipe(gulp.dest(dest))
);