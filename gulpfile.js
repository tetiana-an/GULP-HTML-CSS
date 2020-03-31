const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require("gulp-rename");
const concat = require('gulp-concat'); 
const uglify = require('gulp-uglify');
const imagemin = require('gulp-image');
const browser = require('browser-sync').create();

function browserSync(done){
    browser.init({
        server: {
            baseDir: "./build"
        },
        port: 4000
    });
    done();
}

function browserSyncReload(done){
    browser.reload();
    done();
}

const paths = {
    styles: {
        src: 'app/styles/**/*.scss',
        dest: 'build/css'
    },
    images: {
        src: 'app/images/*.*',
        dest: 'build/images'
    },
    fonts: {
        src: 'app/fonts/**/*.*',
        dest: 'build/fonts'
    },
    html: {
        src: 'app/**/*.html',
        dest: 'build/'
    }
}

function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename({
            suffix: '.min' 
        }))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browser.stream())
}

function html(){
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browser.stream())
}

function images(){
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browser.stream())
}

function fonts(){
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dest))
        .pipe(browser.stream())
}

function watch(){
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch('./app/index.html', gulp.series(browserSyncReload));
}

const build = gulp.parallel(styles, html, images, fonts);

gulp.task('build', build); 

gulp.task('default', gulp.parallel(watch,build,browserSync));
