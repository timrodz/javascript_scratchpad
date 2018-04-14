# Electron shopping list

## Usage

1. Initialize the repo: `npm init`
2. Install electron: `npm install electron --save-dev`
3. Run program: `npm start`

## Building electron

1. Install electron packager: `npm install electron-packager --save-dev`
2. Alternatively, install electron packager globally: `npm install electron-packager -g`
3. Build native app: `npm run package-PLATFORM_NAME`

### Build scripts

Add the following to package.json -> "scripts"

``` json
"package-mac": "electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds",
"package-win": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName=\"Electron Tutorial App\"",    
"package-linux": "electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds"
```

#### Installing wine (Build to Windows from Mac)

- The following tutorial is helpful: [link](https://www.davidbaumgold.com/tutorials/wine-mac/)