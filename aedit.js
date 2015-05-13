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
        active: 'tab1',
        tabs: [{
          id: 'tab1',
          caption: 'Tab 1',
          closable: 'true'
        }, {
          id: 'tab2',
          caption: 'Tab 2'
        }, {
          id: 'tab3',
          caption: 'Tab 3'
        }, ],
        onClose: function(event) {
          this.owner.click ('tab2');
        },
        onClick: function(event) {
          //w2ui.layout.html('main', 'Active tab: '+ event.target);
          this.owner.content('main', 'event' + event.target);
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
  
  
  $(".w2ui-tab").parent().attr("draggable", "true");
  
  $(".w2ui-tabs").on("dragstart", function (event) {
    event.originalEvent.dataTransfer.setData('text', event.target.id);
  });
  
  $(".w2ui-panel-tabs td").on("dragover", function (event) {
    event.preventDefault();
  });
  
  $(".w2ui-panel-tabs td").on("drop", function (event) {
    event.preventDefault();
    var data = event.originalEvent.dataTransfer.getData("text");
    console.log("dropping " + data + " into ", event.currentTarget.id);
    $("#" + data).insertBefore($('#'+event.currentTarget.id));
    
        for (var item in w2ui){
            if (w2ui[item].resize){
                w2ui[item].resize();
            }
        }
        
    // Update tab definitions
    // redraw all tab panels
  });
  
  