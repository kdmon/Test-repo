var pstyle = '';
$('#layout').w2layout({
  name: 'layout',
  panels: [
    {
    type: 'top',
    size: 50,
    toolbar: {
      items: [],
      onClick: function(event) {
        toolbarClick(this, event);
      }
    },
    resizable: false,
    style: pstyle,
    content: 'top'
  }, {
    type: 'left',
    size: '20%',
    resizable: true,
    style: pstyle,
    content: 'split'
  }, {
    type: 'main',
    style: pstyle,
    content: 'main top',
    //title: 'Panel <span id="layout-preview-split" class="panel-button split-panel"></span>' + '<span id="layout-main-close" class="panel-button close-panel"></span>',
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
    },
  }, {
    type: 'preview',
    size: '50%',
    resizable: true,
    hidden: true,
    style: pstyle,
    content: 'split bottom',
    title: 'Sub-panel <span id="layout-preview-close" class="panel-button close-panel"></span>',
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
    size: '30%',
    resizable: true,
    style: pstyle,
    content: 'split'
  }, {
    type: 'bottom',
    size: 50,
    hidden: true,
    resizable: true,
    style: pstyle,
    content: 'bottom'
  }]
});
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
w2ui['layout'].content('left', w2ui['leftsplit']);
w2ui['layout'].content('right', w2ui['rightsplit']);

function tabClick(obj, event) {
  console.log(obj);
  obj.owner.content('main', 'event' + event.target);
}

function tabClose(obj, event) {
  console.log(obj);
  console.log(event);
}


function toolbarClick(obj, event) {
  console.log(obj);
  obj.owner.content('main', 'event' + event.target);
}

var toolbars = {
  all: ['save', 'savebreak', 'undo','redo','redobreak','more','pause','url','refresh','share'],
  editor: ['save', 'undo','redo','more'],
  preview: ['pause','url','refresh','share'],
  chat: ['url','refresh','share'],
  prefs: ['url','refresh','share'],
  files: ['url','refresh','share'],
  media: ['url','refresh','share'],
  help: ['']
};

var buttons = {
  save: {
    type: 'button',
    id: 'save',
    caption: 'Save',
    icon: 'fa fa-save',
    hint: 'Save file'
  },
  savebreak:{
    type: 'break',
    id: 'savebreak'
  },
  undo: {
    type: 'button',
    id: 'undo',
    caption: 'Undo',
    icon: 'fa fa-reply',
    hint: 'Undo last edit'
  },
  redo: {
    type: 'button',
    id: 'redo',
    caption: 'Redo',
    icon: 'fa fa-share',
    hint: 'Redo last edit'
  },
  redobreak: {
    type: 'break',
    id: 'redobreak'
  },
  menu: {
    type: 'menu',
    id: 'more',
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
  }
};

function initialiseToolbar(layout, panel, toolbar) {

  for (var button in buttons) {
    var item = buttons[button];
    console.log(item);
    
    w2ui[layout].get([panel]).toolbar.add({
      id: item.id,
      type: item.type,
      caption: item.caption,
      icon: item.icon,
      hint: item.hint,
      items: item.items
    });
  }
}

initialiseToolbar ('layout','main','editor');


setTimeout(function() {
  $(".panel-button").on("click", function(event) {
    console.log(event);
    var id = event.target.id.split("-");
    if (id[2] == 'split') {
      w2ui[id[0]].toggle(id[1], window.instant);
      $(this).toggleClass("expanded-panel");
    } else {
      w2ui[id[0]].sizeTo(id[1], 30);
    }
  });
}, 50);

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



/*


$().w2toolbar({
  name: 'editortoolbar',
  items: [
  {
    type: 'button',
    id: 'save',
    caption: 'Save',
    icon: 'fa fa-save',
    hint: 'Save file'
  }, {
    type: 'break',
    id: 'break1'
  }, {
    type: 'button',
    id: 'undo',
    caption: 'Undo',
    icon: 'fa fa-reply',
    hint: 'Undo last edit'
  }, {
    type: 'button',
    id: 'redo',
    caption: 'Redo',
    icon: 'fa fa-share',
    hint: 'Redo last edit'
  }, {
    type: 'break',
    id: 'break3'
  }, {
    type: 'menu',
    id: 'more',
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
  }, {
    type: 'spacer'
  }, {
    type: 'button',
    id: 'hide',
    caption: '',
    icon: 'fa fa-close'
  }, {
    type: 'button',
    id: 'split',
    caption: '',
    icon: 'fa fa-minus-square-o'
  }],
  onClick: function(event) {
    if (event.target == "hide") w2ui['layout'].toggle('top', window.instant);
    if (event.target == "split") w2ui['layout'].toggle('preview', window.instant);
    console.log(event);
  }
});

toolbar: {
  items: [{
    type: 'button',
    id: 'save',
    caption: 'Save',
    icon: 'fa fa-save',
    hint: 'Save file'
  }, {
    type: 'break',
    id: 'break1'
  }, {
    type: 'button',
    id: 'undo',
    caption: 'Undo',
    icon: 'fa fa-reply',
    hint: 'Undo last edit'
  }, {
    type: 'button',
    id: 'redo',
    caption: 'Redo',
    icon: 'fa fa-share',
    hint: 'Redo last edit'
  }, {
    type: 'break',
    id: 'break3'
  }, {
    type: 'menu',
    id: 'more',
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
  }, {
    type: 'button',
    id: 'hide',
    caption: '',
    icon: 'fa fa-close'
  }, {
    type: 'button',
    id: 'split',
    caption: '',
    icon: 'fa fa-minus-square-o'
  }],
  onClick: function(event) {
    if (event.target == "hide") w2ui['layout'].toggle('top', window.instant);
    if (event.target == "split") w2ui['layout'].toggle('preview', window.instant);
    console.log(event);
  };
  */
  
