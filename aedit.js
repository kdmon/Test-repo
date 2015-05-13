$(function() {
  var pstyle = 'border: 1px solid #dfdfdf; padding: 5px;';
  $('#layout').w2layout({
    name: 'layout',
    panels: [{
      type: 'top',
      title: 'Project',
      size: 30,
      resizable: true,
      style: pstyle,
      content: ''
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
          type: 'check',
          id: 'item1',
          caption: 'Check',
          img: 'icon-page',
          checked: true
        }, {
          type: 'break',
          id: 'break0'
        }, {
          type: 'menu',
          id: 'item2',
          caption: 'Drop Down',
          img: 'icon-folder',
          items: [{
            text: 'Item 1',
            icon: 'icon-page'
          }, {
            text: 'Item 2',
            icon: 'icon-page'
          }, {
            text: 'Item 3',
            value: 'Item Three',
            icon: 'icon-page'
          }]
        }, {
          type: 'break',
          id: 'break1'
        }, {
          type: 'radio',
          id: 'item3',
          group: '1',
          caption: 'Radio 1',
          img: 'icon-page',
          hint: 'Hint for item 3',
          checked: true
        }, {
          type: 'radio',
          id: 'item4',
          group: '1',
          caption: 'Radio 2',
          img: 'icon-page',
          hint: 'Hint for item 4'
        }, {
          type: 'spacer'
        }, {
          type: 'button',
          id: 'item5',
          caption: 'Item 5',
          icon: 'w2ui-icon-check',
          hint: 'Hint for item 5'
        }],
        onClick: function(event) {
          alert (event.target);
          //this.owner.content('main', event);
        }
      },
      title: 'Editor panel'
    }]
  });
  
  
  $(".w2ui-tab").parent().attr("draggable", "true");
  
  $(".w2ui-tabs").on("dragstart", function (event) {
    //this.style.opacity = '0.1';
    event.originalEvent.dataTransfer.setData('text', event.target.id);
  });
  
  $(".w2ui-panel-tabs td").on("dragover", function (event) {
    this.style.opacity = '0.5';
    console.log("dragover");
    event.preventDefault();
  });
  
  $(".w2ui-panel-tabs td").on("drop", function (event) {
    event.preventDefault();
    var data = event.originalEvent.dataTransfer.getData("text");
    console.log("dropping " + data + " into ", event.currentTarget.id);
    $("#" + data).insertBefore($('#'+event.currentTarget.id));
  });
  
  
});