var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var cleanCss = require("gulp-clean-css");
var rename = require("gulp-rename");
var imageMin = require("gulp-imagemin");
var watch = require("gulp-watch");
var concat = require("gulp-concat");


const {series, parallel} = require('gulp');



var path = {
    styles: {
        scss: {
            src: './wwwroot/assets/scss/*.scss',
            dest: './wwwroot/assets/css',
            minDest: './wwwroot/assets/css/*.min.css'
        },
        css: {
            src: './wwwroot/assets/css/*.css',
            dest: './wwwroot/assets/css',
            minDest: './wwwroot/assets/css/*.min.css'
        },
        js: {
            mainSrc: './wwwroot/assets/js/*.js',
            mainDest: './wwwroot/assets/js',
            mainMinDest: './wwwroot/assets/js/*.min.js',
            modelSrc: './wwwroot/assets/js/model/*.js',
            modelDest: './wwwroot/assets/js/model',
            modelMinDest: './wwwroot/assets/js/model/*.min.js',
            vmSrc: './wwwroot/assets/js/viewmodel/*.js',
            vmDest: './wwwroot/assets/js/viewmodel',
            vmMinDest: './wwwroot/assets/js/viewmodel/*.min.js'
        },
        img:{
            src: './wwwroot/assets/img/*',
            dest: './wwwroot/assets/img'
        },
        intl: {
            src: './wwwroot/assets/css/libs/intlTelInput'
        },
        cdn:{
            src: './wwwroot/assets/js/cdnscripts/*.js',
            dest: './wwwroot/assets/js/cdnscripts'
        },
        cdncss:{

            src: './wwwroot/assets/css/cdncss/*.css',
            dest: './wwwroot/assets/css/cdncss'
        }
    }
}


function scssStyles(){
    return gulp.src([path.styles.scss.src, '!' + path.styles.css.minDest])
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest(path.styles.scss.dest));
}

function styles(){
    return gulp.src([path.styles.css.src, '!' + path.styles.css.minDest])
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.styles.css.dest));
}

function mainScripts(){
    return gulp.src([path.styles.js.mainSrc, '!' + path.styles.js.mainMinDest])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.styles.js.mainDest));
}

function modelScripts(){
    return gulp.src([path.styles.js.modelSrc, '!' + path.styles.js.modelMinDest])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.styles.js.modelDest));
}

function vmScripts(){
    return gulp.src([path.styles.js.vmSrc, '!' + path.styles.js.vmMinDest])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.styles.js.vmDest));
}

function imageOptimization(){
    return gulp.src(path.styles.img.src)
        .pipe(imageMin())
        .pipe(gulp.dest(path.styles.img.dest));
}

function SassWatcher(){
    return gulp.watch(path.styles.scss.src, series(scssStyles, styles));
}

function MainScriptWatcher(){
    return gulp.watch(path.styles.js.mainSrc, series(mainScripts));
}
function ModelScriptWatcher() {
    return gulp.watch(path.styles.js.modelSrc, series(modelScripts));
}
function VmScriptWatcher() {
    return gulp.watch(path.styles.js.vmSrc, series(vmScripts));
}

function bundleCss(){
    return gulp.src(path.styles.css.minDest)
        .pipe(cleanCss())
        .pipe(concat("bundle.min.css"))
        .pipe(gulp.dest(path.styles.css.dest));
}

function bundleJs(){
    var app = "./wwwroot/assets/js/app/app.js";
    var model = "./wwwroot/assets/js/model/landing.index.model.min.js";
    var vm = "./wwwroot/assets/js/viewmodel/landing.index.viewmodel.min.js";
    var main = "./wwwroot/assets/js/main.min.js";
    var utils = "./wwwroot/assets/js/utils.min.js";

    return gulp.src([app,model,vm,main])
        .pipe(uglify())
        .pipe(concat("bundle.min.js"))
        .pipe(gulp.dest(path.styles.js.mainDest));
}


function bundleCDN() {
    var bs = "./wwwroot/assets/css/cdncss/bootstrap.min.css";
    var amiko = "./wwwroot/assets/css/cdncss/amiko.css";
    var anaheim = "./wwwroot/assets/css/cdncss/anaheim.css";
    var lato = "./wwwroot/assets/css/cdncss/lato.css";
    var monserrat = "./wwwroot/assets/css/cdncss/monserrat.css";
    var sourcesanspro = "./wwwroot/assets/css/cdncss/sourcesanspro.css";
    var animate = "./wwwroot/assets/css/cdncss/animate.min.css";
    var flipclock = "./wwwroot/assets/css/cdncss/flipclock.min.css";
    var fontawesome = "./wwwroot/assets/css/cdncss/font-awesome.min.css";

    return gulp.src([bs,amiko,anaheim,lato,monserrat,sourcesanspro,animate,flipclock])
        .pipe(cleanCss())
        .pipe(concat("cdnbundle.min.css"))
        .pipe(gulp.dest(path.styles.cdncss.dest));
}

var build = series(scssStyles, parallel(styles, mainScripts, modelScripts, vmScripts, bundleJs, bundleCss));

var bundler = series(bundleJs);

gulp.task('bundle', bundler);

gulp.task('build', build);

gulp.task('default', build);

var watcher = parallel(SassWatcher, MainScriptWatcher, ModelScriptWatcher, VmScriptWatcher, bundleCss);

gulp.task('watch', watcher);
gulp.task('watch-sass', gulp.series(SassWatcher));
gulp.task('watch-js', gulp.series(MainScriptWatcher));

