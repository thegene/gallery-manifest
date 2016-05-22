var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var clean = require('gulp-clean');
var ManifestBuilder = require('./manifest_builder.js');
var through = require('through2');
var rename = require('gulp-rename');

gulp.task('default', ['build']);

gulp.task('build', ['environment', 'clean'], function(){
  fs.readdir(path.join(__dirname, 'galleries'), function(error, files){
    if (error) {
      throw 'no galleries found?' + error.message
    } else {
      files.forEach(function(gallery){
        build(gallery);
      });
    }
  });
});

gulp.task('clean', function(){
  return gulp.src('config/*', { read: false })
    .pipe(clean());
});

var config_dir;

gulp.task('environment', function(){
  return config_dir = process.env.CONFIG_DIR || 'config';
});

var build = function(gallery){
  console.log('Building ' + gallery);

  config = require(path.join(galleryPath(gallery), 'config.json'));
  var manifestPath = path.join(galleryPath(gallery), 'manifest.json');

  withEachEnv(config, function(env, envConf) {
    builder = new ManifestBuilder(envConf);
    gulp.src(manifestPath)
      .pipe(through.obj(function(data, encoding, done){
        original = JSON.parse(data.contents.toString());
        new_manifest = builder.transform(original);
        data.contents = new Buffer(JSON.stringify(new_manifest));
        this.push(data);
        done();
      }))
      .pipe(rename(gallery + '/' + env + '.json'))
      .pipe(gulp.dest(config_dir));
   });
}

var withEachEnv = function(config, callback){
  for (env in config) {
    if (config.hasOwnProperty(env)){
      callback(env, config[env]);
    }
  }
}

var galleryPath = function(gallery) {
  return path.join(__dirname, 'galleries', gallery);
}

var galleryDestPath = function(gallery, env){
  return path.join(__dirname, config_dir, gallery, env + '.json');
}
