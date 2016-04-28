module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify", {
              sourceMap: true,
              presets: ['babel-preset-es2015']
            }]
          ]
        },
        files: {
          // if the source file has an extension of es6 then
          // we change the name of the source file accordingly.
          // The result file's extension is always .js
          "./bookmarklet/dist/oat-loader.js": ["./bookmarklet/index.js"]
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          keepalive: true
        }
      }
    }
  });

  grunt.registerTask('default', ['browserify', 'connect']);
};