var ManifestBuilder = require('../manifest_builder.js');
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var expect = require('expect');

context('Given a ManifestBuilder with config', function(){
  var config,
    subject;

  before(function(){
    config = { thumbBase: 'localhost:3000/data/small', fullBase: 'localhost:3000/data' };
    subject = ManifestBuilder(config);
  });

  context('when piped a manifest JSON stream', function(){
    var manifest = { manifest: [
      {
        full: 'foo.jpg',
        thumb: 'bar.jpg'
      },
      {
        full: 'apple.jpg',
        thumb: 'thumbs/apple.thumb.jpg'
      }
    ]};

    var manifest_src = path.join(__dirname, 'test_manifest.json');
    var new_manifest;

    before(function(){
      fs.writeFileSync(manifest_src, JSON.stringify(manifest));
      gulp.src(manifest_src).pipe(subject).pipe(gulp.dest(__dirname));
      new_manifest = JSON.parse(fs.readFileSync(manifest_src)).manifest;
    });

    after(function(){
      fs.unlink(manifest_src);
    });

    it('transforms full file names', function(){
      expect(new_manifest[0].full).toBe('localhost:3000/data/foo.jpg');
    });
  });

});
