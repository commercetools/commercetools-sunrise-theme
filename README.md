# sphere-sunrise-design

`grunt copy`
  - Copy any CSS file in `input/assets/css/` to `output/assets/css/`
  - Copy any JS file in `input/assets/js/` to `output/assets/js/`
  - Copy any file in `input/assets/img/` to `output/assets/img/`


`grunt coffee`
  - Compile and concatenate any Coffeescript file inside `input/assets/js/` into `output/assets/js/coffee.js`


`grunt sass`
  - Processes `assets/css/main.scss` into `assets/css/main.min.css`.


`grun compile-handlebars`
  - Generates HTML files from the Handlebars templates and JSON data defined in `input/templates/` and the partial templates defined in `input/templates/partials/` into `output/`


To run them all, simply use the default command `grunt`.
