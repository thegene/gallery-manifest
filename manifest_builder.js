var through = require('through2');

function ManifestBuilder(config){
  var thumbBase = config.thumBase;
  var fullBase = config.fullBase;

  return through.obj(function(data, encoding, done){
    console.log(data.contents.toString());
    done();
  });
}

module.exports = ManifestBuilder; 
