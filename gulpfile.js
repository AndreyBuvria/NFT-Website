const { src, dest, parallel, series, watch } = require('gulp'),
	sass 		 = require('gulp-sass')(require('sass')),
	concat       = require('gulp-concat'),
	rename       = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	cleancss     = require('gulp-clean-css'),
	browsersync  = require('browser-sync'),
	notify       = require("gulp-notify");


function html() {
	return src('app/index.html')
		.pipe(browsersync.reload({ stream: true }))
}

function js() {
	return src(['app/js/*.js', '!app/js/scripts.min.js']) // Always at the end)
		.pipe(concat('scripts.min.js'))
		// .pipe(uglify()) // Mifify js (opt.)
		.pipe(dest('app/js'))
		.pipe(browsersync.reload({ stream: true }))
};

function browserSync() {
	browsersync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	});
};

function styles() {
	return src('app/scss/**/*.scss')
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
		.pipe(rename({ suffix: '.min', prefix : '', basename: 'style' }))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
		.pipe(dest('app/css'))
		.pipe(browsersync.reload( {stream: true} ))
}

function startwatch() {
	watch('app/scss/**/*.scss', styles);
	//watch('app/scss/main.scss', styles);
	watch('app/js/app.js', js);
	watch('app/*.html', html);
}

exports.styles = styles;
exports.js = js;
exports.html = html;
exports.default = parallel(styles, js, html, browserSync, startwatch);