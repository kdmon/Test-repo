String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

/* SETUP PANELS */
if (localStorage["token"] === undefined) localStorage["token"] = prompt("Github token required:");
var token = localStorage["token"];
$('#layout').w2layout({
  name: 'layout',
  panels: [{
    type: 'top',
    size: '30px',
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
    hidden: false,
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
$().w2layout({
  name: 'bottomsplit',
  panels: [{
    type: 'left',
    resizable: true,
    hidden: true,
    size: '33%',
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
    type: 'right',
    resizable: true,
    hidden: true,
    size: '33 %',
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
w2ui.layout.content('bottom', w2ui.bottomsplit);

$().w2layout({
  name: 'popupLayout',
  panels: [
    { type: 'left', size: 250, resizable: true, minSize: 200 },
    { type: 'main', minSize: 350, overflow: 'hidden' }
  ]
});

var connection = new sharejs.Connection("http://it4se.com:8081/channel");

/* SETUP TOOLBAR */
var toolbars = {
  topmenu: ['logo', 'topspacer','connection','topbreak1','collaborate','topbreak2', 'account'],
  editor: ['save', 'editmenu', 'tools'],
  preview: ['pause', 'previewurl', 'refresh', 'share'],
  projectmanager: ['refresh','newproject', 'selectproject', 'closeproject'],
  chat: ['url', 'refresh', 'share'],
  prefs: ['url', 'refresh', 'share'],
  filebrowser: ['refresh', 'share'],
  media: ['url', 'refresh', 'share'],
  empty: ['topbreak1'],
  help: []
};
var buttons = {
  logo : {
    type: 'html',
    id: 'logo',
    html: '<h1 id="logo" title="Edit Web Applications">'
    + '<span class="fa fa-2x fa-mobile logo"></span>'
    + '<span class="fa fa-pencil logo" style="top: -5px; left: -5px"></span>'
    + '<span id="alpha">v.0.1</span>'
    + 'WebAppEditor.com</h1>'
  },
  topspacer: {
    id: 'topspacer',
    type: 'spacer'
  },
  connection : {
    id: 'connection',
    type: 'html',
    html: '<span class="fa fa-circle fa-x" style="color: #0b0 !important;"></span> Connected.'
  }, 
  topbreak1 :{
    id: 'topbreak1',
    type: 'break'
  },
  collaborate : {
    id: 'collaborate',
    type: 'button',
    caption: 'Collaborate',
    icon: 'fa fa-comments-o',
    hint: 'Collaborate with friends via real-time text, audio and video chat.'
  },
  topbreak2: {
    id: 'topbreak2',
    type: 'break'
  }, 
  account: {
    type: 'menu',
    id: 'account',
    caption: 'Account',
    title: 'Manage your account',
    items: [{
      text: 'Preferences',
      icon: 'fa fa-wrench'
    }, {
      text: 'Sign out',
      icon: 'fa fa-power-off'
    }]
  },
  save: {
    id: 'save',
    type: 'button',
    caption: 'Save',
    icon: 'fa fa-save',
    hint: 'Save file'
  },
  savebreak: {
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
  editmenu: {
    id: 'editmenu',
    type: 'menu',
    caption: 'Edit',
    icon: '',
    arrow: false,
    items: [{
      text: 'Undo',
      icon: 'fa fa-reply'
    },{
      text: 'Redo',
      disabled: true,
      icon: 'fa fa-share'
    },{
    },{
      text: 'Search',
      icon: 'fa fa-search',
    },{
      text: 'Replace',
      icon: 'fa fa-edit'
    },{
      text: 'Go to line',
      icon: 'fa fa-level-down'
    }]
  },
  redobreak: {
    id: 'redobreak',
    type: 'break'
  },
  menu: {
    id: 'tools',
    type: 'menu',
    caption: 'Tools',
    icon: '',
    arrow: false,
    items: [{
      text: 'Open preview',
      icon: 'fa fa-tablet'
    },{
      text: 'Share preview',
      icon: 'fa fa-share-alt'
    },{
    },{
      text: 'Fix indentation',
      icon: 'fa fa-magic'
    },{
      text: 'Invite collaborator',
      icon: 'fa fa-user-plus'
    },{
      text: 'Manage revisions',
      icon: 'fa fa-history'
    }]
  },
  spacer: {
    id: 'spacer',
    type: 'spacer'
  },
  pause: {
    id: 'pause',
    type: 'button',
    caption: '',
    icon: 'fa fa-pause',
    hint: 'Pause'
  },
  previewurl: {
    type: 'html',
    id: 'previewurl',
    html: '<div style="padding: 3px 10px;">Input: <input size="10" style="' +
    'padding: 3px; border-radius: 2px; border: 1px solid silver"/></div>'
  },
  splitleft: {
    id: 'splitleft',
    type: 'button',
    caption: '',
    icon: 'fa fa-caret-left',
    hint: 'Split view left'
  },
  splitright: {
    id: 'splitright',
    type: 'button',
    caption: '',
    icon: 'fa fa-caret-right',
    hint: 'Split view right'
  },
  split: {
    id: 'split',
    type: 'button',
    caption: '',
    icon: 'fa fa-sort',
    hint: 'Split view'
  },
  refresh: {
    id: 'refresh',
    type: 'button',
    caption: '',
    icon: 'fa fa-refresh',
    hint: 'Force preview reload'
  },
  share: {
    id: 'share',
    type: 'button',
    caption: '',
    icon: 'fa fa-external-link',
    hint: 'Open preview externally'
  }
};

function toolbarClick(obj, event) {
  var id = obj.name.split("_");
  var elem = 'layout_'+id[0]+'_panel_'+id[1];
  var panel = pickPanel(elem);
  var tab = (w2ui[id[0]+'_'+id[1]+'_tabs'] !== undefined) ?
    w2ui[id[0]+'_'+id[1]+'_tabs'].active : '';
  switch (event.target) {
    case 'editmenu:Search':
      editors[panel.area].execCommand("find");
      break;
    case 'tools:Open preview':
      openPreview(tab);
      break;
    default:
    //obj.owner.content('main', 'event' + event.target);
    break;
  }
}

function openPreview (tabId, panel) {
  var location = pickPanel (panel || 'preview');
  var file = tabId.split('/');
  var title = (file.length > 0) ? file[file.length-1] : file;
  var previewId = "preview_" + tabId.hashCode();
  var fullUrl = (tabId.substr(4) === 'http') ? tabId : 'http://it4se.com:8080/' + tabId;
  tabList[previewId] = {
    id: previewId,
    fullUrl: fullUrl,
    caption: title,
    panel: location.area,
    type: 'preview'
  };
  
  w2ui[location.layout].get(location.panel).tabs.add({
    id: previewId,
    caption: title
  });
      
  refreshTabs();

  // 4. render into temporary dom element once
  $('<div id="container_' + previewId +'" class="panel-content preview-area" style="display:none"></div>').appendTo( "body" );
  $("#container_"+previewId).html('<iframe class="preview-iframe" src="' + fullUrl + '"></iframe>');

  w2ui[location.layout].get(location.panel).tabs.click(previewId);
  $(location.id).find(".w2ui-tabs").scrollLeft(99999);
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
    if (item.html)
    w2ui[layout].get([panel]).toolbar.add({
      id: item.id,
      type: item.type,
      html: item.html,
      hint: item.hint,
      items: item.items
    });
    else
    w2ui[layout].get([panel]).toolbar.add({
      id: item.id,
      hint: item.hint,
      type: item.type,
      caption: item.caption,
      icon: item.icon,
      items: item.items
    });
  }
  // Then toggle which buttons to show
  switchToolbar(layout, panel, toolbar);
}

initialiseToolbar('layout', 'top', 'topmenu');
initialiseToolbar('leftsplit', 'main', 'empty');
initialiseToolbar('leftsplit', 'preview', 'empty');
initialiseToolbar('middlesplit', 'main', 'empty');
initialiseToolbar('middlesplit', 'preview', 'empty');
initialiseToolbar('rightsplit', 'main', 'empty');
initialiseToolbar('rightsplit', 'preview', 'empty');
initialiseToolbar('bottomsplit', 'left', 'empty');
initialiseToolbar('bottomsplit', 'main', 'empty');
initialiseToolbar('bottomsplit', 'right', 'empty');

/* SETUP TABS */
var tabList = {};
var draggedTabId = '';

function refreshTabs() {
  // Reset draggable events
  var tabSelector = ".w2ui-panel-tabs td:not(:last-child)";
  var tabContainer = ".w2ui-panel-tabs td:last-child";
  var tabArea = "#temporarytab";
  $(tabContainer).removeClass('drop-highlight');
  $(tabSelector).off("dragstart").off("dragenter").off("dragleave").off("drag").off("dragend").off("drop");
  $(tabSelector).attr("draggable", "true");
  $(tabSelector).on("dragstart", function(event) {
    //event.preventDefault();
    //required for firefox to enable dropping
    event.originalEvent.dataTransfer.setData('text', '');
    draggedTabId = event.target.id;
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
  // remove existing events on tabcontainer
  $(tabContainer).off("dragstart").off("dragenter").off("dragleave").off("drag").off("dragend").off("drop");
  // Allow dropping by preventing default event!
  $(tabContainer).on("dragover", function(event) {
    event.preventDefault();
  });
  $(tabContainer).on("drop", function(event) {
    event.preventDefault();
    var originalId = draggedTabId; //event.originalEvent.dataTransfer.getData("text");
    handleDrop (originalId, this);
  });
}

// Insert tab drop area and bind events to it
function dropArea(elem, x, hide) {
  // Clean up
  var tabArea = "#temporarytab";
  var tabExists = ($(tabArea).length > 0) ? true : false;
  $(tabArea).off("dragstart").off("dragenter").off("dragleave").off("drag").off("dragend").off("drop");
  $(tabArea).remove();
  if (hide) {
    return;
  }
  // Reset element and bind events
  var insertBefore = (x > 50 || !tabExists) ? true : false;
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
    var originalId = draggedTabId; //event.originalEvent.dataTransfer.getData("text");
    handleDrop (originalId, elem, insertBefore);
  });
}

function handleDrop(originalId, destination, insertBefore) {
  // hide drop hints
  $(".w2ui-panel-tabs table").removeClass('drop-highlight');
  var tabArea = "#temporarytab";
  // Exit if non-tab object was dropped
  if (originalId.indexOf('tabs_') < 0) return;
  // Exit if tab is dropped on itself.
  if (originalId === destination.id) return;
  // Split original and target id into their components.
  // This works even if repo name and files contains _
  var origin = originalId.split("_");
  origin.shift();
  var originalLayout = origin.shift();
  var originalPanel = origin.shift();
  origin.shift();
  origin.shift();
  var originalTab = origin.join("_");
  // jQuery doesn't handle slashes in id, so use native js function instead
  var originalCaption = document.getElementById(originalId);
  originalCaption = $(originalCaption).text();
  var target = destination.id.split("_");
  var targetLayout = target[1];
  var targetPanel = target[2];
  var targetTab = target[5];
  // Test for existing adjacent tabs
  var tabExists = ($(tabArea).length > 0) ? true : false;
  $(tabArea).remove();
  var nextTabId = $(destination).next().attr('id');
  var nextTab = (nextTabId === undefined) ? false : nextTabId.split("_")[5];
  // Work out on which tab bar the tab was dropped and reformat it
  tabList[originalTab].panel = panelAreas.indexOf("layout_" + targetLayout + "_panel_" + targetPanel);
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
  var lastId = (lastTab > 0) ?w2ui[originalLayout].get(originalPanel).tabs.tabs[lastTab - 1].id : 0;
  
  // Activate last tab in original pane if it exists and the active tab is moved
  if (lastTab > 0 && w2ui[originalLayout].get(originalPanel).tabs.active === originalTab)
    w2ui[originalLayout].get(originalPanel).tabs.click(lastId, true);

  // Always activate dragged tab
  w2ui[targetLayout].get(targetPanel).tabs.click(originalTab, true);

  /*
  // activate tab if dragged to empty new panel
  if (tabLength === 1) w2ui[targetLayout].get(targetPanel).tabs.click(originalTab);
  else { // otherwise activate active tab in destination panel
    var activeTab = w2ui[targetLayout].get(targetPanel).tabs.active;
    w2ui[targetLayout].get(targetPanel).tabs.click(activeTab);
  }
  */
  refreshTabs();
  updateLayout();
}

function tabClick(obj, event) {
  var elem;
  var item = tabList[event.target];
  var location = pickPanel(item.panel);
  
  // Don't re-render active preview iframes unless they are being moved!
  var moved = true;
  if (item.type == 'preview') {
    var parentId = '#' + $("#container_"+item.id).parent().parent().parent().attr('id');
    moved = (parentId !== location.id || w2ui[location.layout].get(location.panel).tabs.active !== item.id) ? true : false;
  }
  if (!moved) return;
  
  $("#editor" + item.panel).hide();
  $("#content" + item.panel).hide();
  $("#container" + item.panel + " .w2ui-sidebar").hide();
  $("#container" + item.panel + " .preview-area").hide();
  
  switch (item.type) {
    case 'editor':
      switchToolbar(location.layout, location.panel, 'editor');
      editors[item.panel].setSession(item.editSession);
      editors[item.panel].focus();
      $("#editor" + item.panel).show();
      break;
    case 'preview':
      elem = $("#container_" + item.id).detach();
      elem.appendTo("#container" + item.panel).show();
      switchToolbar(location.layout, location.panel, 'preview');
      break;
    case 'filebrowser':
      elem = $("#container_" + item.id).detach();
      elem.appendTo("#container" + item.panel).show();
      switchToolbar(location.layout, location.panel, 'filebrowser');
      break;
    case 'projectmanager':
      switchToolbar(location.layout, location.panel, 'projectmanager');
      elem = $("#container_" + item.id).detach();
      elem.appendTo("#container" + item.panel).show();
      break;
    default:
      break;
  }
  updateLayout();
}

// Clean up tab content
function tabClose(obj, event) {
  // w2ui destroy
  // ace detach etc...
}

var resizeTimer = setTimeout(function() {}, 50);

function updateLayout(editorOnly) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    if (editorOnly === undefined) {
      w2ui.layout.resize();
    }
    for (var i = 0; i < editors.length; i++) {
      editors[i].resize();
      var location = panelAreas[i].split("_");

      // Hide inactive tab areas
      if (w2ui[location[1]].get(location[3]).tabs.tabs.length === 0) {
        $("#editor" + i).hide();
        $("#container"+ i + " .w2ui-sidebar").hide();
        $("#content" + i).html('<div class="inactive-panel">' +
        '<p><em>Side panel empty.</em> Drag a tab over to activate it or ' +
        '<span class="small-button" onclick="togglePanel(' + i + ')">close it.</span></p></div>');
        if (location[1] === 'middlesplit' && location[3] === 'main')
        $("#content" + i).html('<div class="inactive-panel">' +
        '<p><em>Main panel empty.</em> Drag a tab over to activate it.' +
        '</p></div>');
        $("#content" + i).show();
        switchToolbar(location[1], location[3], 'empty');
      }
    }

  }, 50);
}

function togglePanel (id) {
  var location = panelAreas[id].split("_");
  if (location[3] === 'main') {
    // todo: check if other panels exist in layout
    // and close them first, swapping tabs with main.
    w2ui[location[0]].toggle(location[1].substr(0,location[1].length-5), true);
  }
  else {
    w2ui[location[1]].toggle(location[3], true);
  }
}


/* Resize events */
$(window).on("resize", function () {
 //updateLayout();
 setTimeout(function() {updateLayout()}, 1);
});

w2ui.leftsplit.on('resize', function () {
  updateLayout(true);
});
w2ui.middlesplit.on('resize', function () {
  updateLayout(true);
});
w2ui.rightsplit.on('resize', function () {
  updateLayout(true);
});
w2ui.bottomsplit.on('resize', function () {
  updateLayout(true);
});

// Prevent toolbars from stealing focus from editor
$(".w2ui-toolbar:not(.selectable)").on('mousedown', function(event) {
  if (event.target.className.indexOf('selectable') < 0) event.preventDefault();
});


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
  'layout_bottomsplit_panel_right'
];

var github = new Github({
  token: localStorage.token,
  auth: "oauth"
});


var config = {};

var user = github.getUser();

// Get authenticated user details

user.show('', function(err, user) {
  config.user = user.login;
  config.avatar = user.avatar_url;
  
  w2ui["layout"].get(["top"]).toolbar.set('account', {
    caption: config.user,
    img: '"><img class="account-icon" src="' + config.avatar +'"/> <i id="'
  });

  w2ui["layout"].get(["top"]).toolbar.refresh();
  
  /*w2ui['toolbar'].set('item3', { caption: 'check 2' });
  w2ui['toolbar'].refresh();
  $()shared.nodes.push({
            id: item.full_name + '_' + rnd,
            text: '<img class="custom-icon" src="' + item.owner.avatar_url +'"/> ' + item.full_name
          });
          */
  init();
});




var dirtyFileTimer = setTimeout(function (){}, 50);


function init() {
  var i = 0;
  $(".w2ui-panel-content").each(function() {
    var panelId = $(this).parent().attr('id');
    if (panelAreas.indexOf(panelId) > -1) {
      $(this).append('<div id="container' + i + '" class="panel-container">'
      + '<div id="content' + i + '" class="panel-content"></div>'
      + '<div id="editor' + i + '" class="panel-editor"></div></div>');
      editors[i] = ace.edit($(this).find(".panel-editor")[0]);
      editors[i].on('focus', function(event, obj) {
        $('.w2ui_tabs').removeClass('active');
        $('.w2ui_tabs').removeClass('active-tab');
        $(obj.container).addClass('active-editor');
        //work out which tab is active
        $('.w2ui_tabs').addClass('active-tab');
      });
      editors[i].on('blur', function(event, obj) {
        $(obj.container).removeClass('active-editor');
      });
      i++;
    }
  });
  showProjects();
  updateLayout();  
}

// Show and generate project list dialogue

function showProjects (panelArea) {
  
  github.getUser().repos(function(err, repos) {
    
    if (err) w2alert('No repositories are accessible');
    
    else {
      
      var id = "projectmanager" + Math.round(Math.random() * 10000000);
      var location = pickPanel(panelArea || 'project');
      var secret = {id: 'secret', text: 'Private projects (', group: true, expanded: true, nodes: []};
      var open = {id: 'public', text: 'Public projects (', group: true, expanded: true, nodes: []};
      var shared = {id: 'shared', text: 'Projects shared with you (', group: true, expanded: true, nodes: []};
      var forked =  {id: 'forked', text: 'Forks (', group: true, expanded: true, nodes: []};
      
      var obj = repos.sort(function(a,b){
        if(a.full_name.toLowerCase() > b.full_name.toLowerCase()) return 1;
        if (a.full_name.toLowerCase() < b.full_name.toLowerCase()) return -1;
        else return 0;
      });
        
      for (var i in obj) {
        var item = obj[i];
        var rnd = Math.round(Math.random()*1000000);
        
        if (item.fork)
          forked.nodes.push({
            id: item.full_name + '_' + rnd,
            text: item.name,
            icon: "fa fa-code-fork"
          });
        else if (item.private)
          secret.nodes.push({
            id: item.full_name + '_' + rnd,
            text: item.name,
            icon:  "fa fa-eye-slash"
          });
        else if (item.owner.login !== config.user)
          shared.nodes.push({
            id: item.full_name + '_' + rnd,
            text: '<img class="custom-icon" src="' + item.owner.avatar_url +'"/> ' + item.full_name
          });
        else
          open.nodes.push({
            id: item.full_name + '_' + rnd,
            text: item.name,
            icon: "fa fa-github"
          });
      }
      
      // update count
      
      open.text += open.nodes.length + ')';
      shared.text += shared.nodes.length + ')';
      secret.text += secret.nodes.length + ')';
      forked.text += forked.nodes.length + ')';
      

      // 3. Show tab
      tabList[id] = {
        id: id,
        caption: 'Project Manager',
        type: 'projectmanager',
        panel: location.area
      };
      w2ui[location.layout].get(location.panel).tabs.add({
        id: id,
        caption: 'Project Manager'
      });
      
      refreshTabs();
      
      
      // 4. render into temporary dom element once
      $('<div id="container_' + id +'" class="panel-content" style="display:none"></div>').appendTo( "body" );
      $("#container_"+id).w2sidebar({
        name: 'projectList',
        //topHTML: '<div style="background-color: #eee; text-align: center; padding: 10px 5px; border-bottom: 1px solid silver">YOUR PROJECTS</div>',
        showMax: true,
        nodes: [
          secret,
          open,
          shared,
          forked
        ],
        onDblClick: function (event) {
          var target = event.target.split('/');
          var user = target[0];
          target = target[1].split('_');
          target.pop();
          var repo = target.join('_');
          w2popup.open({
            title: 'Opening ' + repo
          });
          w2popup.lock('Loading ' + repo, true);
          openProject(user,repo);
        }
      });

      w2popup.close();
      w2ui[location.layout].get(location.panel).tabs.click(id);
    }
  });

  w2popup.open({
    title: 'Opening existing projects'
  });
  w2popup.lock('Loading projects ...', true);

}

function addTab (id, caption, type, panel, activate) {
  
}

// Create a sidebar for browsing repository files
function openProject (user, repository, branch, panelArea) {
  var repo = github.getRepo(user, repository);
  branch = (branch !== undefined) ? branch : 'master';
  // 1. Fetch repo files, recursively - should be allocated to a worker
  repo.getTree(branch + '?recursive=true', function (err, tree) {
    var title = "File Browser<br/>" + repository;
    var id = "filebrowser" + Math.round(Math.random() * 10000000);

    if (err) {
      console.log("Error retrieving files", err);
    }
    // 2. Generate widget
    else {
      var location = pickPanel(panelArea || 'filebrowser');
      var fileNodes = generateNodes(tree, user, repository, branch);

      // 3. Show tab
      tabList[id] = {
        id: id,
        caption: title,
        type: 'filebrowser',
        panel: location.area
      };
      w2ui[location.layout].get(location.panel).tabs.add({
        id: id,
        caption: title
      });
      
      refreshTabs();
      
      
      // 4. render into temporary dom element once
      $('<div id="container_' + id +'" class="panel-content" style="display:none"></div>').appendTo( "body" );
      $("#container_"+id).w2sidebar({
        name: id,
        nodes: fileNodes
      });
      
      // 5. Handle events
      // directory opened
      w2ui[id].on('collapse', function(event) {
        event.object.icon = 'fa fa-folder';
      });
      w2ui[id].on('expand', function(event) {
        event.object.icon = 'fa fa-folder-open';
      });
      // file open
      w2ui[id].on('dblClick', function(event) {
        if(event.target.substr(0,6) === "folder") return;
        var path = event.target.substr(event.target.indexOf("_")+1).split('/');
        var id = path.join('/');
        var user = path.shift();
        var repo = path.shift();
        var branch = path.shift();
        var title = path[path.length-1];
        path = path.join('/');
        startDoc({
          id: id,
          user: user,
          repo: repo,
          branch: branch,
          path: path,
          title: title
        });
      });
      w2popup.close();
      w2ui[location.layout].get(location.panel).tabs.click(id);
      $(location.id).find(".w2ui-tabs").scrollLeft(99999);
    }
  });
  
}

// Create sidebar widget nodes from GitHub API tree
function generateNodes(tree, user, repo, branch) {
  
  // Sort files and directories
  var files = tree.sort(function(a,b){
    
    var typeComparison = 0; // same type
    if(a.type < b.type) typeComparison = 1; // folder (tree)
    if(a.type > b.type) typeComparison = -1; // file (blob)
    
    // Path depth
    var pathComparison = a.path.split('/').length - b.path.split('/').length;
    
    var filename = 0; // same filename
    if(a.path < b.path) filename = -1;
    if(a.path > b.path) filename = 1;
    
    // List folders first, sorted by path depth and then filename
    
    if(typeComparison > 0) return 1; // promote folders over files
    if(typeComparison < 0) return -1; // demote files over folders
    
    // If same type, sort by depth and then filename

    if(typeComparison === 0)  { 
      // If files are on the same depth, use filename as sort criteria
      if (pathComparison === 0) return filename;
      else return pathComparison; // otherwise use depth as sort criteria
    }
    
    // don't sort if files are identical (case should not occur)
    return 0;
    
  });
  
  var nodes = [];
  
  var uid = Math.round(Math.random() * 1000000000);
  
  for (var index in files) {
    var file = files[index];
    var prefix = ((file.type === "tree") ? 'folder' : '');
    var id = prefix + uid + "_" + user + '/' + repo + '/' + branch + '/' + file.path;
    var icon = (file.type === "tree") ? 'fa fa-folder' : 'fa fa-file-o';
    var paths = file.path.split('/');
    var filename = paths.pop();
    var depth = paths.length;
    var path = paths.join ('/');
    var obj = {};
    
    // root files/folders 
    if (depth === 0) {
      obj = {
        id: id,
        text: filename,
        icon: icon
      };
      
      if (file.type === "tree") {obj.nodes = []; nodes.push(obj);}
      else nodes.push(obj);
    }
    
    // nested files - need recursive search.
    else {
      obj = {
        id: id,
        text: filename,
        icon: icon
      };
      
      // Locate the parent node in file structure object and insert the node
      
      var location = getObjects(nodes, 'id', 'folder'+uid + "_" + user + '/' + repo + '/' + branch + '/' + path)[0];

      if (file.type === "tree") {obj.nodes = []; location.nodes.push(obj);}
      else location.nodes.push(obj);
    }
  }
  return nodes;
}

// json search helper fxn
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
}

// Return best panel for new tabs.
// Identifier can be a number (0-8),
// an element id, an area label or
// blank to return a default value.
function pickPanel(identifier) {
  
  identifier = (identifier !== undefined) ? identifier : '';

  var obj = {};

  // Number
  if (identifier >=-1 && identifier < 9 && $.isNumeric(identifier)) {
    obj = {
      id: "#" + panelAreas[identifier],
      layout: panelAreas[identifier].split('_')[1],
      panel: panelAreas[identifier].split('_')[3],
      area: identifier
    };
  }
  
  // element
  else if (identifier.indexOf("_")>-1) {
    for (var i = 0; i<panelAreas.length; i++) {
      if (identifier == panelAreas[i]) {
        obj = {
          id: "#" + panelAreas[i],
          layout: panelAreas[i].split('_')[1],
          panel: panelAreas[i].split('_')[3],
          area: i
        };
        break;
    }
    }
    
  }
  
  // Label + default
  
  else {
    switch (identifier) {
      case 'preview':
        obj = {
          id: "#" + panelAreas[4],
          layout: panelAreas[4].split('_')[1],
          panel: 'main',
          area: 4
        };
      break;
      
      case 'project':
        obj = {
          id: "#" + panelAreas[0],
          layout: panelAreas[0].split('_')[1],
          panel: 'main',
          area: 0
        };
      break;
      
      case 'filebrowser':
        obj = {
          id: "#" + panelAreas[0],
          layout: panelAreas[0].split('_')[1],
          panel: 'main',
          area: 0
        };
      break;
      
      default:
        obj = {
          id: "#" + panelAreas[2],
          layout: 'middlesplit',
          panel: 'main',
          area: 2
        };
      break;
    }
    
  }

  return obj;
}

function startDoc(settings) {
  w2popup.open().lock("Loading " + settings.path, true);
  var tabId = settings.id;
  var user = settings.user;
  var repository = settings.repo;
  var branch = settings.branch;
  var path = settings.path;
  var title = settings.title;
  var preserveContent = settings.preserveContent || false;
  var color = settings.color || "red";
  var username = config.user || 'guest';
  var url = encodeURIComponent("/"+user+"/"+repository+"/"+branch+"/"+path);
  var location = pickPanel();
  
  // fetch file via github api
  var repo = github.getRepo(user, repository);
  repo.read(branch, path, function(err, value) {
    if(err) {
      w2popup.close();
      w2alert ("unable to read file", err);
    }
    
    else {
      connection.open(url, 'text', function(error, doc) {
        if(error) {
          w2popup.close();
          console.log ("Unable to initiate real-time document", error);
        }
        else {
          var editSession = ace.createEditSession('', '');
          var editorObj = editors[location.area].setSession(editSession);
          tabList[tabId] = {
            id: tabId,
            caption: title,
            panel: location.area,
            type: 'editor',
            editSession: editSession
          };
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
          
          editors[location.area].selection.on("changeCursor", function(data) {
            var position = editors[location.area].selection.getCursor();
            doc.shout({
              action: "cursor",
              user: username,
              color: color,
              column: position.column,
              row: position.row
            });
          });
          editors[location.area].selection.on("changeSelection", function(data) {
            var position = editors[location.area].getSelectionRange();
            if (position.first) doc.shout({
              action: "selections",
              user: username,
              color: cursorColor,
              column: position.first.column,
              row: position.first.row,
              column2: position.end.column,
              row2: position.end.row
            });
          });
            
          var modelist = ace.require('ace/ext/modelist');
          var UndoManager = ace.require("ace/undomanager").UndoManager;
          ace.require("ace/ext/emmet");
          editors[location.area] = ace.edit("editor" + location.area);
          editors[location.area].setBehavioursEnabled(true);
          
          if (localStorage.fontSize) {$(".editor").css("font-size", localStorage.fontSize + "px");}
          
          editors[location.area].setOptions({
            enableBasicAutocompletion: true
          });
          editors[location.area].focus();
          var mode = modelist.getModeForPath(path).mode;
          editors[location.area].getSession().setMode(mode);
          editors[location.area].setOption("enableEmmet", true);
          editors[location.area].getSession().setTabSize(2);
          
          if (localStorage.lineWrap > 0) editors[location.area].getSession().setUseWrapMode(true);
          else editors[location.area].getSession().setUseWrapMode(false);
          
          //editors[location.area].session.setValue(value);
          editors[location.area].setValue(value, -1);
          editors[location.area].getSession().setUndoManager(new UndoManager());
          
          /*
          // Hover over text in editor to trigger guides
          editors[location.area].on('mousemove', function(e) {
            var position = e.getDocumentPosition();
            var token = editors[location.area].session.getTokenAt(position.row, position.column);
            if (token.type == 'support.type' || token.type == 'support.function') {
              switch (token.value) {
    	      case '': break;
              }
            //console.log(token);
            }
          });
          */
  
          editors[location.area].getSession().on('change', function(e) {
            clearTimeout(dirtyFileTimer);
            dirtyFileTimer = setTimeout(function () {
  
              // force browsersync update
              $.get("http://it4se.com:3000/__browser_sync__?method=reload&args=" + url, function (data) {});
  
              if (editors[location.area].getSession().getUndoManager().isClean()) w2ui[location.layout].get(location.panel).set(tabId, { caption: path });
              else w2ui[location.layout].get(location.panel).set(tabId, { caption: ' * ' + path});
  
              if (editors[currentFile].getSession().getUndoManager().hasUndo()) console.log("enable undo button");
              else console.log("disable undo button");
  
              if (editors[currentFile].getSession().getUndoManager().hasRedo()) console.log("enable redo button");
              else console.log("disable redo button");
  
              checkUnsaved();
  
            }, 500);
            
            /*
            // alert ("livecoding: " + liveCoding + "\nDelay:" + liveCodingDelay + "\nrunning?" + editors[currentFile].running);
            if (liveCodingDelay > 0 && editors[currentFile].running) {
              clearTimeout(liveCodingTimer);
              liveCodingTimer = setTimeout(function() {
                runCode();
              }, liveCodingDelay);
            }
            */
          });
          
          if (localStorage.editorTheme) {editors[location.area].setTheme(localStorage.editorTheme);}
          else {
              
            if (localStorage.uitheme == "dark") {
              editors[location.area].setTheme("ace/theme/vibrant_ink");
            } else {
              editors[location.area].setTheme("ace/theme/chrome");
            }
          }
          
          // add tab and listen for tab close clicks
          w2ui[location.layout].get(location.panel).tabs.add({
            id: tabId,
            caption: title
          });
          
          // needs to be handled elsewhere for all tabs at once!
          /*
          w2ui.tabs.on('close', function(event) {
            
            var proceed = false;
            
            var editorIndex = tabList[tabId].panel;
            var saved = editors[editorIndex].getSession().getUndoManager().isClean();

            if (!saved) proceed = confirm ("Are you sure you want to close this unsaved file?")

            if (saved || proceed) {
              doc.close();
              doc.detach_ace();
              // Remove editsession from editor object ???
              // editors[editorIndex].destroy();
              delete tabList[tabId];
            }

            // Don't close it
            else event.preventDefault();
            
          });
          */
          
          
                  
          // alert ("running");
          refreshTabs();
          updateLayout(); // inserts overflow scrollbar
          w2ui[location.layout].get(location.panel).tabs.click(tabId);
          w2popup.close();

        }
        
      });

    }
  });
}


var cursors = {};
var selections = {};
var cursorHash = [];
var cursorKey = 'Guest';

function updateCursor(key, index, remove) {
  // remove existing cursor, if they exist
  if (cursorHash[key]) {
    editors[index].session.removeMarker(cursorHash[key]);
  }
  // redraw cursor
  if (!remove) {
    var pointAnchor = editors[index].getSelectionRange();
    pointAnchor.start = editors[index].session.doc.createAnchor({
      row: cursors[key].row,
      column: cursors[key].column
    });
    pointAnchor.end = editors[index].session.doc.createAnchor({
      row: cursors[key].row + 1,
      column: cursors[key].column
    });
    cursorKey = key;
    cursorHash[key] = editors[index].session.addMarker(pointAnchor, "ace_step", drawMarker, true);
  }
}

function drawMarker(returnArray, range, left, top, config) {
  var color = "blue";
  var opacity = 1;
  //hat
  returnArray.push("<div class='ace_selection' style='", "opacity:", opacity, ";", "left:", left - 2, "px;", "top:", top - 3, "px;", "height:", 5, "px;", "width:", 6, "px; background: ", color || "", "'></div>");
  //stem
  returnArray.push("<div class='ace_selection' style='", "opacity:", opacity, ";", "left:", left, "px;", "top:", top, "px;", "height: 1em;", "width:", 2, "px; background: ", color || "", "'></div>");
  //eventlistener circle 
  returnArray.push("<div data-user='popup' class='ace_selection' style='", "border-radius: 30px; background: ", color, "; opacity:0.2;", "left:", left - 16, "px;", "top:", top - 11, "px;", "height:", 35, "px;", "width:", 35, "px; pointer-events: auto; cursor: help;' onmouseover='javascript: showAuthor(this, 1);' onmouseout='javascript: showAuthor(this);'></div><div id='popup' style='position:absolute; ", "top:", top - 25, "px;", "left:", left - 2, "px;", "background: white; border-radius: 10px; border: 1px solid ", color, "; padding: 2px; display: none;'><b>" + cursorKey + "</b></div>");
}



// KNOCKOUT MODEL - not implemented

var Model = function() {
  var self = this;
  // Tracks opened projects
  self.projects = ko.observableArray();
  // Tracks opened files/tabs
  self.documentCounter = ko.observable(0);
  // Return list of all projects
  self.projectList = ko.computed(function() {
    var list = [];
    for (i = 0; i < self.projects().length; i++) {
      list.unshift(self.projects()[i].title);
    }
    return list;
  });
  // Track currently active project
  self.activeProject = ko.observable(0);
  // Return active project object
  self.currentProject = ko.computed(function() {
    return self.projects()[self.activeProject()];
  });
  // Explicitly passing in params not possible from dom binding
  // Instead can be implicit if inside ko context, with, foreach etc.
  self.addProject = function() {
    self.projects.push(new Project("Untitled " + Math.random()));
  };
  self.closeProject = function(project) {
    self.projects.remove(project)
  };
  self.selectProject = function(project) {
    self.activeProject(project)
  };
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
    var editSession = ace.createEditSession('', '');
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
    if (self.documents().length > 0) {
      $("#editor").show();
      webAppEditor.setSession(self.documents()[self.documents().length - 1].editSession);
      webAppEditor.focus();
    } else $("#editor").hide();
  });
};
var Document = function(title, editSession) {
  var self = this;
  self.title = ko.observable(title || 'zebra');
  self.editSession = editSession;
};
var Editor = function() {
  var self = this;
  self.document = ko.observable();
};
var app = new Model();

setTimeout(function() {
  ko.applyBindings(app);
}, 250);