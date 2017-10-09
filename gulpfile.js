const gulp = require('gulp');
const frontMatter = require('gulp-front-matter');
const markdown = require('gulp-markdown');
const layout = require('gulp-layout');
const htmlmin = require('gulp-htmlmin');

const marked = markdown.marked;
const renderer = new marked.Renderer();
renderer.heading = (text, level) => `<h${level}>${text}</h${level}>`;
marked.setOptions({renderer});

gulp.task('default', () => {
  gulp.src('src/**/*.md')
    .pipe(frontMatter({remove: true}))
    .pipe(markdown())
    .pipe(layout(file => file.frontMatter))
    .pipe(htmlmin({collapseWhitespace: true, minifyCSS: true}))
    .pipe(gulp.dest('dist'));
  }
);
