/* SETUP PANELS */

var pstyle = 'background: #eee;';
$('#layout').w2layout({
  name: 'layout',
  panels: [
    {
    type: 'top',
    size: 50,
    toolbar: {
      items: [
        { type: 'html',  id: 'item6',
            html: '<h1 id="logo"><span class="fa fa-2x fa-mobile"></span> WebAppEditor.com</h1>' 
        },
        { type: 'menu',
          id: 'projectmenu',
          caption: 'Editing /kdmon/Test-repo/',
          icon: 'fa fa-github',
          items: [
          { text: 'New project', icon: 'fa fa-file' }, 
          { text: 'Open project', icon: 'fa fa-folder-open' },
          { text: 'Close current project', icon: 'fa fa-close' }, 
          { text: '/kdmon/Test-repo/ (editing)', icon: 'fa fa-github' }, 
          { text: '/kdmon/Three.js/', icon: 'fa fa-github' }
        ]},
        {
          id: 'topspace',
          type: 'spacer'
        },
        {
          id: 'collaborate',
          type: 'check',
          caption: 'Collaborate',
          icon: 'fa fa-users',
          hint: 'Collaborate'
        },
        {
          id: 'topbreak1',
          type: 'break'
        },
        {
          id: 'preferences',
          type: 'check',
          caption: 'Preferences',
          icon: 'fa fa-wrench',
          hint: 'Preferences'
        },
        {
          id: 'signout',
          type: 'button',
          caption: 'Sign out',
          icon: 'fa fa-logout',
          hint: 'Log out'
        },
        {
          id: 'leftcolumn',
          type: 'check',
          caption: '',
          icon: 'fa fa-caret-square-o-left',
          hint: 'Toggle left column'
        },
        {
          id: 'bottomrow',
          type: 'check',
          caption: '',
          icon: 'fa fa-caret-square-o-down',
          hint: 'Toggle bottom row'
        },
        {
          id: 'rightcolumn',
          type: 'check',
          caption: '',
          icon: 'fa fa-caret-square-o-right',
          hint: 'Toggle right column'
        },
      ],
      onClick: function(event) {
        toolbarClick(this, event);
      }
    },
    resizable: false,
    style: pstyle,
    content: ''
  }, {
    type: 'left',
    size: '25%',
    hidden: true,
    resizable: true,
    style: pstyle,
    content: ''
  }, {
    type: 'main',
    resizable: true,
    style: pstyle,
    content: ''
  }, {
    type: 'right',
    size: '25%',
    hidden: true,
    resizable: true,
    style: pstyle,
    content: ''
  }, {
    type: 'bottom',
    size: '25%',
    resizable: true,
    style: pstyle,
    hidden: true,
    content: ''
  }]
});

