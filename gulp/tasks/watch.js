var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

// the main gulp task
gulp.task('watch', function(){
  browserSync.init({
    server: {
      baseDir: "app"
    }
  });
  
  watch('./app/index.html', function(){
    browserSync.reload();
  });

   watch('./app/assets/styles/**/*.css', function(){
     // next task will trigger the styles task as dependency
     // and will then inject the new css in the browser 
     gulp.start('cssInject');
  });
});

// the second argument ['styles] is an array of dependencies that 
// need to be run before the task itself runs
gulp.task('cssInject', ['styles'], function(){
  // after the dependencies have run pipe the result to browser-sync.stream
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
});


