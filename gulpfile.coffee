gulp   = require 'gulp'
prefix = require 'gulp-autoprefixer'
concat = require 'gulp-concat'
sass   = require 'gulp-ruby-sass'

path =
  javascripts: [
    './client/javascripts/woodenhorse/queue.js'
    './client/javascripts/woodenhorse/linked-list.js'
    './client/javascripts/woodenhorse/woodenhorse.js'
    './client/javascripts/document.js'
  ]
  stylesheets: [
    './client/stylesheets/*.scss'
    './client/stylesheets/woodenhorse/woodenhorse.scss'
  ]

gulp.task 'scripts', ->
  gulp.src path.javascripts
    .pipe concat 'application.js'
    .pipe gulp.dest './app/build/javascripts'

gulp.task 'styles', ->
  gulp.src path.stylesheets
    .pipe sass
      style: 'expanded'
    .pipe prefix '> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'
    .pipe concat 'style.css'
    .pipe gulp.dest './app/build/stylesheets'

gulp.task 'watch', ->
  opts = debounceDelay: 4000
  gulp.watch path.javascripts, opts, ['scripts']
  gulp.watch path.stylesheets, opts, ['styles']

gulp.task 'bower', ->
  gulp.src([
    './bower_components/jquery/dist/jquery.min.js'
    './bower_components/bootstrap/dist/js/bootstrap.min.js'
  ]).pipe gulp.dest './app/build/javascripts'

  gulp.src([
    './bower_components/bootstrap/dist/css/bootstrap.min.css'
    './bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
  ]).pipe gulp.dest './app/build/stylesheets'

  gulp.src([
    './bower_components/bootstrap/dist/fonts/*'
  ]).pipe gulp.dest './app/build/fonts'

# The default task (called when you run `gulp` from cli)
gulp.task 'default', []
