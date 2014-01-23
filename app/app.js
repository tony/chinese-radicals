require.config({
  baseUrl: '/media/',
  deps: ['backbone.marionette.handlebars'],
  paths: {
    app: 'app',
    tpl: 'tpl',
    'underscore': 'bower_components/lodash/dist/lodash',
    'backbone': 'bower_components/backbone-amd/backbone',
    'backbone.wreqr': 'bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
    'backbone.babysitter': 'bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
    'backbone.marionette': 'bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
    'mustache': 'bower_components/mustache/mustache',
    'handlebars': 'bower_components/handlebars/handlebars.runtime.amd',
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



require(['underscore', 'jquery', 'backbone', 'backbone.marionette', 'mustache'], function(_, $, Backbone, Marionette, Mustache) {
  'use strict';

  //For todays date;
  Date.prototype.today = function(){ 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
  };
  //For the time now
  Date.prototype.timeNow = function(){
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
  };
  console.log('Loaded. Current time is ' + new Date().timeNow());

  var myexampletpl = "hey hahaa";

  Backbone.Marionette.Renderer.render = function(template, data) {
    return Mustache.render(template, data);
  };

  var App = new Backbone.Marionette.Application();

  App.addRegions({
    main: "#app"
  });

  var MyModel = Backbone.Model.extend({

  });

  window.mymodel = new MyModel({
    name: 'Tony'                            
  });

  var TonyView = Backbone.Marionette.ItemView.extend({
    template: 'Hi world, my name is <input id="wat" type="text" name="names" value="{{name}}"/>. {{name}}',

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


var radicals = [{

}];
