# Mocsky
**[Mocksy](https://slightlytyler.github.io/mocksy)** is an app for easily and quickly creating mockups with your screenshots.

![alt tag](https://raw.github.com/slightlytyler/mocksy/master/screenshot.png)

## Install

Install dependencies.

```bash
$ npm install
```


## Run

Run this two commands __simultaneously__ in different console tabs.

```bash
npm run hot-server
npm run start-hot
```

#### Toggle Chrome DevTools

- OS X: <kbd>Cmd</kbd> <kbd>Alt</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Linux: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>
- Windows: <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>I</kbd> or <kbd>F12</kbd>

#### Toggle Redux DevTools

<kbd>Ctrl+H</kbd>

## Package

```bash
npm run package
```

#### Options

- --name, -n: Application name (default: ElectronReact)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms
