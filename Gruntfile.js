module.exports = function (grunt) {
  grunt.initConfig({
    concurrent: {
      dev: {
        tasks: ['nodemon:server', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      server: {
        options: {
          file: './server/server.js',
          args: ['production'],
          ignoreFiles: ['node_modules/**'],
          watchedExtensions: ['js', 'mustache'],
          watchedFolders: ['./server', './server/tpl'],
          debug: false,
          delayTime: 1
        },
        exec: {
          options: {
            exec: 'node'
          }
        }
      }

    },
    hub: {
      app: {
        src: ['app/Gruntfile.js'],
        tasks: ['buildall', 'watch']
      }
    },

    jshint: {
      all_files: {
        src: [
          'Gruntfile.js',
          'server/server.js',
          'app/app.js'
        ]
      },

      options: {
        jshintrc: '.jshintrc'
      }
    },
    express: {
      server: {
        options: {
          script: './server/server.js'
        }
      }
    },
    watch: {
      server: {
        files: ['server/*.js', './server/tpl/**/*.mustache'],
        tasks: ['jshint', 'express:server'],
        options: {
          nospawn: true,
          atBegin: true
        }
      },
      testing: {
        files: ['./app/**/*.js', './app/**/*.css'],
        options: {
          livereload: 32882,
        }
      },
      // appjs: {
        // files: ['app/app.js'],
        // tasks: ['jshint', 'requirejs:app']
      // },
      appless: {
        files: ['app/less/**/*.less'],
        tasks: ['recess:app']
      }

    },
    requirejs: {
      app: {
        options: {
          wrap: true,
          baseUrl: './app/',
          almond: true,
          out: './media/js/app.js',
          include: 'app',
          mainConfigFile: './app/app.js',
          enforceDefine: true,
          name: './bower_components/almond/almond',
          paths: {
            underscore: './bower_components/lodash/dist/lodash'
          }
        }
      }
    },
    recess: {
      app: {
        options: {
          compile: true
        },
        files: {
          './media/css/app.css': ['./app/less/app.less']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-recess');

  // for running server without grunt-hub
  grunt.registerTask('default', 'concurrent:dev');
};
