const gulp = require('gulp');
const spawn = require('child_process').spawn;

const modules = ['get-products', 'post-product'];

modules.forEach(module => gulp.task(`${module}-package`, function (done) {
    spawn('npm', ['run', 'package'], { cwd: module, stdio: 'inherit' })
        .on('close', done);
}));

modules.forEach(module => gulp.task(`${module}-install`, function (done) {
    spawn('npm', ['install'], { cwd: module, stdio: 'inherit' })
        .on('close', done);
}));

gulp.task('install', modules.map(m => `${m}-install`));
gulp.task('package', modules.map(m => `${m}-package`));