
require.config({
  shim: {
    "bootstrap": {
      "deps": ['jquery']
    }
  },
  paths: {
    "jquery": "//code.jquery.com/jquery-2.1.1.min",
    "text": "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.5/text.min",
    "knockout": "//cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min",
    "bootstrap": "//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min"
  }
});


define(["knockout", "text","jquery", "bootstrap"], function (ko,txt,$,bootstrap) {

  alert("Loaded all deps?");
  
});