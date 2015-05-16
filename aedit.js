var pstyle = 'border: 0px solid #dfdfdf; padding: 0px; margin: 0px;';

$('#layout').w2layout({
    name: 'layout',
    panels: [
        { type: 'top', size: 50, resizable: false, style: pstyle, content: 'top'},
        { type: 'left', size: 100, resizable: true, style: pstyle, content: 'split' },
        { type: 'main', style: pstyle, content: 'split',
          title: 'Panel <span id="layout-preview-split" class="panel-button split-panel"></span>' +
          '<span id="layout-main-close" class="panel-button close-panel"></span>',
          tabs: {
            onClose: function(event) {
              //this.owner.click ('tab2');
            },
            onClick: function(event) {
              //w2ui.layout.html('main', 'Active tab: '+ event.target);
              this.owner.content('main', 'event' + event.target);
            }
          },
          toolbar: {},
          },
        { type: 'preview', size: '50%', resizable: true, hidden:true, style: pstyle, content: 'split',
          title: 'Sub-panel <span id="layout-preview-close" class="panel-button close-panel"></span>',
          tabs: {
            name: 'tabs2',
            active: 'tab1',
            tabs: [{
              id: 'tab1',
              caption: 'tab1',
              closable: 'false'
            }, {
              id: 'tab2',
              caption: 'tab2',
              closable: 'false'
            }, {
              id: 'tab3',
              caption: 'tab3',
              closable: 'true'
            }],
            onClose: function(event) {
              this.owner.click ('tab2');
            },
            onClick: function(event) {
              //w2ui.layout.html('main', 'Active tab: '+ event.target);
              this.owner.content('preview', 'event' + event.target);
              w2ui.layout.resize();
            }
          },
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
              },{
                text: 'File history',
                icon: 'fa fa-history'
              }]
            },{
              type: 'spacer'
            },{
              type: 'button',
              id: 'hide',
              caption: '',
              icon: 'fa fa-close'
            },{
              type: 'button',
              id: 'split',
              caption: '',
              icon: 'fa fa-minus-square-o'
            }],
            onClick: function(event) {
              if(event.target == "hide") w2ui['layout'].toggle('top', window.instant);
              if(event.target == "split") w2ui['layout'].toggle('preview', window.instant);
              console.log(event);
            }}
          },
        { type: 'right', size: 100, resizable: true,style: pstyle, content: 'split' },
        { type: 'bottom', size: 50, resizable: true, style: pstyle, content: 'bottom' }
    ]
});

$().w2layout({
    name: 'leftsplit',
    panels: [
        { type: 'main', resizable: true, style: pstyle, content: 'left main' },
        { type: 'preview', resizable: true, hidden: false, style: pstyle, content: 'left subpanel' }
    ]
});

$().w2layout({
    name: 'middlesplit',
    panels: [
        { type: 'main',  resizable: true, style: pstyle, content: 'middle-main'},
        { type: 'preview', resizable: true, hidden: false, style: pstyle, content: 'middle subpanel' }
    ]
});

$().w2layout({
    name: 'rightsplit',
    panels: [
        { type: 'main', resizable: true, style: pstyle, content: 'right-main' },
        { type: 'preview', resizable: true, hidden: false, style: pstyle, content: 'right subpanel' }
    ]
});

$().w2tabs({
  name: 'maintabs',
  active: 'taba',
  tabs: [],
});

$().w2toolbar({
  name: 'texttoolbar',
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
    },{
      text: 'File history',
      icon: 'fa fa-history'
    }]
  },{
    type: 'spacer'
  },{
    type: 'button',
    id: 'hide',
    caption: '',
    icon: 'fa fa-close'
  },{
    type: 'button',
    id: 'split',
    caption: '',
    icon: 'fa fa-minus-square-o'
  }],
  onClick: function(event) {
    if(event.target == "hide") w2ui['layout'].toggle('top', window.instant);
    if(event.target == "split") w2ui['layout'].toggle('preview', window.instant);
    console.log(event);
  }
});

setTimeout(function () {
  
//1. You can use w2ui object to find your tabs - w2ui[layout_name + '_' + panel + '_tabs'].add(...)
//2. You can use panel to find your tabs - w2ui[layout_name].get(panel).tabs.add(...);
//w2ui['layout'].get('main').tabs.add(w2ui['editortabs']);
w2ui['layout'].content('left', w2ui['leftsplit']);
w2ui['layout'].content('middle', w2ui['middlesplit']);
w2ui['layout'].content('right', w2ui['rightsplit']);

  $(".panel-button").on("click", function (event) {
    console.log(event);
    var id = event.target.id.split("-");
    if (id[2] == 'split') {
      w2ui[id[0]].toggle(id[1], window.instant);
      $(this).toggleClass("expanded-panel");
    }
    else {
      w2ui[id[0]].sizeTo(id[1], 30);
    }
  });
  
},499);


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

        var origin = event.originalEvent.dataTransfer.getData("text").split("_");
        var originalCaption = $("#" + event.originalEvent.dataTransfer.getData("text")).text();
        var originalLayout = origin[1];
        var originalPane = origin[2];
        var originalTab = origin[5];

        var target = event.currentTarget.id.split("_");
        var targetLayout = target[1];
        var targetPane = target[2];
        var targetTab = target[5];
        
        w2ui[originalLayout].get(originalPane).tabs.remove(originalTab);
        w2ui[targetLayout].get(targetPane).tabs.insert(targetTab, {id: originalTab, caption: originalCaption, closable: 'true'});
        refreshTabs();
        w2ui[targetLayout].get(targetPane).tabs.click(originalTab);
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
  