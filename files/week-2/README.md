# Progressive Enhancement build on HTML, CSS and JavaScript functionalities
Modern browsers have a lot of tricks up their sleeves, some of which are no recognized by different browsers or older versions of the same one. Meaning that users won't be able to experience a website or application as intended. Therefore developers need to progressively enhance an application, to provide for as much users as possible.

By detecting modern features, it's possible to set fallbacks for browsers that do not support the features in question. For this course of the minor 'Everything Web', I experimented with different HTML, CSS and JavaScript code to create fallbacks to.

All demos were tested in `Google Chrome 57`, `Opera`, `Mozilla Firefox` and `Internet Explorer 7`. Of course there are plenty of other browsers out there, but my philisophy is: "If it works in `Internet Explorer 7`, it (probably) works everywhere."

## HTML - Attribute detection (`required`)
Ever since HTML5, forms can have basic validation without the use of extra JavaScript. This is done by setting attributes in the input that need validation. These attributes include `required`, `min and max`, and `pattern`. I decided to create a fallback for the `required` attribute. This is not supported by `Internet Explorer 7`, and, because of a bug, `Apple Safari 10`.

By detecting this feature with JavaScript, I set and alternative for when this feature is not found. When the required inputs don't have any value on a submit, the JavaScript detects that and provides the user with feedback. In the following example, this is done on a single input with a set id. Though, it is possible to do this with a `data-required="true"` on every desired input; checking every input with that attribute on it's value when the form has been submitted. And yes, that will work in `Internet Explorer 7`.

```javascript
// JavaScript

var input = document.getElementById('input');
var submit = document.getElementById('submit');
var feedback = document.getElementById('feedback');
var form = document.forms[0];

if (!('required' in document.createElement('input'))) {
  form.onsubmit = function() {
    if (input.value === '') {
      feedback.innerText = 'Please fill in the form.';
      feedback.style.display = 'block';
    } else {
      feedback.style.display = 'none';
    }
    event.returnValue = false;
  }
}
```

