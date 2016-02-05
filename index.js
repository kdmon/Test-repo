require.config({
  paths: {
    "jquery": "//code.jquery.com/jquery-2.1.1.min",
    "w2ui": "http://webappeditor.com/vitmalina/w2ui/w2ui-1.4/dist/w2ui.min",
    "text": "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text.min",
    "knockout": "//cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min"
  },
    shim: {
    'w2ui': {
      deps: ['jquery'], 
      exports: 'w2ui'
      }
  }
});


define(["knockout", "jquery", "w2ui"], function (ko,$) {

  ko.components.register("testcomponent", {require: "testcomponent"});
  
  ko.applyBindings({});

});