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
            html: '<h1 id="logo"><span class="fa fa-2x fa-mobile"></span> WebAppEditor</h1>' 
        },
        { type: 'menu',
          id: 'projectmenu',
          caption: 'Editing: /kdmon/Test-repo/',
          icon: '',
          items: [
          { text: 'New project', icon: 'fa fa-file' }, 
          { text: 'Open project', icon: 'fa fa-folder-open' },
          { text: 'Close current project', icon: 'fa fa-close' },
          {},
          { text: '/kdmon/Test-repo/ (editing)', icon: 'fa fa-github' }, 
          { text: '/kdmon/Three.js/', icon: 'fa fa-github' },
        ]},
        {
          id: 'collaborate',
          type: 'button',
          caption: 'Collaborate',
          icon: 'fa fa-comments-o',
          hint: 'Edit with friends via real-time text, audio and video chat.'
        },
        {
          id: 'topspace',
          type: 'spacer'
        },
        { type: 'menu',
          id: 'optionsmenu',
          caption: '',
          hint: 'Change layout.',
          icon: 'fa fa-columns',
          items: [
            { text: 'Preferences', icon: 'fa fa-wrench' },
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
        ]},
        {
          id: 'topbreak2',
          type: 'break'
        },
        { type: 'menu',
          id: 'accountmenu',
          caption: 'Account',
          title: 'Manage your account',
          icon: 'fa fa-user',
          items: [
          { text: 'Preferences', icon: 'fa fa-wrench' }, 
          { text: 'Sign out', icon: 'fa fa-power-off' }
        ]}
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
      w2ui[id[0]].toggle('preview', true);
    break;
    
    case 'leftcolumn':
      w2ui.layout.toggle('left',true);
    break;
    
    case 'bottomrow':
      w2ui.layout.toggle('bottom',true);
    break;
    
    case 'rightcolumn':
      w2ui.layout.toggle('right',true);
    break;
    
    case 'hide':
      w2ui[id[0]].toggle(id[1],true);
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

function refreshTabs() {
  
  // Reset draggable events
  var tabSelector = ".w2ui-panel-tabs td:not(:last-child)";
  var tabContainer = ".w2ui-panel-tabs td:last-child";
  var tabArea = "#temporarytab";
  
  $(tabSelector).off("dragstart").off("dragenter").off("dragleave").off("drag").off("dragend").off("drop");
  $(tabSelector).attr("draggable", "true");
  
  $(tabSelector).on("dragstart", function(event) {
    event.originalEvent.dataTransfer.setData('text', event.target.id);
    $(tabContainer).addClass('drop-highlight');
    //dropArea(this, 0);
  });
  
  $(tabSelector).on("dragenter", function(event) {
    event.preventDefault();
    var x = event.originalEvent.offsetX;
    dropArea(this, x);
  });
  
  $(tabSelector).on("drag", function(event) {
    event.preventDefault();
    $(this).hide();
  });
  
  $(tabSelector).on("dragend", function(event) {
    event.preventDefault();
    dropArea(this, 0, true);
    $(tabContainer).removeClass('drop-highlight');
    $(this).show();
  });
  
  $(tabContainer).off("dragstart").off("dragenter").off("dragleave").off("drag").off("dragend").off("drop");
  $(tabContainer).attr("draggable", "true");
  
  // Allow dropping by preventing default event!
  $(tabContainer).on("dragover", function(event) {
    event.preventDefault();
  });
  
  $(tabContainer).on("drop", function(event) {
    event.preventDefault();
    $(tabContainer).removeClass('drop-highlight');
    $(tabArea).remove();
    var originalId = event.originalEvent.dataTransfer.getData("text");
    
    // Exit if non-tab dropped
    if (originalId.indexOf('tabs_') < 0) return; 
    
    var origin = originalId.split("_");
    var originalCaption = $("#" + originalId).text();
    var originalLayout = origin[1];
    var originalPanel = origin[2];
    var originalTab = origin[5];
    var targetId = this.id;
    var target = targetId.split("_");
    var targetLayout = target[1];
    var targetPanel = target[2];
    var targetTab = target[5];
    var nextTabId = $(this).next().attr('id');
    var nextTab = (nextTabId === undefined) ? false : nextTabId.split("_")[5];

    // Exit if dropped on itself.
    if (originalId == targetId) return; 
    
    // Otherwise work out where tab was dropped and shuffle tabs
    tabList[originalTab].panel = panelAreas.indexOf("layout_"+targetLayout+"_panel_"+targetPanel);
    w2ui[originalLayout].get(originalPanel).tabs.remove(originalTab);
    
    // Insert before
    if (targetTab && (insertBefore || !tabExists)) w2ui[targetLayout].get(targetPanel).tabs.insert(targetTab, {
      id: originalTab,
      caption: originalCaption,
      closable: 'true'
    });
    // Insert after
    else if (targetTab) w2ui[targetLayout].get(targetPanel).tabs.insert(nextTab, {
      id: originalTab,
      caption: originalCaption,
      closable: 'true'
    });
    // Empty tab bar
    else w2ui[targetLayout].get(targetPanel).tabs.add({
      id: originalTab,
      caption: originalCaption,
      closable: 'true'
    });
    
    var tabLength = w2ui[targetLayout].get(targetPanel).tabs.tabs.length;
    var lastTab = w2ui[originalLayout].get(originalPanel).tabs.tabs.length;
    var lastId = w2ui[originalLayout].get(originalPanel).tabs.tabs[lastTab-1].id;
    console.log(lastTab, lastId);

    // problem here is focus stealing from editor
    /*
    // activate last remaining tab in orginal panel
    if (lastTab === 1) w2ui[originalLayout].get(originalPanel).tabs.click(lastId);
    */
    
    // activate tab if dragged to empty new panel
    if (tabLength === 1) w2ui[targetLayout].get(targetPanel).tabs.click(originalTab);
    

    refreshTabs();
  });
  
  
  
  updateLayout();
}