For the complete code, [navigate to `html-attributes.html`](https://github.com/BerendPronk/minor-bt/blob/master/files/week-2/html-attributes.html) in this repository.

[HTML - Attribute detection (`required`) demo](https://berendpronk.github.io/minor/bt/files/week-2/html-attributes/)

## HTML - `output`
The `<output>` tag is also a new addition to HTML5, so, again, older browsers will not support it. In order to show the output on the user's screen, it is necessary to create some other tag, like a `<p>`, or a `<span>`, and insert the desired output in it via JavaScript.

There really is not much else to it. I basically add a new tag without the important semantics that the `<output>` tag already has.

```html
<!-- HTML -->

<form>
  <fieldset>
    <label>
      Square root
      <input id="input" type="text">
    </label>
    <output name="result"></output>
    <span id="output"></span>
    <button id="submit" type="submit">Submit</button>
  </fieldset>
</form>
```

```javascript
// JavaScript

var input = document.getElementById('input');
var output = document.getElementById('output');
var submit = document.getElementById('submit');
var form = document.forms[0];

if (typeof form['result'] !== 'undefined' ) {
  form.addEventListener('submit', function(e) {
    form['result'].value = '= ' + input.value * input.value;
    e.preventDefault();
  }, false);
  } else {
    form.onsubmit = function() {
      output.innerText = '= ' + input.value * input.value;
      event.returnValue = false;
   }
}
```

For the complete code, [navigate to `html-output.html`](https://github.com/BerendPronk/minor-bt/blob/master/files/week-2/html-output.html) in this repository.

[HTML - `output` demo](https://berendpronk.github.io/minor/bt/files/week-2/html-output)

## CSS - `filter` property
Developers are now able to add all sorts of filters to DOM-elements, made possible by the CSS `filter` property. With a single declaration of CSS, an image, section or the entire page can be converted to black and white, have changes in contrast, or have a blurred layer on top.

This CSS functionality came with CSS3, and is not supported by all versions of `Internet Explorer` and `Opera Mini`. `Microsoft Edge` almost supports it fully, it only fails on the `url()` value, whichs takes SVG-filters and applies them wherever you want.

In this specific demo, I've set a `greyscale(100%)` filter to a full-colour image, in order to make it black-and-white. Browsers that don't support CSS-filters, show the full-colour image to the user. To bypass this, I already made an image with the filter applied in Adobe Photoshop. This image will be shown on default when the user is presented with the page. However, if a browser supports the `filter` propery, the static black-and-white image will be hidden, to be replaced by the dynamic version. This dynamic version can be altered with CSS animation or JavaScript for more possibilities!

```css
/* CSS */

#fallback {
  display: block;
}
#original {
  display: none;
}
#original img {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}

@supports (filter: grayscale(100%)) {
  #fallback {
    display: none;
  }
  #original {
    display: block;
  }
}
```

For the complete code, [navigate to `css-filter.html`](https://github.com/BerendPronk/minor-bt/blob/master/files/week-2/css-filter.html) in this repository.

[CSS - `filter` property demo](https://berendpronk.github.io/minor/bt/files/week-2/css-filter)

## CSS - `display: flex`
A very useful way to create layout with CSS, is Flexbox. Activated by declaring `display: flex;` on the desired element, the layout can look very different with the addition of just a few properties like; `flex-wrap`, `flex-direction`, `justify-content` and `align-items`.
However, flexbox is not supported by all browsers. Older versions of `Internet Explorer` do not support it, and the latest versions have been shipped with a lot of bugs present.

In order to make it work on `Internet Explorer 7` I needed to replicate the desired outcome of the flex-properties I've set for the modern browsers, which is:

```css
/* CSS (Initial) */

ul {
  width: 30em;
  margin: 0 auto;
  padding: 0;
}
ul li {
  width: 25%;
  text-align: center;
  padding: 2em 0;
  font-family: sans-serif;
  font-size: 1.4em;
  color: #fff;
  list-style-type: none;
  background-color: #d6a002;
}
```

Followed by adding the next declarations on top of the initial CSS.

```css
/* CSS (Flexbox supported) */

ul {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
```

And the next code as a fallback for the older browsers.

```css
/* CSS (Flexbox not supported) */

ul {
  text-align: justify;
}
ul li {
  display: block;
  float: right;
  margin-right: 12.5%;
}
ul li:first-child {
  margin-right: 0;
}
```

With the addition of `transform` properties, it'd be possible to do a lot more with replication flexbox. But this CSS feature is not supported by `Internet Explorer 7`. Replicating that, would result in a layout with a lot of floats, fixed widths and buggy content. Besides, it'd give me a proper headache and the final layout will not be reponsive to mobile devices at all.

For the complete code, [navigate to `css-flexbox.html`](https://github.com/BerendPronk/minor-bt/blob/master/files/week-2/css-flexbox.html) in this repository.

[CSS - `display: flex` demo](https://berendpronk.github.io/minor/bt/files/week-2/css-flexbox/)

## JavaScript - `fetch()`
The Fetch API makes it easy to make calls to external API's. It is a modern version of the `XMLHttpRequest`, but is a `Promise` in itself. This feature is not supported by any version of `Internet Explorer`, but also not by `Apple Safari 10` and `iOS Safari 10.2`, the current versions by the time this readme was written.

Whenever Fetch is not supported, a reqeust should be made via `XMLHttpRequest` instead. This can be achieved by trying to detect the Fetch API with JavaScript and setting the fallback if the `if`-statement returns `undefined`.

```javascript
// JavaScript

// Adds script to parse JSON is it doesn't exist
// Source: http://stackoverflow.com/questions/4935632/parse-json-in-javascript/4935684
if (!window.JSON) {
  document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/json3/3.2.4/json3.min.js"><\/script>');
}

var results = document.getElementById('results');
var noSupport = document.getElementById('no-support');

if (window.fetch) {
  fetch('http://api.giphy.com/v1/stickers/search?q=' + getBrowser() + '&api_key=dc6zaTOxFJmzC')
    .then(function(response) {
      if (response.status !== 200) {
        console.error('There was an error trying to collect data', reponse.status);
      }
      
      response.json()
        .then(function(data) {
          var giphys = data.data;
          
          giphys.map(function(giphy) {
            var li = document.createElement('li');
            var img = document.createElement('img');
            
            img.src = giphy.images.downsized_medium.url;
            
            li.appendChild(img);
            results.appendChild(li);
          });
          
         noSupport.style.display = 'none';
        })
      })
} else if (window.XMLHttpRequest) {
  var req = new XMLHttpRequest();
  
  req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(req.responseText).data;
      
      for (var i = 0; i < data.length; i++) {
        var li = document.createElement('li');
        var img = document.createElement('img');
        
        img.src = data[i].images.downsized_medium.url;
        
        li.appendChild(img);
        results.appendChild(li);
      }
      
      noSupport.style.display = 'none';
    }
  };
  
  req.open('GET', 'http://api.giphy.com/v1/stickers/search?q=' + getBrowser() + '&api_key=dc6zaTOxFJmzC', true);
  req.send();
}
```

When JavaScript is not loaded entirely, the user should still be able to get some results. That is done via a hyperlink in HTML, which will be hidden as soon as the JavaScript has been parsed.

For the complete code, [navigate to `javascript-fetch.html`](https://github.com/BerendPronk/minor-bt/blob/master/files/week-2/javascript-fetch.html) in this repository.

[JavaScript - `fetch()` demo](https://berendpronk.github.io/minor/bt/files/week-2/javascript-fetch/)

## JavaScript - `Array.prototype.includes`
A JavaScript functionality I use a lot, personally, is `Array.prototype.indexOf`. This checks the index of the requested item, in the selected array. When the selected array contains the item, it returns the index of the item. If the item is not contained inside the array, `-1` will be returned, which can later be converted to `false`.

Recently I discovered that there's also `Array.prototype.includes`, which returns either `true` or `false`, when an array is checked on it's contents. I thought it'd be nice to implement this feature in my future projects, but the support for it lacks in any version of `Internet Explorer`. Thats where `Array.prototype.indexOf` comes to the rescue, right? Wrong! The oldest versions of `Internet Explorer` do not support `Array.prototype.indexOf` either. Luckily there is another way to check if an item is contained inside an array, with a `for` loop.

```javascript
// JavaSript

var arr = [1, 2, 3, 4, 5, 6, 7, 8];
var input = document.getElementById('input');
var result = document.getElementById('result');

if (Array.prototype.includes) {
  input.onchange = function() {
    if (arr.includes(Number(input.value))) {
      result.innerText = input.value + " was found in the array!";
    } else {
      result.innerText = input.value + " was not found in the array.";
    }
  }
} else if (Array.prototype.indexOf) {
  input.onchange = function() {
    if (checkItem(Number(input.value))) {
      result.innerText = input.value + " was found in the array!";
    } else {
      result.innerText = input.value + " was not found in the array.";
    }
  }
  
  function checkItem(item) {
    if (arr.indexOf(item) !== -1) {
      return true;
    } else {
      return false;
    }
  }
} else {
  input.onchange = function() {
    if (checkItem(Number(input.value))) {
      result.innerText = input.value + " was found in the array!";
    } else {
      result.innerText = input.value + " was not found in the array.";
    }
  }
  
  function checkItem(item) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === item) {
        return true;
      }
      if (i === arr.length - 1) {
        return false;
      }
    }
  }
}
```

For the complete code, [navigate to `javascript-includes.html`](https://github.com/BerendPronk/minor-bt/blob/master/files/week-2/javascript-includes.html) in this repository.

[JavaScript - `Array.prototype.includes` demo](https://berendpronk.github.io/minor/bt/files/week-2/javascript-includes/)
