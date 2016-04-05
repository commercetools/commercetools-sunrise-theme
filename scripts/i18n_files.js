#!/usr/bin/env node

'use strict';

var path = require('path');
var glob = require('glob');
var exec = require('child_process').exec;

var files = glob.sync('input/i18n/**/*.yaml');
var resolvedPromises = files
    .map(function(fileName) {
        var file = {
            src: fileName,
            dest: renameI18nFiles('output/translations', removeWD('input/i18n/', fileName))
        };
        exec('cp -p ' + file.src + ' ' + file.dest);
    });

function removeWD(wd, file) {
    return file.replace(wd, '')
}
function renameI18nFiles(dest, src) {
    var locale = src.substring(0, src.indexOf('/')),
        fileName = src.substring(src.indexOf('/')),
        domain = fileName.substring(0, fileName.indexOf('.yaml'));
    return dest + domain + '.' + locale + '.yml';
}
