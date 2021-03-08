# SupernovaJS &middot; [![Build Status](https://travis-ci.org/supernova-tool/supernova.svg?branch=main)](https://travis-ci.org/supernova-tool/supernova)

## The SSR Microframework

Write a ssr high performance app with vanilla js and pure HTML.

## Get Started

Download and install Supernova

`npm i -g @supernovajs/core`

Create your project

`supernova create my-app`

Run your project

`cd my-app && npm start`

## Code examples

**pages/hello/index.js**

```js
module.exports = () => {
  return {
    meet: "Hellow world!",
  };
};
```

**pages/hello/index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Supernova Hello World!</title>
    <link
      rel="stylesheet preload prefetch"
      type="text/css"
      as="style"
      href="/static/{{cssFileName}}"
    />
  </head>
  <body>
    <p class="block__element--modifier">{{meet}}</p>
  </body>
</html>
```

**pages/hello/style.scss**

```scss
.block {
  &__element {
    text-transform: capitalize;
    &--modifier {
      font-weight: bolder;
    }
  }
}
```

_Pro tip:_ You can change npm start script to run supernova start --port=8000 to run in port 8000 for example.
