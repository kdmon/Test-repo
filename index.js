require.config({
  paths: {
    "jquery": "//code.jquery.com/jquery-2.1.1.min",
    "w2ui": "/vitmalina/w2ui/w2ui-1.4/dist/w2ui.min",
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


define(["knockout", "jquery", "w2ui", "w2uigithack", "w2uirawgit", "w2uirawgitcdn"], function (ko,$) {
  
  ko.components.register("testcomponent", {require: "testcomponent"});
  
  ko.applyBindings({});
  
    
    
  /* SETUP PANELS */
  $('#layout').w2layout({
    name: 'layout',
    panels: [{
      type: 'top',
      size: '50px',
      toolbar: {
        items: [],
        onClick: function(event) {
          toolbarClick(this, event);
        }
      },
      resizable: false,
      hidden: false,
      content: ''
    }, {
      type: 'left',
      size: '250px',
      hidden: false,
      resizable: true,
      content: ''
    }, {
      type: 'main',
      resizable: true,
      content: ''
    }, {
      type: 'right',
      size: '25%',
      hidden: true,
      resizable: true,
      content: ''
    }, {
      type: 'bottom',
      size: '25%',
      resizable: false,
      hidden: true,
      content: ''
    }]
  });
  $().w2layout({
    name: 'leftsplit',
    panels: [{
      type: 'main',
      resizable: true,
      content: '',
      tabs: {
        tabs: [],
        onClose: function(event) {
          tabClose(this, event);
        },
        onClick: function(event) {
          tabClick(this, event);
        }
      },
      toolbar: {
        items: [],
        onClick: function(event) {
          toolbarClick(this, event);
        }
      }
    }, {
      type: 'preview',
      size: '50%',
      resizable: true,
      hidden: true,
      content: '',
      tabs: {
        tabs: [],
        onClose: function(event) {
          tabClose(this, event);
        },
        onClick: function(event) {
          tabClick(this, event);
        }
      },
      toolbar: {
        items: [],
        onClick: function(event) {
          toolbarClick(this, event);
        }
      }
    }]
  });
  $().w2layout({
    name: 'middlesplit',
    panels: [{
      type: 'main',
      resizable: true,
      content: '',
      tabs: {
        tabs: [],
        onClose: function(event) {
          tabClose(this, event);
        },
        onClick: function(event) {
          tabClick(this, event);
        }
      },
      toolbar: {
        items: [],
        onClick: function(event) {
          toolbarClick(this, event);
        }
      }
    }, {
      type: 'preview',
      size: '50%',
      resizable: true,
      hidden: true,
      content: '',
      tabs: {
        tabs: [],
        onClose: function(event) {
          tabClose(this, event);
        },
        onClick: function(event) {
          tabClick(this, event);
        }
      },
      toolbar: {
        items: [],
        onClick: function(event) {
          toolbarClick(this, event);
        }
      }
    }]
  });
  $().w2layout({
    name: 'rightsplit',
    panels: [{
      type: 'main',
      resizable: true,
      content: '',
      tabs: {
        tabs: [],
        onClose: function(event) {
          tabClose(this, event);
        },
        onClick: function(event) {
          tabClick(this, event);
        }
      },
      toolbar: {
        items: [],
        onClick: function(event) {
          toolbarClick(this, event);
        }
      }
    }, {
      type: 'preview',
      resizable: true,
      hidden: true,
      size: '50%',
      content: '',
      tabs: {
        tabs: [],
        onClose: function(event) {
          tabClose(this, event);
        },
        onClick: function(event) {
          tabClick(this, event);
        }
      },
      toolbar: {
        items: [],
        onClick: function(event) {
          toolbarClick(this, event);
        }
      }
    }]
  });
  
  w2ui.layout.content('left', w2ui.leftsplit);
  w2ui.layout.content('main', w2ui.middlesplit);
  w2ui.layout.content('right', w2ui.rightsplit);


});