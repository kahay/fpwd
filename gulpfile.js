const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const fs = require("fs");
const path = require("path");

const paths = {
  scss: "src/scss/**/*.scss",
  css: "dist/css",
  js: "src/js/**/*.js",
  jsDest: "dist/js",
  fonts: "src/fonts/**/*.{woff,woff2,ttf,otf,eot,svg}",
  fontsDest: "dist/fonts",
  swiperCss: "node_modules/swiper/swiper-bundle.min.css",
  swiperJs: "node_modules/swiper/swiper-bundle.min.js",
  bootstrapJs: "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
};

function fonts(done) {
  const sourceFiles = fs.readdirSync("src/fonts");
  sourceFiles.forEach((file) => {
    const srcPath = path.join("src/fonts", file);
    const destPath = path.join("dist/fonts", file);
    fs.copyFileSync(srcPath, destPath);
  });
  browserSync.reload();
  done();
}

function styles() {
  return gulp
    .src([paths.swiperCss, "src/scss/all.scss"])
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(concat("all.min.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.css))
    .on("end", () => browserSync.reload());
}

function scripts() {
  return gulp
    .src([paths.bootstrapJs, paths.swiperJs, paths.js])
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .on("error", function (err) {
      console.error(err.toString());
      this.emit("end");
    })
    .pipe(concat("main.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(browserSync.stream());
}

function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });

  gulp.watch("src/scss/**/*.scss", styles);
  gulp.watch(paths.js, scripts);
  gulp.watch(paths.fonts, fonts);
  gulp.watch("./*.html").on("change", browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.watch = gulp.series(styles, scripts, fonts, watchFiles);
exports.default = gulp.series(styles, scripts, fonts, watchFiles);
