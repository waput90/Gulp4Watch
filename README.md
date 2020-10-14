# Gulp 4 configuration for your application

 this configuration are my suited configuration in my development stage
 
 first is you need to add ```gulpfile.js``` to your working directory
 
 then you can make this code as your sample will explain it in comment:

```
const gulp = require('gulp');
let { series, parallel, watch } = gulp;
const uglify = require('gulp-uglify');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const imageMin = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

// added babel for backwards compatibility of es6 syntax..

// sample path object for your current application
const path = {
    scss: {
        src: './wwwroot/assets/scss/*.scss',
        dest: './wwwroot/css',
        minDest: './wwwroot/css/*.min.css'
    },
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
            adminSrc: './wwwroot/assets/js/admin/*.c.js',
            adminDest: './wwwroot/assets/js/admin',
            adminMinDest: './wwwroot/assets/js/admin/*.c.min.js',

            loginSrc: './wwwroot/assets/js/login/*.c.js',
            loginDest: './wwwroot/assets/js/login',
            loginMinDest: './wwwroot/assets/js/login/*.c.min.js',

            registerSrc: './wwwroot/assets/js/register/*.c.js',
            registerDest: './wwwroot/assets/js/register',
            registerMinDest: './wwwroot/assets/js/register/*.c.min.js',

            studentSrc: './wwwroot/assets/js/student/*.c.js',
            studentDest: './wwwroot/assets/js/student',
            studentMinDest: './wwwroot/assets/js/student/*.c.min.js'
        },
    },
    img: {
        src: './wwwroot/assets/img/*',
        dest: './wwwroot/assets/img'
    }
}

const scss = () => {
    return gulp.src([path.scss.src, '!' + path.css.minDest])
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest(path.scss.dest));
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
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.mainDest));
}

const adminScripts = () => {
    return gulp.src([path.js.adminSrc, '!' + path.js.adminMinDest])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.adminDest));
}

const studentScripts = () => {
    return gulp.src([path.js.studentSrc, '!' + path.js.studentMinDest])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.studentDest));
}

const sysadminScripts = () => {
    return gulp.src([path.js.sysadminSrc, '!' + path.js.sysadminMinDest])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.sysadminDest));
}

const componentAdminScript = () => {
    return gulp.src([path.js.components.adminSrc, '!' + path.js.components.adminMinDest])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.components.adminDest));
}


const componentLoginScript = () => {
    return gulp.src([path.js.components.loginSrc, '!' + path.js.components.loginMinDest])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.components.loginDest));
}


const componentRegisterScript = () => {
    return gulp.src([path.js.components.registerSrc, '!' + path.js.components.registerMinDest])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.js.components.registerDest));
}


const componentStudentScript = () => {
    return gulp.src([path.js.components.studentSrc, '!' + path.js.components.studentMinDest])
        .pipe(babel({
            presets: ['@babel/env']
        }))
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
const test = () => {

}
const mainWatch = () => {
    watch(path.js.mainSrc, series(mainScripts));
}

// watch configuration
const watchScss = () => watch([path.scss.src, `!${path.scss.minDest}`], series(scss));
const watchCss = () => watch([path.css.src, `!${path.css.minDest}`], series(minStyle));
const watchMainJs = () => watch([path.js.mainSrc, `!${path.js.mainMinDest}`], series(mainScripts));
const watchAdminJs = () => watch([path.js.adminSrc, `!${path.js.adminMinDest}`], series(adminScripts));
const watchStudenJs = () => watch([path.js.studentSrc, `!${path.js.studentMinDest}`], series(studentScripts));
const watchSysAdminJs = () => watch([path.js.sysadminSrc, `!${path.js.sysadminMinDest}`], series(sysadminScripts));
const watchComponentAdminJs = () => watch([path.js.components.adminSrc, `!${path.js.components.adminMinDest}`], series(componentAdminScript));
const watchComponentLoginJs = () => watch([path.js.components.loginSrc, `!${path.js.components.loginMinDest}`], series(componentLoginScript));
const watchComponentRegisterJs = () => watch([path.js.components.registerSrc, `!${path.js.components.registerMinDest}`], series(componentRegisterScript));
const watchComponentStudentJs = () => watch([path.js.components.studentSrc, `!${path.js.components.studentMinDest}`], series(componentStudentScript));

// this will build in parallel scripts and style
const build = parallel(
    scss,
    minStyle,
    mainScripts,
    adminScripts,
    studentScripts,
    sysadminScripts,
    componentAdminScript,
    componentLoginScript,
    componentRegisterScript,
    componentStudentScript);

// this will watch all scripts and style
const _watch = parallel(
    watchScss,
    watchCss,
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
```
  for mvc application if you want a data structure that will be suited for backward compatibility i will highly recommend to use webpack if you are already using ES6 
