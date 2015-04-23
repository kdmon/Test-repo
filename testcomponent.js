define(["knockout", "text!./testcomponent.html"],function(ko, loadedTemplate){

  function testcomponent() {
    alert ("constructing test component");
  }

  return ({
    viewModel: testcomponent,
    template: loadedTemplate
  });
  
});