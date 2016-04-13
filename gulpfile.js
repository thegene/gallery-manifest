var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var clean = require('gulp-clean');
var ManifestBuilder = require('./manifest_builder.js');
var through = require('through2');

var env,
  gallery;

gulp.task('default', ['build']);

gulp.task('build', ['environment', 'clean'], function(){
  builder = new ManifestBuilder(config());
  gulp.src(path.join(__dirname, 'wedding', 'manifest.json'))
    .pipe(through.obj(function(data, encoding, done){
      original = JSON.parse(data.contents.toString());
      new_manifest = builder.transform(original);
      data.contents = new Buffer(JSON.stringify(new_manifest));
      this.push(data);
      done();
    }))
   .pipe(gulp.dest('config/'))
});

gulp.task('clean', function(){
  gulp.src('config/*', { read: false })
    .pipe(clean());
});

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
  config_path = path.join(__dirname, gallery, 'config', env + '.json');
  console.log('Using config from ' + config_path);
  try {
    data = fs.readFileSync(config_path);
    return JSON.parse(data);
  } catch (err) {
    console.log(err.message);
  }
};
