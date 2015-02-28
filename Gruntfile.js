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

    concat: {
      options: {
        //定义一个字符串插入没个文件之间用于连接输出
        separator: ''
      },
      dist: {
        src: ['css/*.css'],
        dest: '<%=meta.outputDir %>/<%= pkg.name.replace("js", "cat.css") %>'
      }
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

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concat', 'uglify']);
  grunt.registerTask('css', ['concat']);
  grunt.registerTask('js', ['uglify']);
};