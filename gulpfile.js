var gulp = require('gulp');
var frontMatter = require('gulp-front-matter');
var markdown = require('gulp-markdown');
var layout = require('gulp-layout');
var htmlmin = require('gulp-htmlmin');

gulp.task('default', function() {
  gulp.src('src/*.md')
    .pipe(frontMatter({remove: true}))
    .pipe(markdown())
    .pipe(layout(function(file) {
      return file.frontMatter;
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});
