require.config({
  baseUrl: '/media/',
  paths: {
    app: 'app',
    tpl: 'tpl',
    'underscore': 'bower_components/lodash/dist/lodash',
    'backbone': 'bower_components/backbone-amd/backbone',
    'backbone-all': 'lib/backbone-all',
    'backbone.noConflict': 'lib/backbone.noConflict',
    'backbone.marionette': 'bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr': 'bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.babysitter': 'bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
    'backbone.iobind': 'vendor/backbone.iobind',
    'backbone.iosync': 'vendor/backbone.iosync',
    'mustache': 'bower_components/mustache/mustache',
    'handlebars': 'bower_components/handlebars/handlebars.amd',
    'jquery': 'bower_components/jquery/jquery',
    'bootstrap': 'vendor/bootstrap/docs/assets/js/bootstrap.min',
    'text': 'bower_components/text/text',
    'q': 'bower_components/q/q',
    'isotope': 'bower_components/jquery.isotope'
  },
  shim: {
    'bootstrap': ['jquery']
  }

});


require(['underscore', 'jquery', 'backbone', 'backbone.marionette', 'handlebars'], function(_, $, Backbone, BackboneMarionette, Handlebars) {
  var currentdate = new Date(); 
  var datetime = "Last Sync: " + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/" 
                  + currentdate.getFullYear() + " @ "  
                  + currentdate.getHours() + ":"  
                  + currentdate.getMinutes() + ":" 
                  + currentdate.getSeconds();
  console.log('Loaded. Current time is ' + datetime);

  var myexampletpl = "hey hahaa";
  // Backbone.Marionette.TemplateCache.prototype.compileTemplate = function(rawTemplate) {
    // return Handlebars.compile(rawTemplate);
  // };

  var App = new Backbone.Marionette.Application();

  App.addRegions({
    main: "#app"
  });

  var MyModel = Backbone.Model.extend({

  });

  window.mymodel = new MyModel({
    name: 'Tony'                            
  });

  var TonyView = BackboneMarionette.ItemView.extend({
    template: _.template('Hi world, my name is <input id="wat" type="text" name="names" value="<%= name %>"/>.'),

    events: {
      'change input#wat': 'changedInput',
      'click input#wat': 'changedInput'
    },
    changedInput: function(e) {
      console.log($(e.currentTarget));
    },
    modelEvents: {
      'change': 'render'
    },
    model: window.mymodel
  });  // similar to Backbone.View

  var tonyView = new TonyView();

  App.main.show(tonyView);
  App.start();

});
