const gulp = require('gulp');
const spawn = require('child_process').spawn;

const modules = ['get-products', 'post-product'];

modules.forEach(module => gulp.task(module, function(done) {
    spawn('npm', ['run', 'package'], { cwd: module, stdio: 'inherit' })
        .on('close', done);
}));

gulp.task('package', modules);