pstyle = 'background: white;';
$().w2layout({
  name: 'leftsplit',
  panels: [
    {
    type: 'main',
    resizable: true,
    style: pstyle,
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
    style: pstyle,
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
  panels: [
    {
    type: 'main',
    resizable: true,
    style: pstyle,
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
    style: pstyle,
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
  panels: [
    {
    type: 'main',
    resizable: true,
    style: pstyle,
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
    style: pstyle,
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
  name: 'bottomsplit',
  panels: [
    {
      type: 'left',
      resizable: true,
      hidden: true,
      size: '50%',
      style: pstyle,
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
    },
    {
      type: 'main',
      resizable: true,
      style: pstyle,
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
      type: 'right',
      resizable: true,
      hidden: true,
      size: '50%',
      style: pstyle,
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
    }
  ]
});

w2ui.layout.content('left', w2ui.leftsplit);
w2ui.layout.content('main', w2ui.middlesplit);
w2ui.layout.content('right', w2ui.rightsplit);
w2ui.layout.content('bottom', w2ui.bottomsplit);


/* SETUP TOOLBAR */

var toolbars = {
  editor: ['save', 'undo','redo','more','spacer','split'],
  preview: ['pause','url','refresh','share'],
  project: ['newproject','selectproject','closeproject'],
  chat: ['url','refresh','share'],
  prefs: ['url','refresh','share'],
  files: ['url','refresh','share'],
  media: ['url','refresh','share'],
  help: ['']
};

var buttons = {
  save: {
    id: 'save',
    type: 'button',
    caption: 'Save',
    icon: 'fa fa-save',
    hint: 'Save file'
  },
  savebreak:{
    id: 'savebreak',
    type: 'break'
  },
  undo: {
    id: 'undo',
    type: 'button',
    caption: 'Undo',
    icon: 'fa fa-reply',
    hint: 'Undo last edit'
  },
  redo: {
    id: 'redo',
    type: 'button',
    caption: 'Redo',
    icon: 'fa fa-share',
    hint: 'Redo last edit'
  },
  redobreak: {
    id: 'redobreak',
    type: 'break'
  },
  menu: {
    id: 'more',
    type: 'menu',
    caption: '',
    icon: 'fa fa-bars',
    arrow: false,
    items: [{
      text: 'Search',
      icon: 'fa fa-search',
    }, {
      text: 'Replace',
      value: 'Item Three',
      icon: 'fa fa-edit'
    }, {
      text: 'Go to line',
      icon: 'fa fa-level-down'
    }, {
      text: 'Clean up indentation',
      value: 'Item Three',
      icon: 'fa fa-magic'
    }, {
      text: 'File history',
      icon: 'fa fa-history'
    }]
  },
  spacer: {
    id: 'spacer',
    type: 'spacer'
  },
  split: {
    id: 'split',
    type: 'button',
    caption: '',
    icon: 'fa fa-sort',
    hint: 'Split view'
  },
  pause: {
    id: 'pause',
    type: 'button',
    caption: '',
    icon: 'fa fa-pause',
    hint: 'Pause'
  },
  url: {
    id: 'url',
    type: 'html',
    html: '<div style="padding: 3px 10px;">Input: <input size="10" style="' +
          'padding: 3px; border-radius: 2px; border: 1px solid silver"/></div>'
  },
  refresh: {
    id: 'refresh',
    type: 'button',
    caption: '',
    icon: 'fa fa-reload',
    hint: 'Force preview reload'
  },
  share: {
    id: 'share',
    type: 'button',
    caption: '',
    icon: 'fa fa-pause',
    hint: 'Open preview externally'
  }
};

function toolbarClick(obj, event) {

  var id = obj.name.split("_");
  
  switch (event.target) {
    case 'split':
      w2ui[id[0]].toggle('preview', window.instant);
    break;
    
    case 'leftcolumn':
      w2ui.layout.toggle('left', window.instant);
    break;
    
    case 'bottomrow':
      w2ui.layout.toggle('bottom', window.instant);
    break;
    
    case 'rightcolumn':
      w2ui.layout.toggle('right', window.instant);
    break;
    
    case 'hide':
      w2ui[id[0]].toggle(id[1], window.instant);
    break;
    
    default:
      obj.owner.content('main', 'event' + event.target);
    break;
  }
}

function switchToolbar(layout, panel, toolbar) {
  
  var tb = toolbars[toolbar];
  var tbContainer = w2ui[layout].get([panel]).toolbar;
  if (tb === undefined || tbContainer === undefined) return;
  
  // only show relevant buttons
  for (var button in buttons) {
    var item = buttons[button];
    if (tb.indexOf(item.id) > -1) tbContainer.show(item.id);
    else tbContainer.hide(item.id);
  }
  
}

function initialiseToolbar(layout, panel, toolbar) {

  // First add all buttons to toolbar
  for (var button in buttons) {
    var item = buttons[button];
    
    w2ui[layout].get([panel]).toolbar.add({
      id: item.id,
      type: item.type,
      caption: item.caption,
      icon: item.icon,
      hint: item.hint,
      items: item.items
    });
  }
  
  // Then toggle which buttons to show
  switchToolbar (layout, panel, toolbar);
}

initialiseToolbar ('leftsplit','main','editor');
initialiseToolbar ('leftsplit','preview','editor');

initialiseToolbar ('middlesplit','main','editor');
initialiseToolbar ('middlesplit','preview','editor');

initialiseToolbar ('rightsplit','main','editor');
initialiseToolbar ('rightsplit','preview','editor');

initialiseToolbar ('bottomsplit','left','editor');
initialiseToolbar ('bottomsplit','main','editor');
initialiseToolbar ('bottomsplit','right','editor');


/* SETUP TABS */

var tabList = {};

function refreshTabs(disableDrag) {
  var targetSelector = ".w2ui-tabs";
  var tabSelector = ".w2ui-panel-tabs td";
  // Clear any existing bindings
  $(targetSelector).off("dragstart");
  $(tabSelector).off("dragover").off("drop");
  
  // Enable dragging
  if (!disableDrag) {
    $(".w2ui-tab").parent().attr("draggable", "true");
    $(".w2ui-tabs").on("dragstart", function(event) {
      event.originalEvent.dataTransfer.setData('text', event.target.id);
      $(".w2ui-panel-tabs table").addClass('drop-highlight');
    });
    $(".w2ui-tabs").on("dragend", function(event) {
      $(".w2ui-panel-tabs table").removeClass('drop-highlight');
    });
    $(".w2ui-panel-tabs td").on("dragover", function(event) {
      event.preventDefault();
    });
    $(".w2ui-panel-tabs td").on("drop", function(event) {
      $(".w2ui-panel-tabs table").removeClass('drop-highlight');
      event.preventDefault();
      var originalId = event.originalEvent.dataTransfer.getData("text");
      if (originalId.indexOf('tabs_') < 0) return; // Non-tab dropped
      var origin = originalId.split("_");
      var originalCaption = $("#" + originalId).text();
      var originalLayout = origin[1];
      var originalPanel = origin[2];
      var originalTab = origin[5];
      var targetId = event.currentTarget.id;
      var target = targetId.split("_");
      var targetLayout = target[1];
      var targetPanel = target[2];
      var targetTab = target[5];
      if (originalId == targetId) return; // do nothing if dropped on itself.
      w2ui[originalLayout].get(originalPanel).tabs.remove(originalTab);
      tabList[originalTab].editorInstance = editorPanels.indexOf(targetLayout+targetPanel);
      if (targetTab) w2ui[targetLayout].get(targetPanel).tabs.insert(targetTab, {
        id: originalTab,
        caption: originalCaption,
        closable: 'true'
      });
      else w2ui[targetLayout].get(targetPanel).tabs.add({
        id: originalTab,
        caption: originalCaption,
        closable: 'true'
      });
      refreshTabs();
      //w2ui[originalLayout].get(originalPane).tabs.click(originalTab);
      w2ui[targetLayout].get(targetPanel).tabs.click(originalTab);
    });
  }
  updateLayout();
}

function tabClick(obj, event) {
  var item = tabList[event.target];
  editors[item.editorInstance].setSession(item.editSession);
  editors[item.editorInstance].focus();
}

function tabClose(obj, event) {
  console.log(obj);
  console.log(event);
}


/* Resize events */

$(window).on("resize", updateLayout());
w2ui.layout.onResize = updateLayout();

// Prevent toolbars from stealing focus from editor
$(".w2ui-toolbar:not(.selectable)").on('mousedown', function (event) {
  if (event.target.className.indexOf('selectable') < 0) event.preventDefault();
});

var resizeTimer = setTimeout(function(){},50);

function updateLayout () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function(){
    w2ui.layout.resize();
    for (var i = 0; i<editors.length; i++) {
      editors[i].resize();
    }
  },50);
}



/* SETUP EDITOR AND VIEWMODEL */

var editors = [];


setTimeout(function(){
    
  var editorPanels = [
    'layout_leftsplit_panel_main',
    'layout_leftsplit_panel_preview',
    'layout_middlesplit_panel_main',
    'layout_middlesplit_panel_preview',
    'layout_rightsplit_panel_main',
    'layout_rightsplit_panel_preview',
    'layout_bottomsplit_panel_left',
    'layout_bottomsplit_panel_main',
    'layout_bottomsplit_panel_right',
  ];
  var i = 0;
  
  $(".w2ui-panel-content").each(function(){
    var panelId = $(this).parent().attr('id');
    if (editorPanels.indexOf(panelId) > -1) {
      $(this).append('<div id="panel' + i + '"></div><div id="editor' + i + '" class="editor"></div>');
      editors[i] = ace.edit($(this).find(".editor")[0]);
      editors[i].on('focus', function(event, obj) {
        $('.w2ui_tabs').removeClass('active');
        $('.w2ui_tabs').removeClass('active-tab');
        $(obj.container).addClass('active-editor');
        //work out which tab is active
        console.log(obj);
        $('.w2ui_tabs').addClass('active-tab');
      });
      editors[i].on('blur', function(event, obj) {
        $(obj.container).removeClass('active-editor');
      });
      i++;
    }
  });
  
  startDoc("document1", 'thisisjustatestdocument', 'leftsplit', 'main', false, 'test','red');
  startDoc("document2", 'anothertestdocumentonly', 'leftsplit', 'preview', false, 'test','red');
  
  startDoc("document3", 'thisisjustatestdocument1', 'middlesplit', 'main', false, 'test','red');
  startDoc("document4", 'anothertestdocumentonly1', 'middlesplit', 'preview', false, 'test','red');
  
  startDoc("document5", 'thisisjustatestdocument2', 'rightsplit', 'main', false, 'test','red');
  startDoc("document6", 'anothertestdocumentonly2', 'rightsplit', 'preview', false, 'test','red');
  
  startDoc("document7", 'anothertestdocumentonly3', 'bottomsplit', 'main', false, 'test','red');
  
  refreshTabs();
}, 25);

var Model = function() {
  var self = this;
  // Tracks opened projects
  self.projects = ko.observableArray();
  // Tracks opened files/tabs
  self.documentCounter = ko.observable(0);
  // Return list of all projects
  self.projectList = ko.computed(function () {
    var list = [];
    for (i=0;i<self.projects().length;i++) {
      list.unshift(self.projects()[i].title);
    }
    return list;
  });
  // Track currently active project
  self.activeProject = ko.observable(0);
  // Return active project object
  self.currentProject = ko.computed(function () {
    return self.projects()[self.activeProject()];
  });
  // Explicitly passing in params not possible from dom binding
  // Instead can be implicit if inside ko context, with, foreach etc.
  self.addProject = function() { self.projects.push(new Project("Untitled " + Math.random()));};
  self.closeProject = function(project) { self.projects.remove(project) };
  self.selectProject = function(project) {self.activeProject(project)};
  // Act on project change
  self.projects.subscribe(function(newValue) {
    console.log("Projects changed");
  });
};

var Project = function(title, root) {
  var self = this;
  self.title = ko.observable(title || 'Untitled project');
  self.root = ko.observable(root);
  self.documents = ko.observableArray();
  self.addDocument = function() {
    var editSession = ace.createEditSession('',  '');
    self.documents.push(new Document("Untitled", editSession));
  };
  self.closeDocument = function(doc) {
    self.documents.remove(doc);
  };
  self.showDocument = function(doc) {
    webAppEditor.setSession(doc.editSession);
    webAppEditor.focus();
  };
  // Act on document change
  self.documents.subscribe(function(newValue) {
    if (self.documents().length>0){
      $("#editor").show();
      webAppEditor.setSession(self.documents()[self.documents().length-1].editSession);
      webAppEditor.focus();
    }
    else $("#editor").hide();
  });
};

var Document = function(title, editSession) {
  var self = this;
  self.title = ko.observable(title || 'zebra');
  self.editSession = editSession;
  
};


var Editor = function () {
  var self = this;
  self.document = ko.observable();
};


var app = new Model();
setTimeout(function(){
  ko.applyBindings(app);
},250);


connection = new sharejs.Connection("http://it4se.com:8081/channel");

var editorPanels = [
  'leftsplitmain',
  'leftsplitpreview',
  'middlesplitmain',
  'middlesplitpreview',
  'rightsplitmain',
  'rightsplitpreview',
  'bottomsplitleft',
  'bottomsplitmain',
  'bottomsplitright'
  ];

function startDoc (title, url, layout, panel, preserveContent, username, color) {
  
  var editorInstance = editorPanels.indexOf(layout+panel);
  var editorObj = editors[editorInstance];
  var editSession = ace.createEditSession('',  '');
  editorObj.setSession(editSession);
  
  tabList[title] = {
    id: title,
    caption: title,
    editSession: editSession,
    editorInstance: editorInstance
  };
  
  w2ui[layout].get(panel).tabs.add({id: title, caption:title});
  
  connection.open(url, 'text', function(error, doc) {
    doc.attach_ace(editorObj, preserveContent, username, color);
    doc.shout({
      action: "announce",
      msg: username + ' opened document.'
    });
    doc.on('shout', function(data) {
      switch (data.action) {
        case "announce":
          alert(data.msg);
          break;
        case "cursor":
          cursors[data.user] = {
            row: data.row,
            column: data.column,
            color: data.color
          };
          updateCursor(data.user, index);
          break;
        case "selection":
          selections[data.user] = [data.row, data.column, data.row2, data.column2, data.color];
          //updateSelections(data.user, index);
        break;
      }
    });
  });
}

