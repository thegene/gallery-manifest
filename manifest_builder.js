var through = require('through2');

function ManifestBuilder(config){
  var thumbBase = config.thumBase;
  var fullBase = config.fullBase;

  return through.obj(function(data, encoding, done){
    var manifest = JSON.parse(data.contents.toString()).manifest;
    console.log(manifest);
    done();
  });
}

module.exports = ManifestBuilder; 
