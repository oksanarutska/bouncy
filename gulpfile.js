/*global require*/
"use strict";
var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

var paths = {
    public: './public/',
    img: './public/img',
    sass: './src/sass/',
    css: './public/css/',

};

gulp.task('assets', function () {
    return gulp.src('./src/img/*')
        .pipe(gulp.dest(paths.img));
});

gulp.task('js', function () {
    return gulp.src('./src/*.js*')
        .pipe(gulp.dest(paths.public))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('pug', function () {
    return gulp.src('./src/*.pug')
        .pipe(pug())
        .on('error', function (err) {
            process.stderr.write(err.message + '\n');
            this.emit('end');
        })
        .pipe(gulp.dest(paths.public))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('sass', function () {
    return gulp.src(paths.sass + '*.sass')
        .pipe(sass({
            includePaths: [paths.sass],
            outputStyle: 'compressed'
        }))
        .on('error', sass.logError)
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(gulp.dest(paths.css))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', function () {
    gulp.watch(paths.sass + '**/*.sass', ['sass']);
    gulp.watch('./src/**/*.pug', ['pug']);
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('browser-sync', ['pug', 'sass', 'assets', 'js'], function () {
    browserSync({
        server: {
            baseDir: paths.public
        },
        notify: false
    });
});

gulp.task('build', ['sass', 'pug', 'assets', 'js']);

gulp.task('default', ['browser-sync', 'watch']);