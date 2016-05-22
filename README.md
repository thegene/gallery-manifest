# GALLERY MANIFEST
Builds config manifests for the Gallery app here: https://github.com/thegene/gallery

## BUILD
each manifest exists as a directory in the root directory of the app. Each manfiest has a `manifest.json` file and a config.json file, which when used together can build environment specific manifest files within the root `config` directory. The config.json file should look something like this:
```
{
  "development": {
    "thumbBase": "/path/to/thumbs",
    "fullBase": "/path/to/images" 
  },
  "production": {
    "thumbBase": "mediaserver:3000",
    "fullBase": "mediaserver:3000/full/images"
  }
}
```
With the above config file, the resulting gallery would have two manifest files: `development.json` and `production.json` each with the `manifest.json` image files being prepended by their corresponding base configs.

### Usage
```
gulp build
```

## WITH DOCKER
Run using the docker repo thegene/gallery-manifests. The resulting `config` directory described above will be built at `/config`

```
Docker run -d \
-v /PATH/TO/CONFIGDIR:/config \
thegene/gallery-manifests
```
