const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const gulpStylelint = require('gulp-stylelint');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const pugbem = require('gulp-pugbem');

function style () {
    return gulp.src('./src/sass/*.scss')
        .pipe(gulpStylelint({
            reporters: [
            {
                formatter: 'string',
                console: true
            }
            ]
        }))
        .pipe(sass({
            outputStyle: 'expanded',
            indentWidth: 4
        }).on('error', sass.logError))
        .pipe(autoprefixer([
            'last 15 versions', '> 1%', 'ie 8', 'ie 7'
        ], { 
            cascade: false 
        }))
        .pipe(gulp.dest('./dest/css'))
        .pipe(browserSync.stream())
}

function pug2html () {
    return gulp.src('./src/pug/*.pug')
        .pipe(pug({
            plugins: [pugbem],
            pretty: true
        }))
        .pipe(gulp.dest('./dest'))
        .pipe(browserSync.stream())
}

function watcher () {
    browserSync.init({
        server: {
            baseDir: './dest'
        },
        browser: 'chrome'
    })
    gulp.watch('./src/pug/**/*.pug', pug2html);
    gulp.watch('./src/sass/**/*.scss', style);
    gulp.watch('./dest/**/*.html').on('change', browserSync.reload);
    gulp.watch('./dest/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.pug2html = pug2html;
exports.watch = watcher;