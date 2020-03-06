const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
const autoprefixer = require('gulp-autoprefixer')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const webserver = require('gulp-webserver')
const cssHandler = () => {
  return gulp.src('./src/css/*.css')   
             .pipe(autoprefixer())   
             .pipe(cssmin())  
             .pipe(gulp.dest('./dist/css'))  
}
const jsHandler = () => {
  return gulp.src('./src/js/*.js') 
             .pipe(babel({
               presets: ['@babel/env']
             })) 
             .pipe(uglify()) 
             .pipe(gulp.dest('./dist/js')) 
}
const mockHandler = () => {
	return gulp.src('./src/mock/*.json')
			 .pipe(gulp.dest('./dist/mock'))
}
const htmlHandler = () => {
  return gulp.src('./src/pages/*.html') 
             .pipe(htmlmin({ 
               removeAttributeQuotes: true, 
               removeComments: true, 
               collapseBooleanAttributes: true, 
               collapseWhitespace: true, 
               minifyCSS: true, 
               minifyJS: true, 
             })) 
             .pipe(gulp.dest('./dist/pages')) 
}
const imgHandler = () => {
  return gulp.src('./src/images/**') 
             .pipe(gulp.dest('./dist/images')) 
}
const libHandler = () => {
  return gulp.src('./src/lib/**')
             .pipe(gulp.dest('./dist/lib'))
}
const delHandler = () => {
  
  return del(['./dist'])
}
const serverHandler = () => {
  return gulp.src('./dist') 
             .pipe(webserver({ 
               host: '127.0.0.1', 
               port: 8080, 
               open: './pages/index.html', 
               livereload: true, 
             })) 
}
const watchHandler = () => {
  gulp.watch('./src/css/*.css', cssHandler)
  gulp.watch('./src/js/*.js', jsHandler)
  gulp.watch('./src/pages/*.html', htmlHandler)
  gulp.watch('./src/lib/**', libHandler)
  gulp.watch('./src/images/**', imgHandler)
}
module.exports.default = gulp.series(
  delHandler,
  gulp.parallel(cssHandler, jsHandler, htmlHandler, imgHandler, libHandler,mockHandler),
  serverHandler,
  watchHandler
)