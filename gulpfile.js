var gulp = require('gulp');
var markdown = require('gulp-markdown');

gulp.task('default', function() {
  gulp.src('src/*.md')
    .pipe(markdown())
    .pipe(gulp.dest('dist'));
});
