var gulp = require("gulp"),
	runSequence = require('run-sequence'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');
	paths = {
		destination: "dist/"
	},
	files = {
		minJavascript: [
			"!app/scripts/**/*spec.js",
			"app/scripts/**/*.js"
		]
	}

gulp.task("build", function(cb) {
	runSequence(["build-css","build-js"], cb);
});

gulp.task("build-css", function(){
	gulp.src("css/*.css")	
	.pipe(gulp.dest(paths.destination));
});

gulp.task("build-js", function(){
	gulp.src(files.minJavascript)
	.pipe(uglify())
	.pipe(concat("javascript.min.js"))
	.pipe(gulp.dest(paths.destination));
});