var through = require('through2');

function ManifestBuilder(config){
  var thumbBase = config.thumbBase;
  var fullBase = config.fullBase;

  var prependBase = function(base, file){
    return base + '/' + file;
  }

  var thumb = function(thumb){
    return prependBase(thumbBase, thumb);
  }

  var full = function(full){
    return prependBase(fullBase, full);
  }

  var buildFile = function(file, manifest){
    file.contents = new Buffer(JSON.stringify({ manifest: manifest }));
    return file;
  }

  this.stream = through.obj(function(data, encoding, done){
    build = [];
    console.log(thumbBase);
    manifest = JSON.parse(data.contents.toString()).manifest;
    for (var i in manifest) {
      var entry = manifest[i];
      build.push({
        thumb: thumb(entry.thumb),
        full: full(entry.full)
      })
    };
    this.push(buildFile(data, build));
    done();
  });
}

module.exports = ManifestBuilder;
