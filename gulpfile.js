var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var clean = require('gulp-clean');
var ManifestBuilder = require('./manifest_builder.js');
var gutil = require('gulp-util');
var debug = require('gulp-debug');

var env,
  gallery;

gulp.task('build', ['config', 'clean'], function(){
  builder = new ManifestBuilder(config());
  gulp.src(path.join(__dirname, 'wedding', 'manifest.json'))
   .pipe(debug({minimal: false}))
   .pipe(builder.stream)
   .pipe(gulp.dest('config/'))
});

gulp.task('clean', function(){
  gulp.src('config/*', { read: false })
    .pipe(clean());
});

var manifestFromStream = function(stream){
  return JSON.parse(stream.contents.toString()).manifest;
}

var buildFrom = function(stream){
  var build = [];
  manifestFromStream(stream).forEach(function(picture){
    build.push(buildPicture(picture));
  });

  return build;
};

var buildPicture = function(picture){
  return {
    thumb: config.thumbBase + '/' + picture.thumb,
    full: config.fullBase + '/' + picture.full
  };
};

gulp.task('environment', function(){
  env = process.env.node_env || 'development';
  gallery = process.env.GALLERY;
  
  if (!gallery) {
    throw 'Must specify a GALLERY';
  } else {
    // naive avoidance of messing with changing directories
    env = env.replace('.', '');
    gallery = gallery.replace('.', '');
  }
});

var config = function(){
  console.log('Using config from ' + config_path);
  config_path = path.join(__dirname, gallery, 'config', env + '.json');
  try {
    data = fs.readFileSync(config_path);
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
};

gulp.task('config', ['environment'], function(){
  config_path = path.join(__dirname, gallery, 'config', env + '.json');
  return fs.readFile(config_path, function(err, data){
    if (!err) {
      console.log('Using config from ' + config_path);
      config = JSON.parse(data);
      console.log(config);
    } else {
      console.log(err.message);
    }
  });
});
