# Breaking the web: An analysis of colour and JavaScript hazards

## Colour

### Anchors
When colour is the only distinction between hyperlinks and plain text, people who experience any form of colourblindness can have a hard time to differentiate the two.

#### Solution
Use alternative ways to style hyperlinks to enhance the contrast with regular content, or just keep the default styling with the underline. Consider placing navigation links in buttons, adding icons next to hyperlinks or just styling the underline some more.
Colours with a change in luminosity can also make a difference on how a colourblind person perceives hyperlinks.


### Contrast
The difference in similar colours, for example highlighted sections with plotted text that is just slightly lighter than its background, can be invisible with different kinds of colourblindness. Colours with the same saturation-level can also look the same for the colourblind.

#### Solution
Make sure that the contrast in colour with overlapping or adjacent elements is large enough. Complementary colours will always be distinguishable for people with any kind of vision, but try not to overdo this; since that’ll convert your website into a rainbow.

---

## JavaScript

### Basic interactions
Content websites don’t need JavaScript per se to create a usable experience. More often than not you see applied JavaScript to DOM-elements, like a mobile menu, which will slide into the page with JavaScript logic. If JavaScript were to be disabled, the user won’t be able to view the navigation on mobile devices. And that’s just one example.

#### Solution
Much can be done with HTML and CSS alone, if used properly. The example of a collapsable menu for mobile devices can be solved by a single checkbox input element and some CSS, which will collapse the menu when the box is checked.
Making API-requests also don’t necessarily have to be made via JavaScript. A HTML form is able to communicate with a server via GET- and POST-requests, as well.

  
### Third-party scripts
A lot of websites make use of frameworks, libraries and other JavaScript functionalities from third parties. Cases that make use of these scripts rely on JavaScript. It’s essential.
Functionalities, such as routing, templating and case-specific scripts won’t be able to be used without JavaScript.

#### Solution
Rendering the templating server-side prevents potential problems with generating content, especially when no JavaScript is loaded, and the users will be shown nothing at all, or, if anything, static fallback content.
By feature detecting the different functionalities used in, it’s possible to progressively enhance the application. The fallback code will be run if a browser does not support a certain feature.
