# CoCookie: Easy Cookies Interface

<img align="left" height="164px" src="https://cloud.githubusercontent.com/assets/4989256/24839621/d45157d4-1d66-11e7-8011-409a902ea69c.png">

[![npm](https://img.shields.io/npm/v/cocookie.svg)](https://www.npmjs.com/package/cocookie)
[![Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg)](http://npm.anvaka.com/#/view/2d/cocookie)
[![License](https://img.shields.io/github/license/zitros/cocookie.svg)](LICENSE)

[CoCookie](https://www.npmjs.com/package/cocookie) is a minimalistic accurate JavaScript ES6 package 
that provides a convenient interface to work with cookies.

The API is as simple as possible. The [documented code](index.js) is clean and transparent. See the
usage in examples below.

Usage
-----

```javascript
import cookie from "cocookie";

// Set cookie "key" to value "bR6o1x"
cookie("key").set("bR6o1x");

// Set cookie "key" to value "bR6o1x" with additional attributes
cookie("key").set("bR6o1x", {
    domain: "my.domain.com",                         // domain to bind cookie to
    expires: new Date(Date.now() + 1000*60*60*24*7), // date when cookie expires
    maxAge: 60*60*24,                                // max time in seconds the cookie lives
    path: "/",                                       // the URL path the cookie will be bind to
    secure: true                                     // restrict cookie transport to HTTPS only
});

// Get value of cookie "key"
let key = cookie("key").get();

// Delete cookie "key"
cookie("key").delete();

// When cookie is already set, you can just update its without touching its value.
cookie("key").update({
    expires: new Date(Date.now() + 1000*60*60*24*7)  // refresh the cookie for 1 more week
});

// Delete cookie "key" with optional attributes
cookie("key").delete({
    domain: "my.domain.com",
    path: "/"
});

// Need the list of cookies to iterate through? Here you go:
import { cookies } from "cocookie";
cookies().forEach(name => cookie(name).delete());
// Note that you cannot delete cookies from other domains/paths in this way.
// Do delete the cookie from known path/domain use delete attributes (see delete above).

// If you need to store JSON in cookies (which is not common), use the following pattern.
cookie("key").set(JSON.stringify({ base: "bR6o1x", salt: "j5p9Qz" }));
let object = JSON.stringify(cookie("key").get());
```

Installation
------------

```bash
npm install --save-dev cocookie
```

Install CoCookie as a npm dependency. Use this package with any module bundler like 
[Webpack](https://webpack.github.io) until ES6 modules standard will be implemented natively.

If your module bundler cannot resolve ES6 code, use `import cookie from "cocookie/umd.js";`. For
usage from browser directly use the script tag:

```html
<script type="text/javascript" src="https://github.com/ZitRos/cocookie/blob/master/umd.js"></script>
```
