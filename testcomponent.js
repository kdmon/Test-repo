define(["knockout", "text!./testcomponent.html"],function(ko, loadedTemplate){

  function Testcomponent (params) {
    this.id = ko.observable( params ? params.id || 'null' : 'null');
    this.color = ko.observable( params ? params.color || 'none' : 'none');
  }

  return {
    viewModel: Testcomponent,
    template: loadedTemplate
  };
  
});

