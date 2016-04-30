# GALLERY MANIFEST
Builds config manifests for the Gallery app here: https://github.com/thegene/gallery

## BUILD
each manifest exists as a directory in the root directory of the app. Each manfiest has a `manifest.json` file and a config directory directory, which when used together can build environment specific `manifest.json` files within the root `config` directory.

Run the `gulp build` command, specifying a `GALLERY` and optionally the `NODE_ENV` (assumes `development`)
```
  GALLERY=wedding NODE_ENV=development gulp build
```

This will look at the `wedding/config/development.json` file to get the `thumbBase` and `fullBase` config options, and prepends to the `thumb` and `full` settings in the `wedding/manifest.json` file.