// Insert tab drop area and bind events to it

function dropArea (elem,x,hide) {
  
  // Clean up
  var tabArea = "#temporarytab";
  var tabExists = ($(tabArea).length > 0) ? true : false;
  $(tabArea).off("dragstart").off("dragenter").off("dragleave").off("drag").off("dragend").off("drop");
  $(tabArea).remove();
  
  if (hide) {return;}
  
  // Reset element and bind events
  
  var insertBefore = (x>50 || !tabExists) ? true : false;
  if (insertBefore) $('<td id="temporarytab"></td>').insertBefore(elem);
  else $('<td id="temporarytab"></td>').insertAfter(elem);

  $(tabArea).attr("draggable", "true");
  
  // Allow dropping by preventing default event!
  $(tabArea).on("dragover", function(event) {
    event.preventDefault();
  });
  
  $(tabArea).on("dragleave", function(event) {
    event.preventDefault();
    var x = event.originalEvent.offsetX;
    dropArea(this, x);
  });
  
  
  $(tabArea).on("drop", function(event) {
    event.preventDefault();
    $(".w2ui-panel-tabs table").removeClass('drop-highlight');
    $(tabArea).remove();
    var originalId = event.originalEvent.dataTransfer.getData("text");

    
    // Exit if non-tab dropped
    if (originalId.indexOf('tabs_') < 0) return; 
    
    var origin = originalId.split("_");
    var originalCaption = $("#" + originalId).text();
    var originalLayout = origin[1];
    var originalPanel = origin[2];
    var originalTab = origin[5];
    var targetId = elem.id;
    var target = targetId.split("_");
    var targetLayout = target[1];
    var targetPanel = target[2];
    var targetTab = target[5];
    var nextTabId = $(elem).next().attr('id');
    var nextTab = (nextTabId === undefined) ? false : nextTabId.split("_")[5];

    // Exit if dropped on itself.
    if (originalId == targetId) return; 
    
    // Otherwise work out where tab was dropped and shuffle tabs
    tabList[originalTab].panel = panelAreas.indexOf("layout_"+targetLayout+"_panel_"+targetPanel);
    w2ui[originalLayout].get(originalPanel).tabs.remove(originalTab);
    
    // Insert before
    if (targetTab && (insertBefore || !tabExists)) w2ui[targetLayout].get(targetPanel).tabs.insert(targetTab, {
      id: originalTab,
      caption: originalCaption,
      closable: 'true'
    });
    // Insert after
    else if (targetTab) w2ui[targetLayout].get(targetPanel).tabs.insert(nextTab, {
      id: originalTab,
      caption: originalCaption,
      closable: 'true'
    });
    // Empty tab bar
    else w2ui[targetLayout].get(targetPanel).tabs.add({
      id: originalTab,
      caption: originalCaption,
      closable: 'true'
    });
    
    var tabLength = w2ui[targetLayout].get(targetPanel).tabs.tabs.length;
    
    // activate tab if dragged to empty new panel
    if (tabLength === 1) w2ui[targetLayout].get(targetPanel).tabs.click(originalTab);

    refreshTabs();
  });
}

