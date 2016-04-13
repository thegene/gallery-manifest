function ManifestBuilder(config){
  this.thumbBase = config.thumbBase;
  this.fullBase = config.fullBase;

  this.thumb = function(thumb){
    return this.thumbBase + '/' + thumb;
  }

  this.full = function(full){
    return this.fullBase + '/' + full;
  }

  this.transform = function(data){
    manifest = data.manifest;
    build = [];
    for (var i in manifest) {
      var entry = manifest[i];
      build.push({
        thumb: this.thumb(entry.thumb),
        full: this.full(entry.full)
      })
    };
    return { manifest: build };
  }
}

module.exports = ManifestBuilder;
