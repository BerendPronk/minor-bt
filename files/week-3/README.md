# Progressive Enhancement build on a drag 'n drop grocery list
To improve on my knowledge of progressive enhancement and accessibility on the web, and to finish the [browser technologies](https://github.com/BerendPronk/minor-bt) course, I decided to create a prototype of a small application to add groceries. More specifically, to add groceries needed to make a grilled cheese sandwich.

## First steps
If you want to give this prototype a try, feel free to do so! Type the following command in your terminal.

```shell
$ git clone https://github.com/BerendPronk/minor-bt
```

Then navigate to this specific folder, within the folder you just cloned this repository in, within the same teminal window:

```shell
$ cd minor-bt/files/week-3
```

Some dependencies are not included in this repository. That's why yo need to install them first. Do this by typing:

```shell
$ npm install
```

When everything is installed properly, it means you can run the application. By typing this final command, the application is ready to be experienced on http://localhost:2000.

```shell
$ nodemon server
```

## Implemented features
The development started on an IE5 emulation within IE11 on a Windows 10 machine. This is not completely accurate, but it does notice every piece of code that should break on real IE5 browsers, by checking what features the original offers.  
This left me we nothing but a few old selectors, loops and functions I hadn't touched in a while.

The main purpose of the prototype, the drag 'n drop feature, of course wasn't possible back in the old days. I needed to come up with something that provides the user with a close enough experience of the intended use. While dragging nor dropping is possible in old browsers, checking inputs via labels is.  
I started out by creating a simple layout, with, more than I'd like, `float` declarations in it. These floats would be cancelled by the `display: flex;` styling I provided for newer browsers. This layout also made sure the product-labels had an acceptable styling across browsers.

With the styling and the list of checkbox inputs in place, the server-side request-handling could be created. I chose to do all of this server-side, so every browser, and user with no access to the prototype's JavaScript, could potentially run it. And it did.  
The request-handling was done with [`express`](https://www.npmjs.com/package/express) and [`body-parser`](https://www.npmjs.com/package/body-parser), via Node.js.

So the prototype works in on older systems, what's next? I implemented a feature detection for the HTML-attribute `draggable`, which looks like this:

```javascript
// JavaScript

// Detects if browser is capable of draggig elements around.
// Created element could be anything. I chose <p>, because why not!
if ('draggable' in document.createElement('p')) {
  // product-labels can be dragged
}
```

#### Support for `draggable`
Almost every browser suppoorts it, but that doesn't mean the others should be ignored in any way.

##### Desktop
- [ ] < IE10
- [x] IE10+
- [x] Edge
- [x] Google Chrome
- [x] Mozilla Firefox (2.0)
- [x] OSX Safari
- [x] Opera

#### Mobile
- [x] IE Mobile
- [x] Android
- [x] Chrome for Android
- [x] Firefox Mobile (1.0)
- [x] iOS Safari
- [x] Opera Mini

The specific functionality of the drag 'n drop feature doesn't need to be specified, but you can [take a look at the code](https://github.com/BerendPronk/minor-bt/blob/master/files/week-3/public/js/script.js).

## Accessibility report
...

### JavaScript
...

### Colour
...

### Keyboard navigation
...

### Screenreader

## Support
...

### Device laboratory
...
