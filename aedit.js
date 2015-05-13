  var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
  $('#layout').w2layout({
    name: 'layout',
    panels: [{
      type: 'top',
      title: 'Project',
      size: 30,
      resizable: true,
      style: pstyle,
      content: '',
      tabs: {
        name: "tabcontainer1",
        active: 'taba',
        tabs: [{
          id: 'taba',
          caption: 'Tab a',
          closable: 'true'
        }, {
          id: 'tabb',
          caption: 'Tab b',
          closable: 'true'
        }, {
          id: 'tabc',
          caption: 'Tab c',
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
      type: 'left',
      size: 150,
      resizable: true,
      style: pstyle,
      title: 'file browser',
      content: 'left'
    }, {
      type: 'main',
      style: pstyle + 'border-top: 0px;',
      content: 'main',
      tabs: {
        name: "tabcontainer2",
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
        },
        {
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
        }],
        onClick: function(event) {
          //alert (event.target);
          //this.owner.content('main', event);
        }
      },
      title: 'Editor panel'
    }]
  });
  
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
  
  
  