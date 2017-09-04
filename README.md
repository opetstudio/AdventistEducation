
Adventist Education Digital Assistant for School Reporting

### Install

  git clone https://github.com/opetstudio/AdventistEducation.git

  cd AdventistEducation

  npm install

### Start Android (MobileApp)

  react-native run-android

### Start Website (WebApp)

  npm run start-web

### Start Electron (DesktopApp)

  npm run start-web

  //on other terminal

  npm run electron




### Error Troubleshooting

  error: bundling failed: "Unable to resolve module `react-native` from `index.android.js`: Module does not exist in the module map or in these directories: node_modules. This might be related to https://github.com/facebook/react-native/issues/4968 To resolve try the following:  1. Clear watchman watches: `watchman watch-del-all`. 2. Delete the `node_modules` folder: `rm -rf node_modules && npm install`.  3. Reset packager cache: `rm -fr $TMPDIR/react-*` or `npm start -- --reset-cache`."

  ==> duplicat file error
  I think node_modules/react-native/local-cli/bundle/assetPathUtils.js is need to update to this :

  function getAndroidAssetSuffix(scale) {
    switch (scale) {
      case 0.75: return 'ldpi';
      // case 1: return 'mdpi';
      case 1: return 'mdpi-v4';
      case 1.5: return 'hdpi';
      case 2: return 'xhdpi';
      case 3: return 'xxhdpi';
      case 4: return 'xxxhdpi';
    }
  }
