#improved code base on ES6

import gulp from 'gulp';
import { series, parallel, watch } from 'gulp';
import uglify from 'gulp-uglify';
import cleanCss from 'gulp-clean-css';
import rename from 'gulp-rename';
import imageMin from 'gulp-imagemin';
import concat from 'gulp-concat';

const path = {
    css: {
        src: './wwwroot/css/*.css',
        dest: './wwwroot/css',
        minDest: './wwwroot/css/*.min.css'
    },
    js: {
        mainSrc: './wwwroot/assets/js/*.js',
        mainDest: './wwwroot/assets/js',
        mainMinDest: './wwwroot/assets/js/*.min.js',
        adminSrc: './wwwroot/assets/js/admin/*.js',
        adminDest: './wwwroot/assets/js/admin',
        adminMinDest: './wwwroot/assets/js/admin/*.min.js',
        studentSrc: './wwwroot/assets/js/student/*.js',
        studentDest: './wwwroot/assets/js/student',
        studentMinDest: './wwwroot/assets/js/student/*.min.js',
        sysadminSrc: './wwwroot/assets/js/sysadmin/*.js',
        sysadminDest: './wwwroot/assets/js/sysadmin',
        sysadminMinDest: './wwwroot/assets/js/sysadmin/*.min.js',
        components: {
            adminSrc: './wwwroot/assets/js/admin/*.js',
            adminDest: './wwwroot/assets/js/admin',
            adminMinDest: './wwwroot/assets/js/admin/*.min.js',

            loginSrc: './wwwroot/assets/js/login/*.js',
            loginDest: './wwwroot/assets/js/login',
            loginMinDest: './wwwroot/assets/js/login/*.min.js',

            registerSrc: './wwwroot/assets/js/register/*.js',
            registerDest: './wwwroot/assets/js/register',
            registerMinDest: './wwwroot/assets/js/register/*.min.js',

            studentSrc: './wwwroot/assets/js/student/*.js',
            studentDest: './wwwroot/assets/js/student',
            studentMinDest: './wwwroot/assets/js/student/*.min.js'
        },
    },
    img: {
        src: './wwwroot/assets/img/*',
        dest: './wwwroot/assets/img'
    }
}


const minStyle = () => {
    return gulp.src([path.css.src, '!' + path.css.minDest])
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.css.dest));
}

const mainScripts = () => {
    return gulp.src([path.js.mainSrc, '!' + path.js.mainMinDest])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.mainDest));
}

const adminScripts = () => {
    return gulp.src([path.js.adminSrc, '!' + path.js.adminMinDest])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.adminDest));
}

const studentScripts = () => {
    return gulp.src([path.js.studentSrc, '!' + path.js.studentMinDest])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.studentDest));
}

const sysadminScripts = () => {
    return gulp.src([path.js.sysadminSrc, '!' + path.js.sysadminMinDest])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.sysadminDest));
}

const componentAdminScript = () => {
    return gulp.src([path.js.components.adminSrc, '!' + path.js.components.adminMinDest])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.components.adminDest));
}


const componentLoginScript = () => {
    return gulp.src([path.js.components.loginSrc, '!' + path.js.components.loginMinDest])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.components.loginDest));
}


const componentRegisterScript = () => {
    return gulp.src([path.js.components.registerSrc, '!' + path.js.components.registerMinDest])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.components.registerDest));
}


const componentStudentScript = () => {
    return gulp.src([path.js.components.studentSrc, '!' + path.js.components.studentMinDest])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.components.studentDest));
}

const imgOpt = () => {
    return gulp.src(path.img.src)
        .pipe(imageMin())
        .pipe(gulp.dest(path.img.dest));
}

const watchMainJs = () => watch(path.js.mainSrc, series(mainScripts));
const watchAdminJs = () => watch(path.js.adminSrc, series(adminScripts));
const watchStudenJs = () => watch(path.js.studentSrc, series(studentScripts));
const watchSysAdminJs = () => watch(path.js.sysadminSrc, series(sysadminScripts));
const watchComponentAdminJs = () => watch(path.js.components.adminSrc, series(componentAdminScript));
const watchComponentLoginJs = () => watch(path.js.components.loginSrc, series(componentLoginScript));
const watchComponentRegisterJs = () => watch(path.js.components.registerSrc, series(componentRegisterScript));
const watchComponentStudentJs = () => watch(path.js.components.studentSrc, series(componentStudentScript));



const build = series(scssStyles,
    parallel(
        minStyle,
        mainScripts,
        adminScripts,
        studentScripts,
        sysadminScripts,
        componentAdminScript,
        componentLoginScript,
        componentRegisterScript,
        componentStudentScript));

const _watch = parallel(
    watchMainJs,
    watchAdminJs,
    watchStudenJs,
    watchSysAdminJs,
    watchComponentAdminJs,
    watchComponentLoginJs,
    watchComponentRegisterJs,
    watchComponentStudentJs
);

gulp.task('watch', _watch);

gulp.task('default', build);
