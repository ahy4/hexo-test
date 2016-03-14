var gulp = require('gulp');
var git = require('gulp-git');
var run = require('run-sequence');
var Promise = require('promise');
var path = require('path');

gulp.task('git-pull', function () {
  return new Promise(function (resolve, reject) {
    process.chdir(path.resolve(__dirname, './clone/ext-docs/'));
    git.pull('origin', 'master', {args: '--rebase'}, function (err) {
      process.chdir(path.resolve(__dirname, '../../'));
      err ? reject(err) : resolve(null);
    });
  });
});

gulp.task('copy-clone-mds', function () {
  return gulp.src('clone/ext-docs/markdowns/*.md').pipe(
    gulp.dest('source/_posts')
  );
});

gulp.task('default', function () {
  return run (
    'git-pull',
    'copy-clone-mds'
  );
});
