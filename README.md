# SPHERE.IO Sunrise design

![SPHERE.IO icon](https://admin.sphere.io/assets/images/sphere_logo_rgb_long.png)

[![Build Status](https://travis-ci.org/sphereio/sphere-sunrise-design.png?branch=master)](https://travis-ci.org/sphereio/sphere-sunrise-design)

###Demo
- [Product Overview](http://sphereio.github.io/sphere-sunrise-design/pop.html)
- [Product Detail](http://sphereio.github.io/sphere-sunrise-design/pdp.html)
- [Cart Detail](http://sphereio.github.io/sphere-sunrise-design/cart.html)
- [Checkout Shipping](http://sphereio.github.io/sphere-sunrise-design/checkout-shipping.html)
- [Checkout Payment](http://sphereio.github.io/sphere-sunrise-design/checkout-payment.html)
- [Checkout Confirmation](http://sphereio.github.io/sphere-sunrise-design/checkout-confirmation.html)

###Installation

- Install [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/)
- Install [Sass](http://sass-lang.com/install)
- Install [Grunt](http://gruntjs.com/getting-started)
- Run `npm install` in the project root to install the project dependencies.

###Usage

#####Useful commands

`grunt` to build the generated site and watch for changes

`grunt build` to build the generated site

`grunt publish` to publish the generated site to GitHub Pages (requires $GH_TOKEN)

`grunt release-[patch|minor|major]` to release the current version to the Maven Bintray repository and prepare a new version (requires commercetools-bintray repository ID in Maven's settings.xml)

`grunt clean build maven:install` to install to local maven repository (~/.m2/repository/io/sphere/sphere-sunrise-design)

Notice you can always add `--verbose` and/or `--debug` to any command in order to obtain more information.

#####Generated site

Once the project is built, the generated site is located in the `output/` folder.

#####Executed tasks

`grunt clean`
  - Removes the `output/` folder with the generate site

`grunt copy`
  - Copy any CSS file in `input/assets/css/` to `output/assets/css/`
  - Copy any JS file in `input/assets/js/` to `output/assets/js/`
  - Copy any file in `input/assets/img/` to `output/assets/img/`
  - Copy any file in `input/assets/font/` to `output/assets/font/`
  - Copy any Handlebars template in `input/templates/` to `output/templates/` (it flattens any directory)
  - Copy any HTML file in `input/` to `output/` (be careful not to use the same name as a Handlebars template or it will be overwritten)


`grunt coffee`
  - Compile and concatenate any Coffeescript file inside `input/assets/js/` into `output/assets/js/coffee.js`


`grunt sass`
  - Processes `input/assets/css/main.scss` into `output/assets/css/main.min.css`

`grunt postcss`
  - Adds vendor-prefixed CSS properties to `output/assets/css/main.min.css`

`grunt compile-handlebars`
  - Generates HTML files from the Handlebars templates and JSON data defined in `input/templates/` and the partial templates defined in `input/templates/partials/` into `output/`