function tabClick(obj, event) {
  var item = tabList[event.target];
  console.log(item);
  switch (item.type) {
    case 'editor':
      editors[item.panel].setSession(item.editSession);
      editors[item.panel].focus();
      $("#editor" + item.panel).show();
      $("#content" + item.panel).hide();
    break;
    
    case 'filebrowser':
      $("#content" + item.panel).w2render(item.id);
      $("#editor" + item.panel).hide();
      $("#content" + item.panel).show();
    break;
    
    default: 
      return; 
    break;
  }

  
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


var panelAreas = [
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


// Wait until w2ui is ready, then initalise widgets
setTimeout(function(){init ()}, 50);
    
function init () {
  var i = 0;
  
  $(".w2ui-panel-content").each(function(){
    var panelId = $(this).parent().attr('id');
    if (panelAreas.indexOf(panelId) > -1) {
      $(this).append('<div id="container' + i + '" class="panel-container">' +
      '<div id="content' + i + '" class="panel-content"></div>' +
      '<div id="editor' + i + '" class="panel-editor"></div></div>');
      editors[i] = ace.edit($(this).find(".panel-editor")[0]);
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
  
  
  fileBrowser("kdmon", "ace-builds");
  fileBrowser("kdmon", "cats");
  
  refreshTabs();
  
}

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


var github = new Github({
  token: "",
  auth: "oauth"
});


// Create a side bar for browsing repository files

function fileBrowser (user, repository, branch, path, panel) {

  // 1. Fetch repo files, recursively?
  
  var repo = github.getRepo(user, repository);
  repo.contents(branch || 'master', path || '', function (err, data) {
    
  var title = "File Browser is a long tabe name like few" + repository;
  var id = "filebrowser" + Math.round(Math.random()*10000000);
  console.log(id);
    if (err) {
      console.log("Error retrieving files");
    }
    
    // 2. Generate widget
    
    else {
      var fileNodes = generateFileTree(data);
      var location = pickPanel(panel);
      
      // 3 Insert tab+widget in panel
      
      $().w2sidebar({
        name: id,
        nodes: fileNodes
      });
      
      // 4. Handle events
      w2ui[id].on('*', function (event) {
        console.log('Event: ' + event.type + ' Target: ' + event.target);
      }); 
      
      // 5. Insert tab and activate it
          
      
      tabList[id] = {
        id: id,
        caption: title,
        type: 'filebrowser',
        panel: location.area
      };
      
      w2ui[location.layout].get(location.panel).tabs.add({id: id, caption: title});
  
      
      refreshTabs();
    }
  }); 
 
}

// Create sidebar widget nodes from GitHub API data

function generateFileTree (data) {
  var files = [];
  var folders = [];
  
  for (var item in data) {
    var file = data[item];
    if (file.type == 'file') {
      files.push({
        id: 'file' + item,
        text: file.name,
        icon: 'fa fa-file'
      });
    }
    else {
      folders.push({
        id: 'folder' + item,
        text: file.name,
        icon: 'fa fa-folder',
        nodes: [{
          id: 'expand' + item,
          text: "Fetching files",
          icon: 'fa fa-refresh'}]
      });
    }
  }
  
  return folders.concat(files);
}


// Return best panel for new tabs

function pickPanel (identifier) {
  return {
    layout: 'middlesplit',
    panel: 'main',
    area: 2
    };
}



function startDoc (title, url, area, preserveContent, username, color) {
  
  var location = pickPanel();
  var editSession = ace.createEditSession('',  '');
  var editorObj = editors[location.area].setSession(editSession);
  
  tabList[title] = {
    id: title,
    caption: title,
    panel: location.area,
    type: 'editor',
    editSession: editSession
  };
  
  w2ui[location.layout].get(location.panel).tabs.add({id: title, caption:title});
  
  connection.open(url, 'text', function(error, doc) {
    doc.attach_ace(editors[location.area], preserveContent, username, color);
    doc.shout({
      action: "announce",
      msg: username + ' opened document.'
    });
    doc.on('shout', function(data) {
      switch (data.action) {
        case "announce":
          console.log(data.msg);
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
