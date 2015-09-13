# debugIt

[![Build Status](https://travis-ci.org/arjunmehta/node-debugIt.svg?branch=master)](https://travis-ci.org/arjunmehta/node-debugIt)

A no frills console debugger for Node.

Use this module when you want to selectively choose when you want to enable logging to your console. This is a handy little tool for debugging works in progress, or to only show logs when running tests.

Heavily inspired by [visionmedia/debug](https://github.com/visionmedia/debug). But instead of enabling debugging in your terminal environment, you enable debugIt in your code.

- **Works across exports within your project**
- **Semi-Unique colors for different debug namespaces**
- **An easy to use, simple interface**

**Note:** *This module is only for command line debugging.*

## Installation
```bash
npm install --save debugit
```

## Basic Usage

### Set Up Namespaces
You can set up your debug logs using the `debugit.add(namespaceName)` method. They won't get printed to the console until debugIt is enabled globally.

```javascript
var debugMain = require('debugit').add('debugit:main')
var debugSecondary = require('debugit').add('debugit:secondary')
```


### Write to Your Namespaces
Now you can write to these namespaces. Each namespace will be presented in a color based on its name, so you can tell them apart.

```javascript
var x = 5
var y = 'something else'

debugMain('what is the value of x?', x, 'is the value of x.')
debugSecondary('what is the value of y?', y, 'is the value of y.')
```


### Enable It
Finally in your **`main.js`** or test file, at the very very top, just enable debugIt when you want to enable the logs.

```javascript
var debugIt = require('debugit').enable()
```

**Note:** *Currently there's no way to selectively choose which namespaces to turn on.*


## License
The MIT License (MIT)

Copyright (c) 2014 Arjun Mehta
