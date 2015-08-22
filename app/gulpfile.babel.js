// generated on 2015-08-22 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('build/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist/styles'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}

gulp.task('lint', lint('build/scripts/**/*.js'));

gulp.task('vendor-js', function()
{
  var scripts = ['bower_components/dist/*.min.js',
                  'bower_components/react/*.min.js',
                'bower_components/react-router/build/umd/*.min.js'];

  return gulp.src(scripts).pipe($.concat('vendor.js')).pipe(gulp.dest('dist/scripts'))
});

gulp.task('templates', function () {
  return gulp.src('build/scripts/*.jsx')
    .pipe($.react())
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('html', ['styles', 'templates'], () => {
  return gulp.src('build/*.html')
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('build/images/**/*')
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('build/fonts/**/*'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'build/*.*',
    '!build/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});



gulp.task('serve',['build'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });

  gulp.watch([
    'build/*.html',
    'build/scripts/**/*.js',
    'build/scripts/**/*.jsx',
    'build/images/**/*',
    'build/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('build/styles/**/*.scss', ['styles']);
  gulp.watch('build/scripts/**/*.jsx', ['templates', reload]);
  gulp.watch('build/*.html', ['html', reload]);
  gulp.watch('build/scripts/**/*.js', ['lint', reload]);
  gulp.watch('build/fonts/**/*', ['fonts']);
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras', 'vendor-js'], () => {
  return;
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
