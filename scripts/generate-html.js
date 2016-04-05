#!/usr/bin/env node

var fs = require('fs');
var util = require('util');
var handlebars = require(fs.realpathSync('scripts/compile-handlebars.js'));

var languages = fs.readdirSync('input/i18n');

languages.forEach(function (lang) {
    var i18n = require(fs.realpathSync('scripts/i18n.js'));
    i18n(lang, handlebars);
});
