var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var clean = require('gulp-clean');
var ManifestBuilder = require('./manifest_builder.js');

var env, gallery;

gulp.task('build', ['config', 'clean'], function(){
  gulp.src('wedding/manifest.json').pipe(ManifestBuilder(config));
});

gulp.task('clean', function(){
  gulp.src('build', { read: false })
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

var config = {};
gulp.task('config', ['environment'], function(){
  config_path = path.join(__dirname, gallery, 'config', env + '.json');
  fs.readFile(config_path, function(err, data){
    if (!err) {
      console.log('Using config from ' + config_path);
      config = JSON.parse(data);
    } else {
      console.log(err.message);
    }
  });
});
