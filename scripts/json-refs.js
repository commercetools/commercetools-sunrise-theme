#!/usr/bin/env node

'use strict';

// Default task configuration
var options = {
  partials: "input/templates/partials/"
};
// 'json-refs' configuration
var jsonRefsOptions = {
  relativeBase: options.partials
};

var jsonRefs = require('json-refs');
var path = require('path');
var fs = require('fs');

var files = fs.readdirSync('input/templates/');
var resolvedRefsPromises = files
  .filter(removeNonJsonFiles)
  .map(function(fileName) {
    var file = {
      src: path.resolve('input/templates/' + fileName),
      dest: path.resolve('output/templates/' + fileName)
    };

    // Resolve JSON references
    var json = require(file.src);

    return jsonRefs.resolveRefs(json, jsonRefsOptions).then(
      function(result) {
        return writeResolvedFile(file, result);
      }, function(err) {
        console.log(err.stack);
      });
  });

  function removeNonJsonFiles(file) {
    return file.match(/\.[json]+$/i);
  }
  function removeInvalidFiles(file) {
    if (file.src.length != 1) {
      console.log("Only a single source file is currently supported.");
      return false;
    } else {
      return true;
    }
  }

  function removeInexistentFiles(file) {
    if(!fs.exists(path.resolve(file))) {
      console.log('Source file "' + file + '" not found.');
      return false;
    } else {
      return true;
    }
  }

  function writeResolvedFile(file, result) {
    var written = false;
    parseMetadata(result.resolved);
    // Write the resolved JSON to a new file
    var fs = require('fs');
    written = fs.writeFile(
      file.dest, stringifyJson(result.resolved, 2),
      function(err) {
        if (err) throw err;
        console.log('File "' + file.dest + '" created');
      }
    );
  }

  function parseMetadata(json) {
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        var value = json[key];
        if (value.hasOwnProperty("err")) {
          console.log(stringifyJson(value, 2));
        } else {
          //console.log(stringifyJson(value, 0));
        }
      }
    }
  }

  function stringifyJson(json, space) {
    return JSON.stringify(json, null, space);
  }

