# sphere-sunrise-design

The Grunt tasks defined in the project allows you to:
- Copy those assets that do not need any type of processing, in particular: `assets/css/*.css`, `assets/js/*.js` and any file inside the `assets/img` folder.
- Generate a `coffee.js` file concatenating Coffeescript files from `assets/js/*.coffee` and move it to `assets/js/coffee.js`.
- Generate a `main.min.css` file from `assets/css/main.scss` and move it to `assets/css/main.min.css`.

To generate all the static website in the `output` folder, just run:
```
grunt
```
