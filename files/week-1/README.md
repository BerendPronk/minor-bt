# Progressive Enhancement requests of the Funda Prototype
By testing the Funda prototype on important usability and browser-specific topics, I conducted a list with improvements on the progressive enhancement of the application.  
These improvements could eventually be implemented in the app itself, for a better user experience.

## Images
- App uses no images, except for the requested ones from Funda. The lowest possible resolution is requested with an API-call. Funda may be able to compress them some more to reduce the load time of the pages.

- When no images are able to load, or if the user has disabled images in his browser settings, the splash-screen will not show the decorative background.  
However, the logo is still shown to the user.

![No images splash](https://berendpronk.github.io/minor/assets/bt/no-images-splash.png)
![No images splash](https://berendpronk.github.io/minor/assets/bt/no-images-splash.png)

- The result page will look distorted without images, a placeholder image (svg / css) will take care of this distortion by setting a fixed height and providing feedback to the user about the image. When the images are loaded, they will replace the placeholder.

![No images results](https://berendpronk.github.io/minor/assets/bt/no-images-results.png)

## Custom Fonts
- App doesn't use icon fonts.
- Custom font (Proxima Nova) is loaded via Adobe TypeKit, fallback font is set to sans-serif.
- To combat the FOIT (Flash Of Invisible Text) a Fontface Observer can be implemented.

## JavaScript
- API-requests via Javacript should be done with a `<form action="">`.
- Templating should be done server-side.
- Content with an explanation of the app and it's usage should be loaded by default, and later be removed once the JavaScipt is loaded.
- App is built with modules that rely on each other, removing one will result in the app not loading properly. By implementing a feature detection script, modules can be turned off, resulting in the app functioning without that specific module, instead of crashing altogether.

![No JavaScript](https://berendpronk.github.io/minor/assets/bt/no-javascript.png)

- The addition of a `<noscript>` tag should provide the handful of users that deliberately disabled JavaScript with some feedback about the apps usage of JavaScript.

## Colour
- App uses a lot of different colours, with change in saturation. The only thing that would improve the overall experience, is increase the contrast of the `Verzenden` button some more from it's container.

![Colour blindness test](https://berendpronk.github.io/minor/assets/bt/colour-blindness-test.jpg)

## Internet connection
- The splashscreen took a total of 12.7 seconds to load without any extra improvements done on performance (Tested on a 2G connection (150ms, 450kb/s, 150kb/s))  
The stack of images is the culprit, since the DOM only takes 1.85 seconds to load.

![2G connection splash](https://berendpronk.github.io/minor/assets/bt/2G-connection-splash.png)

- The result page takes longer to load, since it requests larger images for preview images of the results. The rest of the DOM has already been loaded at this point.
Not every image should be visible immediately. By lazyloading them, the loading of the results page can be improved.

- The request on the detail pages takes a little longer than usual. That's because of the promise to the Funda API. Whenever the requested content is loaded, the user is presented with the details of the selected house.  
This only takes about a second on a 2G connection.  

## Cookies
- This application does not use any cookies.

## Browser storage
- This site uses localStorage to store the set favourites. By disabling localStorage, or if the user's browser does not support this feature, the app will not work properly.

![No localStorage](https://berendpronk.github.io/minor/assets/bt/no-localstorage.png)

- There isn't any user database, with registration and login built in, yet. This will be a solution to our localStorage problem, since everything about adding and requesting favourite results could then be handled server-side.

## Keyboard navigation
- By using the TAB-key to navigate, it is currently not possible to select the `Koop / Huur` switch, nor is it possible to filter on price.  
This can be fixed by removing the `display none;` declaration on the `<input type="radio">` elements and hiding them some other way.
- TAB-key can not be used to navigate the suggestion list on a search. The rendered `<li>` elements should idealy contain a `<select>` tag, or a `<a>` / `<button>` tag.
- App does not use tabindex attributes on elements.
- `:hover` and `:focus` states are both styled.
- The result page can be fully navigated by using the TAB-key.
- When the return-key is pressed on a result, the tabindex should be reset, because the users is directed to a 'new' page, but is actually still in the same window of the Single Page Application.  
The removal of every result is also an option, but a new request should be done if the user decides to go back to the results page.
- Same thing for the favourites page. The tabindex first wants to pass the list of results before going to the favourites page.
- Screenreader for Chrome works surprisinly well, the first time tested. But when navigating the results list it mentions the amount of list items everytime the TAB-key is pressed.
- Screenreader says the custom-element logo the application uses is `sexy` ;)
