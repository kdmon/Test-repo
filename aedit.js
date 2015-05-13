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
        onClose: function(event) {},
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
          this.owner.content('main', event);
        }
      },
      title: 'Editor panel'
    }]
  });
});