var pstyle = 'border: 0px solid #dfdfdf; padding: 0px; margin: 2px;';

$('#layout').w2layout({
    name: 'layout',
    panels: [
        { type: 'top', size: 50, resizable: true, style: pstyle, content: 'top',
        toolbar: {
  items: [{
    type: 'button',
    id: 'save',
    caption: 'Save',
    icon: 'fa fa-save',
    hint: 'Save file'
  },{
    type: 'break',
    id: 'break1'
  }, {
    type: 'button',
    id: 'undo',
    caption: 'Undo',
    icon: 'fa fa-reply',
    hint: 'Undo last edit'
  },{
    type: 'button',
    id: 'redo',
    caption: 'Redo',
    icon: 'fa fa-share',
    hint: 'Redo last edit'
  },{
    type: 'break',
    id: 'break3'
  }, {
    type: 'menu',
    id: 'more',
    caption: 'More',
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
    },{
      text: 'File history',
      icon: 'fa fa-history'
    }]
  },{
    type: 'spacer'
  },{
    type: 'button',
    id: 'hide',
    caption: 'Hide',
    icon: 'fa fa-close'
  },{
    type: 'button',
    id: 'split',
    caption: 'Split',
    icon: 'fa fa-minus-square-o'
  }],
  onClick: function(event) {
    if(event.target == "hide") w2ui['layout'].toggle('top', window.instant);
    console.log(event);
  }}
          
        },
        { type: 'left', size: 150, resizable: true, style: pstyle, content: 'split' },
        { type: 'main', style: pstyle, content: 'split' },
        { type: 'preview', size: '50%', resizable: true, hidden:true, style: pstyle, content: 'split' },
        { type: 'right', size: 200, resizable: true,style: pstyle, content: 'split' },
        { type: 'bottom', size: 50, resizable: true, style: pstyle, content: 'bottom' }
    ]
});

$().w2layout({
    name: 'leftsplit',
    panels: [
        { type: 'main', resizable: true, style: pstyle, content: 'main' },
        { type: 'display', resizable: true, hidden: true, style: pstyle, content: 'display' }
    ]
});

$().w2layout({
    name: 'middlesplit',
    panels: [
        { type: 'main',  resizable: true, style: pstyle, content: 'main' },
        { type: 'display', resizable: true, hidden: true, style: pstyle, content: 'display' }
    ]
});

$().w2layout({
    name: 'rightsplit',
    panels: [
        { type: 'main', resizable: true, style: pstyle, content: 'top' },
        { type: 'display', resizable: true, hidden: true, style: pstyle, content: 'bottom' }
    ]
});

w2ui['layout'].content('left', w2ui['leftsplit']);
w2ui['layout'].content('middle', w2ui['middlesplit']);
w2ui['layout'].content('right', w2ui['rightsplit']);

var emptyToolbar = {};

//w2ui['leftsplit.left_toolbar'] = ;

var editorToolbar = {
  items: [{
    type: 'button',
    id: 'save',
    caption: 'Save',
    icon: 'fa fa-save',
    hint: 'Save file'
  },{
    type: 'break',
    id: 'break1'
  }, {
    type: 'button',
    id: 'undo',
    caption: 'Undo',
    icon: 'fa fa-reply',
    hint: 'Undo last edit'
  },{
    type: 'button',
    id: 'redo',
    caption: 'Redo',
    icon: 'fa fa-share',
    hint: 'Redo last edit'
  },{
    type: 'break',
    id: 'break3'
  }, {
    type: 'menu',
    id: 'more',
    caption: 'More',
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
    },{
      text: 'File history',
      icon: 'fa fa-history'
    }]
  },{
    type: 'spacer'
  },{
    type: 'button',
    id: 'hide',
    caption: 'Hide',
    icon: 'fa fa-close'
  },{
    type: 'button',
    id: 'split',
    caption: 'Split',
    icon: 'fa fa-minus-square-o'
  }],
  onClick: function(event) {
    console.log(event);
  }
};


  function refreshTabs(disableDrag) {
    
    var targetSelector = ".w2ui-tabs";
    var tabSelector = ".w2ui-panel-tabs td";
    
    // Clear any existing bindings
    $(targetSelector).off("dragstart");
    $(tabSelector).off("dragover").off("drop");
    
    // Update all tab strips
    w2ui['layout'].refresh();
    
    // Enable dragging
    if (!disableDrag) {
      //alert ("rebinding");
      $(".w2ui-tab").parent().attr("draggable", "true");
      $(".w2ui-tabs").on("dragstart", function (event) {
        event.originalEvent.dataTransfer.setData('text', event.target.id);
      });
      $(".w2ui-panel-tabs td").on("dragover", function (event) {
        event.preventDefault();
      });
      $(".w2ui-panel-tabs td").on("drop", function (event) {
        event.preventDefault();
        console.log(event);
        var id = event.originalEvent.dataTransfer.getData("text");
        var caption = $("#" + id).text();
        var oldContainer = 'tabs';//$("#" + id).parent().attr(name);
        var newContainer = 'tabs';//$("#" + event.currentTarget.id).parent().attr(name);
        
        w2ui[oldContainer].remove(id);
        w2ui[newName].add({id: id, caption: caption});
        //$("#" + data).insertBefore($('#'+event.currentTarget.id));
        // Refresh tab widgets!
        refreshTabs();
      });
    }
  }
  
  refreshTabs();
  
  
/*
  $('#layout').w2layout({
    name: 'layout',
    panels: [{
      type: 'top',
      title: 'Project',
      size: 60,
      resizable: true,
      style: pstyle,
      content: 'Project selection etc goes here'
    }, {
      type: 'left',
      size: 150,
      resizable: true,
      style: pstyle,
      content: 'Left side bar',
      tabs: {
        active: 'taba',
        tabs: [{
          id: 'taba',
          caption: 'Files',
          closable: 'false'
        }, {
          id: 'tabb',
          caption: 'Options',
          closable: 'false'
        }, {
          id: 'tabc',
          caption: 'Custom tab',
          closable: 'true'
        }],
        onClose: function(event) {
          this.owner.click ('tab2');
        },
        onClick: function(event) {
          w2ui.layout.html('main', 'Active tab: '+ event.target);
          //this.owner.content('main', 'event' + event.target);
        }
      }
    }, {
      type: 'main',
      style: pstyle + 'border-top: 0px;',
      content: 'main',
      tabs: {
        active: 'tab1',
        tabs: [{
          id: 'tab1',
          caption: 'Tab 1',
          closable: 'true'
        }, {
          id: 'tab2',
          caption: 'Tab 2',
          closable: 'true'
        }, {
          id: 'tab3',
          caption: 'Tab 3',
          closable: 'true'
        }],
        onClose: function(event) {
          this.owner.click ('tab2');
        },
        onClick: function(event) {
          w2ui.layout.html('main', 'Active tab: '+ event.target);
          //this.owner.content('main', 'event' + event.target);
        }
      }
    }]
  });
  
  */
  