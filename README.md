# labmap Chrome Extension

> [labmap](https://github.com/tomasz-miskow/labmap) ported to Chrome

## :mag: About

This project is [labmap](https://github.com/tomasz-miskow/labmap) by @tomasz-miskow redesigned
to be fully-featured Chrome extension!

The extension allows you to track computer labs at @MIMUW and more!<br>
It utilizes awesome labmap api hosted by @tomasz-miskow :rocket:

This project is maintained in free time. **Feel free to contribute and open new issues!**

## :trophy: Features

* See what computers and labs are currently free :cat:
* View incoming courses inside labs :smile:
* Connect to `students.mimuw.edu.pl` machine via SSH with one button (needs external extension) :+1:
* View users currently sitting in labs :tada:

## :package: Installation

This extension is currently not available in Chrome Store.<br>
Only way to use it is to manually build the sources and load unpacked extension.

## :bulb: Development

**To install all dependencies please enter:**
```bash
# clone it
$ git clone https://github.com/styczynski/labmap-chrome.git

# Install dependencies
$ yarn install
```

**To build dev version and start hot reload server please type:**

```bash
# build files to './dev'
# start webpack development server
$ yarn run dev
```

**Now navigate to Settings->Extensions inside Chrome and select "Load unpacked" then specify the /dev folder**

The extension should be now visible inside Chrome.

**Note: You must enable Developer Options to load unpacked extensions**

## :hammer: Build

```bash
# build files to './build'
$ yarn run build
```

## :straight_ruler: Compress

```bash
# compress build folder to {manifest.name}.zip and crx
$ yarn run build
$ yarn run compress -- [options]
```
