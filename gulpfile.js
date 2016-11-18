'use strict';
var gulp = require("gulp"),
	runSequence = require('run-sequence'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass');

var paths = {
	destination: "dist/",

	files: {
		minJavascript: [ "!app/scripts/**/*spec.js",
							"app/scripts/**/*.js"],

		stylesheets: ["stylesheets/*.scss", "node_modules/bootstrap/scss/bootstrap.scss"],
		dependencies: ["node_modules/bootstrap/dist/js/bootstrap.min.js",
						"node_modules/jquery/dist/jquery.min.js"]
	}
}

gulp.task("build", function(cb) {
	runSequence(["build-sass","build-js","build-dependencies"], cb);
});

gulp.task("build-sass", function(){
	return gulp.src(paths.files.stylesheets)
	.pipe(sass({outputSyle: 'compressed'}).on('error',sass.logError))
	.pipe(gulp.dest(paths.destination));
});

gulp.task("build-js", function(){
	return gulp.src(paths.files.minJavascript)
	.pipe(uglify())
	.pipe(concat("javascript.min.js"))
	.pipe(gulp.dest(paths.destination));
});

//for now it just moves the the bootstrap.min.js from the node_modules to dist. 
gulp.task("build-dependencies", function(){
	return gulp.src(paths.files.dependencies)
	.pipe(gulp.dest(paths.destination));
});