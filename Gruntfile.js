/*global module:false*/
module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*!\n' +
        ' * <%= pkg.name %> v<%= pkg.version %> - <%= pkg.description %>\n' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
        ' * License: <%= pkg.license %>\n' +
        ' */\n\n',
      outputDir: 'dist',
      output: '<%= meta.outputDir %>/<%= pkg.name %>',
      outputMin: '<%= meta.outputDir %>/<%= pkg.name.replace("js", "min.js") %>'
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>',
        report: 'gzip'
      },
      dist: {
        files: {
          '<%= meta.outputMin %>': 'src/*.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['uglify']);
};