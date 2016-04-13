var ManifestBuilder = require('../manifest_builder.js');
var expect = require('expect');

context('Given a ManifestBuilder with config', function(){
  var config,
    subject;

  before(function(){
    config = { thumbBase: 'localhost:3000/data/small', fullBase: 'localhost:3000/data' };
    subject =  new ManifestBuilder(config);
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
    
    context('the transformed manifest', function(){
      var new_manifest;
      before(function(){
        new_manifest = subject.transform(manifest).manifest;
      });

      it('alters the full image', function(){
        expect(new_manifest[0].full).toBe('localhost:3000/data/foo.jpg');
        expect(new_manifest[1].full).toBe('localhost:3000/data/apple.jpg');
      });

      it('alters the thumb image', function(){
        expect(new_manifest[0].thumb).toBe('localhost:3000/data/small/bar.jpg');
        expect(new_manifest[1].thumb).toBe('localhost:3000/data/small/thumbs/apple.thumb.jpg');
      });
    });
  });

});
