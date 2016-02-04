module.exports = function(grunt) {

  grunt.registerMultiTask('json-refs', 'Resolves all JSON References and returns a fully resolved equivalent', function() {
    var done = this.async();
    // Default task configuration
    var options = this.options({
      partials: "input/templates/partials/"
    });
    // 'json-refs' configuration
    var jsonRefsOptions = {
      relativeBase: options.partials
    };

    var jsonRefs = require('json-refs');
    var path = require('path');

    var resolvedRefsPromises = this.files
    .filter(removeInvalidFiles)
    .filter(removeInexistentFiles)
    .map(function(file) {
      // Resolve JSON references
      var json = grunt.file.readJSON(file.src[0]);
      return jsonRefs.resolveRefs(json, jsonRefsOptions)
      .then(function(result) {
        return writeResolvedFile(file, result);
      }, function(err) {
        grunt.log.error(err.stack);
      });
    });

    Promise.all(resolvedRefsPromises)
    .then(function(result) {
      done(true);
    });
  });

  var removeInvalidFiles = function(file) {
    if (file.src.length != 1) {
      grunt.fail.warn("Only a single source file is currently supported.");
      return false;
    } else {
      return true;
    }
  };

  var removeInexistentFiles = function(file) {
    var filepath = file.src[0];
    if(!grunt.file.exists(filepath)) {
      grunt.log.warn('Source file "' + filepath + '" not found.');
      return false;
    } else {
      return true;
    }
  };

  var writeResolvedFile = function(file, result) {
    var written = false;
    parseMetadata(result.resolved);
    // Write the resolved JSON to a new file
    written = grunt.file.write(file.dest, stringifyJson(result.resolved, 2));
    if (written) {
      grunt.log.debug('File "' + file.dest + '" created');
    } else {
      grunt.log.error('File "' + file.dest + '" failed on creation');
    }
    return written;
  };

  var parseMetadata = function(json) {
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        var value = json[key];
        if (value.hasOwnProperty("err")) {
          grunt.log.error(stringifyJson(value, 2));
        } else {
          grunt.verbose.writeln(stringifyJson(value, 0));
        }
      }
    }
  }

  var stringifyJson = function(json, space) {
    return JSON.stringify(json, null, space);
  }
  
};