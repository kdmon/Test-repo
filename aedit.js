/* SETUP PANELS */

var pstyle = 'background: #eee; border: none; padding: 0; margin:0;';
$('#layout').w2layout({
  name: 'layout',
  panels: [
    {
    type: 'top',
    size: 38,
    toolbar: {
      items: [
      {
        id: 'selectproject',
        type: 'html',
        html: '<div style="padding: 3px 10px;">Switch project: <select><option>A project</option><option>New project</option></select></div>'
      },
      {
        id: 'closeproject',
        type: 'button',
        caption: 'Close project',
        icon: 'fa fa-close',
        hint: 'Close current project'
      }],
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
    resizable: true,
    style: pstyle,
    content: 'split'
  }, {
    type: 'main',
    resizable: true,
    style: pstyle,
    content: 'split'
  }, {
    type: 'right',
    size: '25%',
    resizable: true,
    style: pstyle,
    content: 'split'
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
    content: 'left main',
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
    content: 'left subpanel',
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
  name: 'mainsplit',
  panels: [
    {
    type: 'main',
    resizable: true,
    style: pstyle,
    content: 'middle main',
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
    content: 'middle subpanel',
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
    content: 'right-main',
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
    content: 'right subpanel',
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
w2ui.layout.content('main', w2ui.mainsplit);
w2ui.layout.content('right', w2ui.rightsplit);


/* SETUP TOOLBAR */

var toolbars = {
  editor: ['save', 'undo','redo','more','spacer','split','hide'],
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
  hide: {
    id: 'hide',
    type: 'button',
    caption: '',
    icon: 'fa fa-eye-slash',
    hint: 'Hide view'
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

initialiseToolbar ('mainsplit','main','editor');
initialiseToolbar ('mainsplit','preview','editor');

initialiseToolbar ('rightsplit','main','editor');
initialiseToolbar ('rightsplit','preview','editor');


/* SETUP TABS */

function refreshTabs(disableDrag) {
  var targetSelector = ".w2ui-tabs";
  var tabSelector = ".w2ui-panel-tabs td";
  // Clear any existing bindings
  $(targetSelector).off("dragstart");
  $(tabSelector).off("dragover").off("drop");
  // Update all tab strips
  //w2ui['layout'].refresh();
  // Enable dragging
  if (!disableDrag) {
    $(".w2ui-tab").parent().attr("draggable", "true");
    $(".w2ui-tabs").on("dragstart", function(event) {
      event.originalEvent.dataTransfer.setData('text', event.target.id);
      $(".w2ui-panel-tabs table").css({
        "background": "#afa"
      });
    });
    $(".w2ui-tabs").on("dragend", function(event) {
      $(".w2ui-panel-tabs table").css({
        "background": "#aaa"
      });
    });
    $(".w2ui-panel-tabs td").on("dragover", function(event) {
      event.preventDefault();
    });
    $(".w2ui-panel-tabs td").on("drop", function(event) {
      $(".w2ui-panel-tabs table").css({
        "background": "#aaa"
      });
      event.preventDefault();
      var originalId = event.originalEvent.dataTransfer.getData("text");
      var origin = originalId.split("_");
      var originalCaption = $("#" + originalId).text();
      var originalLayout = origin[1];
      var originalPane = origin[2];
      var originalTab = origin[5];
      var targetId = event.currentTarget.id;
      var target = targetId.split("_");
      var targetLayout = target[1];
      var targetPane = target[2];
      var targetTab = target[5];
      if (originalId == targetId) return; // do nothing if dropped on itself.
      w2ui[originalLayout].get(originalPane).tabs.remove(originalTab);
      if (targetTab) w2ui[targetLayout].get(targetPane).tabs.insert(targetTab, {
        id: originalTab,
        caption: originalCaption,
        closable: 'true'
      });
      else w2ui[targetLayout].get(targetPane).tabs.add({
        id: originalTab,
        caption: originalCaption,
        closable: 'true'
      });
      refreshTabs();
      //w2ui[originalLayout].get(originalPane).tabs.click(originalTab);
      w2ui[targetLayout].get(targetPane).tabs.click(originalTab);
    });
  }
}
refreshTabs();

function tabClick(obj, event) {
  console.log(obj);
  obj.owner.content('main', 'event' + event.target);
}

function tabClose(obj, event) {
  console.log(obj);
  console.log(event);
}


var resizeTimer = setTimeout(function(){},50);

$(window).on("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function(){
    w2ui.layout.resize();
  },50);
})
