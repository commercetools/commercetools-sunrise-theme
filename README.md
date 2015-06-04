# sphere-sunrise-design

###Requirements

- Install [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/)
- Install [Sass](http://sass-lang.com/install)
- Install [Grunt](http://gruntjs.com/getting-started)
- Run `npm install` in the project root to install the project dependencies.

###Usage

As a general rule, just run `grunt` in the project root in order to generate the `output` folder with the generated site.
The following text is a more detailed explanation of the executed tasks:

`grunt copy`
  - Copy any CSS file in `input/assets/css/` to `output/assets/css/`
  - Copy any JS file in `input/assets/js/` to `output/assets/js/`
  - Copy any file in `input/assets/img/` to `output/assets/img/`
  - Copy any file in `input/assets/font/` to `output/assets/font/`
  - Copy any HTML file in `input/` to `output/` (be careful not to use the same name as a Handlebars template or it will be overwritten)


`grunt coffee`
  - Compile and concatenate any Coffeescript file inside `input/assets/js/` into `output/assets/js/coffee.js`


`grunt sass`
  - Processes `input/assets/css/main.scss` into `output/assets/css/main.min.css`


`grunt compile-handlebars`
  - Generates HTML files from the Handlebars templates and JSON data defined in `input/templates/` and the partial templates defined in `input/templates/partials/` into `output/`


**To run them all, simply use the default command `grunt`.**
