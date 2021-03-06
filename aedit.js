// Globals

var toolbars = {};
var buttons = {};
var fullscreen = false;
var octo, user, once = 0;
var tabList = {};
var draggedTabId = '';
var resizeTimer;
var editors = [];
var panelAreas = [
  'layout_leftsplit_panel_top',
  'layout_leftsplit_panel_main',
  'layout_leftsplit_panel_bottom',
  'layout_middlesplit_panel_top',
  'layout_middlesplit_panel_main',
  'layout_middlesplit_panel_bottom',
  'layout_rightsplit_panel_top',
  'layout_rightsplit_panel_main',
  'layout_rightsplit_panel_bottom'
];
var config = {};
var dirtyFileTimer = setTimeout(function (){}, 50);
var cursors = {};
var selections = {};
var cursorHash = [];
var cursorKey = 'Guest';


// Helpers

// Octokat.js recursively fetch all from github API

function timeSince(datestamp) {
  //datestamp = datestamp.replace(/[.Z]\w+/, "Z");
  var elapsed = '';
  var date = new Date(datestamp)
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    elapsed += interval + "y ";
    seconds -= 31536000 * interval;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    elapsed += interval + "m ";
    seconds -= 2592000 * interval;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    elapsed += interval + "d ";
    seconds -= 86400 * interval;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1 && elapsed.split(' ').length < 3) {
    elapsed += interval + "h ";
    seconds -= 3600 * interval;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1 && elapsed.split(' ').length < 3) {
    elapsed += interval + "m ";
  }
  return (elapsed || '< 1m ') + " ago";
}

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

function toUTF8Array(str) {
    var utf8 = [];
    for (var i=0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6), 
                      0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff)<<10)
                      | (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >>18), 
                      0x80 | ((charcode>>12) & 0x3f), 
                      0x80 | ((charcode>>6) & 0x3f), 
                      0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
}

// Binary check from https://github.com/gjtorikian/isBinaryFile/
function isBinaryFile(bytes, size) {
  var max_bytes = 512;
  if (size === 0) return false;

  var suspicious_bytes = 0;
  var total_bytes = Math.min(size, max_bytes);

  if (size >= 3 && bytes[0] == 0xEF && bytes[1] == 0xBB && bytes[2] == 0xBF) {
    // UTF-8 BOM. This isn't binary.
    return false;
  }

  for (var i = 0; i < total_bytes; i++) {
    if (bytes[i] === 0) { // NULL byte--it's binary!
      return true;
    }
    else if ((bytes[i] < 7 || bytes[i] > 14) && (bytes[i] < 32 || bytes[i] > 127)) {
      // UTF-8 detection
      if (bytes[i] > 193 && bytes[i] < 224 && i + 1 < total_bytes) {
          i++;
          if (bytes[i] > 127 && bytes[i] < 192) {
              continue;
          }
      }
      else if (bytes[i] > 223 && bytes[i] < 240 && i + 2 < total_bytes) {
          i++;
          if (bytes[i] > 127 && bytes[i] < 192 && bytes[i + 1] > 127 && bytes[i + 1] < 192) {
              i++;
              continue;
          }
      }
      suspicious_bytes++;
      // Read at least 32 bytes before making a decision
      if (i > 32 && (suspicious_bytes * 100) / total_bytes > 10) {
          return true;
      }
    }
  }

  if ((suspicious_bytes * 100) / total_bytes > 10) {
    console.log("Suspecious bytes")
    return true;
  }

  return false;
}



// Get authenticated user details
var once = 0;
function authenticate () {

  once ++;
  if (once > 2) {$("#sign-in-notice").show(); return;}

  octo = new Octokat({
    token: localStorage.token
  });
  
  user = octo.user.fetch().then(function(user) {
    config.user = user.login;
    config.avatar = user.avatarUrl;
    init();
  }).fail(checkUser);
}

function checkUser() {
  var start = window.location.search.indexOf('code=') + 5;
  var tempKey = window.location.search.substr(start,start+20);
  console.log('chkuser');
  $.ajax({
    type: "GET",
    url: "https://webappeditor.com/waecallback?code=" + tempKey
  }).done (function (result) {
    // extract token
    console.log('got token');
    var token = result.split('&');
    token = token[0].split('=');
    token = token[1];
    localStorage.token = token;
    authenticate();
  }).fail(function (result) {
    $("#sign-in-notice").show();
  });
}



function initLayout () {
  $('#layout').w2layout({
    name: 'layout',
    panels: [{
      type: 'top',
      size: 60,
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
      size: 250,
      minSize: 150,
      hidden: true,
      resizable: true,
      content: ''
    }, {
      type: 'main',
      resizable: true,
      minSize: 150,
      content: ''
    }, {
      type: 'right',
      size: 250,
      minSize: 150,
      hidden: true,
      resizable: true,
      content: ''
    }, {
      type: 'bottom',
      size: 250,
      resizable: false,
      hidden: true,
      content: ''
    }]
  });
  
  $().w2layout({
    name: 'leftsplit',
    panels: [{
      type: 'top',
      size: 250,
      minSize: 100,
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
    },{
      type: 'main',
      resizable: true,
      minSize: 150,
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
      type: 'bottom',
      size: 250,
      minSize: 150,
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
      type: 'top',
      size: 250,
      minSize: 150,
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
    },{
      type: 'main',
      minSize: 150,
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
      type: 'bottom',
      size: 250,
      minSize: 150,
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
      type: 'top',
      size: 250,
      minSize: 150,
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
    },{
      type: 'main',
      minSize: 150,
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
      type: 'bottom',
      size: 250,
      minSize: 150,
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
  
  w2ui.layout.content('left', w2ui.leftsplit);
  w2ui.layout.content('main', w2ui.middlesplit);
  w2ui.layout.content('right', w2ui.rightsplit);
}


function initButtons () {
    
  toolbars = {
    topmenu: ['logo', 'topspacer','signin'],
    editor: ['usermenu','filemenu', 'editmenu', 'tools'],
    preview: ['pause', 'previewurl', 'refreshPreview', 'share'],
    collaboration: ['pause'],
    filebrowser: ['newfile','uploadfile','refreshFiles','sidebarsearch'],
    media: ['url', 'refresh', 'share'],
    empty: [],
    help: []
  };
  buttons = {
    logo : {
      type: 'html',
      id: 'logo',
      html: '<h1 class="wae-logo" title="Edit Web Applications">'
      + '<span class="fa fa-2x fa-mobile logo"></span>'
      + '<span class="fa fa-pencil logo" style="top: -7px; left: -7px"></span>'
      + '<span class="wae-version">v.0.3-alpha</span>'
      + '<strong>WebAppEditor</strong>.com</h1>'
    },
    topspacer: {
      id: 'topspacer',
      type: 'spacer'
    },
    collaborate : {
      id: 'collaborate',
      type: 'button',
      caption: 'Collab',
      icon: 'fa fa-comments-o',
      hint: 'Edit with friends through real-time text, audio and video chat.'
    },
    signin : {
      id: 'signin',
      type: 'button',
      caption: 'Sign-in with Github',
      icon: 'fa fa-github',
      hint: 'Sign in to access your projects.'
    },
    account: {
      type: 'menu',
      id: 'account',
      caption: 'Account',
      title: 'Manage your account',
      items: [{
        text: 'Collaborate',
        icon: 'fa fa-comments-o'
      },{
        text: "Don't disturb",
        icon: 'fa fa-bell-slash-o'
      },{
        text: 'Preferences',
        icon: 'fa fa-wrench'
      }, {
      },{
        text: 'Sign out',
        icon: 'fa fa-power-off'
      }]
    },  topbreak1 :{
      id: 'topbreak1',
      type: 'break'
    },
    connection : {
      id: 'connection',
      type: 'html',
      html: '<div style="opacity: 0.8; background:">' +
      '<span class="fa fa-circle" style="color: #0b0 !important;"></span> Online </div>'
    },
    topbreak2 :{
      id: 'topbreak2',
      type: 'break'
    },
    fullscreen : {
      id: 'fullscreen',
      type: 'html',
      html: '<i class="fa fa-arrows-alt" title="Fullscreen" onclick="toggleFullscreen()" ' +
      'style="cursor: pointer; padding: 1px 10px 1px 10px; border: 1px solid #aaa;"></span></div>'
    },
    /*
    fullscreen : {
      id: 'fullscreen',
      type: 'html',
      html: '<div style="opacity: 0.8; background:">' +
      '<img id="fullscreenbutton" title="Toggle fullscreen" onclick="toggleFullscreen()" ' +
      'style="padding: 5px; width: 32px; opacity: 0.8;" ' + 
      'src="http://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Octicons-screen-full.svg/210px-Octicons-screen-full.svg.png"/></div>'
    }, */
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
    usermenu: {
      id: 'usermenu',
      type: 'menu',
      disabled: true,
      caption: '1',
      icon: 'fa fa-users',
      arrow: false,
      items: [{
        text: 'kdmon',
        icon: 'fa fa-user'
      },{
      },{text: 'Add collaborator',
        icon: 'fa fa-user-plus'
      }]
    },
    filemenu: {
      id: 'filemenu',
      type: 'menu',
      caption: 'File',
      icon: '',
      arrow: false,
      items: [{
        text: 'New file',
        icon: 'fa fa-file-o'
      },{
        text: 'Save file',
        icon: 'fa fa-save'
      },{
        text: 'Revert to last save',
        icon: 'fa fa-history',
      },{
        text: 'View changelog',
        icon: 'fa fa-bars'
      },{
        text: 'Close file',
        icon: 'fa fa-times-circle'
      }]
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
        text: 'Fix indentation',
        icon: 'fa fa-magic'
      },{
      },{
        text: 'Open preview',
        icon: 'fa fa-tablet'
      },{
        text: 'Share preview',
        icon: 'fa fa-share-alt'
      }]
    },
    pause: {
      id: 'pause',
      type: 'button',
      caption: '',
      icon: 'fa fa-pause',
      hint: 'Pause'
    },
    newfile: {
      id: 'newfile',
      type: 'button',
      caption: '',
      icon: 'fa fa-file-o',
      hint: 'New file'
    },
    uploadfile: {
      id: 'uploadfile',
      type: 'button',
      caption: '',
      icon: 'fa fa-cloud-upload',
      hint: 'Upload file'
    },
    refreshFiles: {
      id: 'refreshFiles',
      type: 'button',
      caption: '',
      icon: 'fa fa-refresh',
      hint: 'Reload files'
    },
    sidebarsearch: {
      type: 'html',
      id: 'sidebarsearch',
      html: '<input size="8" onkeyup="filter(this)" '+
      'class="toolbar-input" placeholder="&#xF002; Filter"/>'
    },
    previewurl: {
      type: 'html',
      id: 'previewurl',
      html: '<div style="padding: 3px 10px;">Input: <input size="10" style="' +
      'padding: 3px; border-radius: 2px; border: 1px solid silver"/></div>'
    },
    spacer: {
      id: 'spacer',
      type: 'spacer'
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
    refreshPreview: {
      id: 'refreshPreview',
      type: 'button',
      caption: '',
      icon: 'fa fa-refresh',
      hint: 'Reload preview'
    },
    share: {
      id: 'share',
      type: 'button',
      caption: '',
      icon: 'fa fa-external-link',
      hint: 'Open preview externally'
    }
  };
    
  initToolbar('layout', 'top', 'topmenu');
  initToolbar('leftsplit', 'top', 'empty');
  initToolbar('leftsplit', 'main', 'empty');
  initToolbar('leftsplit', 'bottom', 'empty');
  initToolbar('middlesplit', 'top', 'empty');
  initToolbar('middlesplit', 'main', 'empty');
  initToolbar('middlesplit', 'bottom', 'empty');
  initToolbar('rightsplit', 'top', 'empty');
  initToolbar('rightsplit', 'main', 'empty');
  initToolbar('rightsplit', 'bottom', 'empty');
  
  
  w2ui["layout"].get(["top"]).toolbar.hide('signin');
  w2ui["layout"].get(["top"]).toolbar.show('account');
  w2ui["layout"].get(["top"]).toolbar.show('topbreak1');
  w2ui["layout"].get(["top"]).toolbar.show('connection');
  w2ui["layout"].get(["top"]).toolbar.show('topbreak2');
  w2ui["layout"].get(["top"]).toolbar.show('fullscreen');
  w2ui["layout"].get(["top"]).toolbar.set('account', {
    text: config.user,
    img: '"><img class="account-icon" src="' + config.avatar +'"/> <i id="'
  });
    
}



function toggleFullscreen () {
  
  // todo : listen to full screen exit event and update toggle setting
  
  if (fullscreen) {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    
    $("#fullscreenbutton").css({"opacity": 0.8});
    fullscreen = false;
    
  }

  else {
    
    var element = document.body;
   
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }

    $("#fullscreenbutton").css({"opacity": 0.4});
    fullscreen = true;
  }
}

function filter (elem) {
  var targetPanel = $(elem)
  .parent().parent().parent()
  .parent().parent().parent()
  .parent().parent().parent()
  .parent().parent().attr('id');
  console.log(targetPanel);
}

function toolbarClick(obj, event) {
  console.log(obj,event);
  var id = obj.name.split("_");
  var elem = 'layout_'+id[0]+'_panel_'+id[1];
  var panel = pickPanel(elem);
  var tab = (w2ui[id[0]+'_'+id[1]+'_tabs'] !== undefined) ?
    w2ui[id[0]+'_'+id[1]+'_tabs'].active : '';
  switch (event.target) {
    case 'signin':
      window.location.href="https://github.com/login/oauth/authorize?client_id=3420cd58602c446289f9&scope=user,repo";
    break;
    case 'editmenu:Search':
      editors[panel.area].execCommand("find");
    break;
    case 'editmenu:Replace':
      editors[panel.area].execCommand("replace");
    break;
    case 'editmenu:Go to line':
      editors[panel.area].execCommand("gotoline");
    break;
    case 'tools:Open preview':
      openPreview(tab);
    break;
    case 'filemenu:Save file':
      var content = editors[tabList[tab].panel].getSession().getValue();
      var path =  tabList[tab].path;
      var username = tabList[tab].id.split('/')[0];
      // Bugfix: Preserve repos with dots in name!
      var reponame = actualRepoName; //tabList[tab].id.split('_')[2];
      var branch = tabList[tab].id.split('/')[2];
      var message = prompt("Please describe your changes to the file", "Update file.");
      writeFile (username, reponame, branch, [{path: path, content: content}], message);
    break;
    case 'account:Collaborate':
      collaborate();
    break;
    case 'share':
      window.open(tabList[tab].fullUrl, "_blank");
    break;
    case 'account:Sign out':
      var token = localStorage.token;
      localStorage.removeItem('token');
      window.location = 'waelogout?token=' + token;
    break;
    case 'refreshFiles':
      var parts = tabList[tab].id.split('_');
      var user = parts[1];
      // Bugfix: Preserve repos with dots in name!
      var repo = actualRepoName; //tabList[tab].id.split('_')[2];
      var branch = parts[3];
      var elem = tabList[tab].id;
      refreshProject(user,repo,branch, elem);
      console.log ('refreshing', tabList[tab]);
    break;
    case 'refreshPreview':
      $("#" + tabList[tab].id).attr("src", tabList[tab].fullUrl);
    break;
    case 'newfile':
      var username = tabList[tab].id.split('_')[1];
      // Bugfix: Preserve repos with dots in name!
      var reponame = actualRepoName; //tabList[tab].id.split('_')[2];
      var branch = tabList[tab].id.split('_')[3];
      var filename = prompt ("Please enter new file name and path");
      if (filename === null) return;
      writeFile (username, reponame, branch, [{path: filename, content: ''}]);
      
    break;
    case 'uploadfile':
      var username = tabList[tab].id.split('_')[1];
      // Bugfix: Preserve repos with dots in name!
      var reponame = actualRepoName; //tabList[tab].id.split('_')[2];
      var branch = tabList[tab].id.split('_')[3];
      //var filename = prompt ("Please enter new file name and path");
      var html = '<h3>Select a file for upload</h3><p>' +
      '<input id="fileBox" type="file" onchange="console.log(this)"/></p>' + 
      '<p>File path where you want to store the file (root path is used if empty)</p>' +
      '<input id="uploadpath" type="text">' + '<p>Commit message (optional)</p>' +
      '<textarea id="uploadmsg" cols=30 rows=3>Uploaded file.</textarea><br>' +
      '<button onclick="upload(' + "'" + username + "', '" + reponame + "', '" + branch + "'" + ')">Upload</button>';
      w2popup.open ({
        title: 'Upload file',
        body: html
      });
    break;
    default:
    //obj.owner.content('main', 'event' + event.target);
    break;
  }
}


// Helper for multiple promise handling

if (jQuery.when.all===undefined) {
  jQuery.when.all = function(deferreds) {
    var deferred = new jQuery.Deferred();
    $.when.apply(jQuery, deferreds).then(
      function() {
        deferred.resolve(Array.prototype.slice.call(arguments));
      },
      function() {
        deferred.fail(Array.prototype.slice.call(arguments));
      });
    return deferred;
  };
}

function collaborate () {
  
  var room = "54321-a-chat-room-for-collaborating-12345";
  
  setupWebrtc (room, 'video');
  
  var id = "collaboration-window-" +  Math.round(Math.random() * 10000000);
  
  var title = '<i class="fa fa-comment-o"></i> Collaboration';

  var location = pickPanel('preview');

  // 3. Show tab
  
  tabList[id] = {
    id: id,
    caption: title,
    type: 'preview',
    panel: location.area
  };
  
  w2ui[location.layout].get(location.panel).tabs.add({
    id: id,
    closable: true,
    caption: title
  });
  
  // 4. render into temporary dom element once
  
  $('<div id="' + id +'" class="preview-iframe" style="position:absolute;overflow:auto;"></div>').prependTo("body");
  
  var htmlBlock = '<div id="remoteVideos"><video id="localVideo"></video></div>';
  htmlBlock += '<div id="largeVideoContainer"><div id="innerVideoContainer"><i id="hidelargevideo" class="fa fa-2x fa-times"></i><video id="largeVideo"></video></div></div>';

    htmlBlock += '<div id="chathistory" style="overflow: auto; background: white"></div>';
  
  htmlBlock += '<div>';
    htmlBlock += '<textarea rows="2" style="height:50px; width:70%" id="chatbox"></textarea>';
    htmlBlock += '<button style="height:54px; width: 18%; margin-left:4px; vertical-align:top;" onclick="say()">Say</button>';
  htmlBlock += '</div>';
  
  $("#"+id).append(htmlBlock);
  w2ui.layout.show('right', true);
  w2ui[location.layout].get(location.panel).tabs.click(id);
  $(location.id).find(".w2ui-tabs").scrollLeft(99999);
  refreshTabs();
  
  startChat();

}

// HELPER FX TO CONVERT TO URLs to A HREF TARGET _BLANK

if(!String.linkify) {
  String.prototype.linkify = function() {

    // http://, https://, ftp://
    var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

    // www. sans http:// or https://
    var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    return this
      .replace(urlPattern, '<a target="_blank" href="$&">$&</a>')
      .replace(pseudoUrlPattern, '$1<a target="_blank" href="http://$2">$2</a>');
  };
}

function say() {
  var msg = $('#chatbox').val().trim().linkify();
  setTimeout(function() {$('#chatbox').val('').focus();}, 50);
  if (msg == '') return;
  var d = new Date();
  chatroom.shout({
    action: "say",
    timestamp: d.toISOString(),
    user: config.user,
    msg: msg
  });
  var stamp = d.toLocaleTimeString();
  $("#chathistory").append('<div>' + stamp + ': <b>' + msg + '</b></div>').scrollTop(999999);
}


var chatroom;
//var notification = new Audio("http://freesound.org/data/previews/234/234524_4019029-lq.mp3")
var notification = new Audio("notification_loud.mp3")

function startChat() {
  var room = "a-single-global-chatroom-12345-54321";
  connection.open(room, 'text', function(error, doc) {
    chatroom = doc;
    chatroom.on('shout', function(data) {
      notification.pause();
      notification.currentTime = 0;
      notification.play();
      switch (data.action) {
        case "announce":
          var d = new Date(data.timestamp);
          var stamp = d.toLocaleTimeString();
          $("#chathistory").append('<div> ' + stamp + ' *** ' + data.msg + ' ***</div>').scrollTop(999999);
          break;
        case "say":
          var d = new Date(data.timestamp);
          data.msg = data.msg;
          var stamp = d.toLocaleTimeString();
          $("#chathistory").append('<div> ' + stamp + ' <em>' + data.user + '</em>: ' + data.msg + '</div>').scrollTop(999999);
          break;
      }
    });
    var d = new Date();
    chatroom.shout({
      action: "announce",
      timestamp: d.toISOString(),
      msg: (config.user || 'A guest') + " joined the room."
    });
  });
  $('#chatbox').keypress(function( event ) {
    if ( event.which == 13 ) {
      say();
    }
  });
}

var webrtc;
var mediaEnabled = {};

function setupWebrtc (room, media) {

  if (webrtc) {
    webrtc.stopLocalVideo();
    webrtc.leaveRoom();
    webrtc.connection.disconnect();
    mediaEnabled.leftRoom = true;
    mediaEnabled.webrtc = false;
  }

  webrtc = false;

  if (media == "audio") {
    webrtc = new SimpleWebRTC({
      //url: "https://webappeditor.com:8888",
      socketio: {'force new connection': true},
      localVideoEl: 'localVideo',
      remoteVideosEl: 'remoteVideos',
      
      autoRequestMedia: true,
      media: {
          video: false,
          audio: true
      }
    });

    mediaEnabled.audio = "unmuted";
    mediaEnabled.video = false;
  }
  
  else {
    $("#localVideo").show();
    webrtc = new SimpleWebRTC({
      //url: "https://webappeditor.com:8888",
      socketio: {'force new connection': true},
      localVideoEl: 'localVideo',
      remoteVideosEl: 'remoteVideos',
      
      autoRequestMedia: true,
      media: {
        video: {
          mandatory: {
            maxFrameRate: 15,
            maxWidth: 320,
            maxHeight: 240
          }
        },
        audio: true
      }
    });
    
    mediaEnabled.audio = "unmuted";
    mediaEnabled.video = "live";
  }
  
  webrtc.on('readyToCall', function() {
    webrtc.joinRoom(room);
    mediaEnabled.webrtc = true;
    setTimeout(function () {
      $("#largeVideo").show().attr({
        "src": $("#localVideo").attr("src"),
        "autoplay": "autoplay"
      });

      // New video copying ...
      $("#largeVideo")[0].srcObject = $("#localVideo")[0].srcObject;
      $("#largeVideo")[0].muted = true;

      $("#innerVideoContainer").on('click', function() {
        $("#largeVideoContainer").hide();
        $("#chathistory").css("height","60%");
      });
      
      $("#innerVideoContainer").on('mouseover', function() {
        $("#hidelargevideo").show();
      });
      
      $("#innerVideoContainer").on('mouseout', function() {
        $("#hidelargevideo").hide();
      });     
      $("#remoteVideos").on('click', function (e) {
 
        $("#chathistory").css("height","25%");
        $("#largeVideoContainer").show();
        $("#largeVideo").show().attr({
          "src": $(e.target).attr("src"),
          "autoplay": "autoplay"
        });
        
        // New video copying ...
        $("#largeVideo")[0].srcObject = $(e.target)[0].srcObject;
        $("#largeVideo")[0].muted = true;
      });
    }, 2000);
    
    //$("#mediacontainer").show();
    //$("#mediabuttonstop").show();
    //$("#mediabuttonleave").hide();
  });

}

function removeFile (username, reponame, branch, path, sha, message) {
  console.log(username, reponame, branch, path, sha, message);
  if (path.indexOf('/') === 0) path = path.substring(1, path.length);
  var repo = octo.repos(username,reponame);
  repo.contents(path).remove({
    sha: sha,
    branch: branch || 'master',
    message: message||'Deleted ' + path
  }).then(function () {
    alert ("Removed file");
  });
}

function moveFile (username, reponame, branch, oldPath, newPath, message) {
  
  // Username, repo and the files array with one or more changes are required
  if (username == null || reponame == null || oldPath == null || newPath == null) 
    return (false);
  if (message == null) message = "Moved " + oldPath + " to " + newPath;
  if (branch == null) branch = 'master';

  // Head points to a commit which points to a tree, which points to files (blobs)
  // 1. Get the SHA reference of the latest commit in the branch.
  
  var repo = octo.repos(username, reponame);
  repo.git.refs('heads/' + branch).fetch().then(function(reference) {
    var ref = reference.object.sha;
    
    // 2. Get the branch tree
    repo.git.trees(ref).fetch({'recursive':true}).then(function(result){
      var oldTree = result.sha;
      var newTree = result.tree;

      // 3. Make necessary changes to the tree
      // c.f. https://github.com/philschatz/octokit.js/issues/78
      
      for (var i = 0; i < newTree.length; i++) {
        // Change exact matches only
        if (newTree[i].path === oldPath) {
          newTree[i].path = newTree[i].path.replace(oldPath, newPath);
        }
        
        // Remove all folders (type: tree) to reset any references to old blobs.
        // Git will recreate folders in a later step.
        
        if (newTree[i].type === 'tree') {
          newTree.splice(i,1);
          i --; // Decrement for-loop counter to reflect the reduced array size.
        }
      }
      
      // 4. Create the new tree.
      // Important: Do not pass in base_tree property, otherwise changes will
      // be applied on top, causing files to be duplicated!
      
      repo.git.trees.create({tree: newTree})
      .then(function(actualTree){
        // 5. Create a new commit using the new tree
        repo.git.commits.create({
          message: message,
          tree: actualTree.sha, 
          parents: [oldTree]
        }).then(function(commitObj){
          // 6. Update head to latest commit
          repo.git.refs('heads/' + branch).update({
            ref:"heads/" + branch,
            sha: commitObj.sha
          });
          alert ("Moved file");
        });
      });
    });
  });
}

function moveFolder (username, reponame, branch, oldPath, newPath, message) {
  
  // Username, repo and the files array with one or more changes are required
  if (username == null || reponame == null || oldPath == null || newPath == null) 
    return (false);
  if (message == null) message = "Moved " + oldPath + " to " + newPath;
  if (branch == null) branch = 'master';

  // 1. Get the SHA reference of the branch tree.
  
  var repo = octo.repos(username, reponame);
  repo.git.refs('heads/' + branch).fetch().then(function(result) {
    console.log(result);
    var ref = result.object.sha;
    
    // 2. Get the branch tree
    
    repo.git.trees(ref).fetch({'recursive':true}).then(function(result){
      var oldTree = result.sha;
      var newTree = result.tree;

      // 3. Make necessary changes to the tree
      // c.f. https://github.com/philschatz/octokit.js/issues/78
      
      for (var i = 0; i < newTree.length; i++) {
        if (newTree[i].path.indexOf(oldPath + "/") === 0) {
          console.log("matching", newTree[i], oldPath);
          newTree[i].path = newTree[i].path.replace(oldPath, newPath);
        }
      
        // Remove any folders (type: tree). Git will recreate folders on commit.
        if (newTree[i].type === 'tree') {
          console.log("matching folder no: ", i);
          newTree.splice(i,1);
          i --; // Decrement for-loop counter to reflect the reduced array size.
        }
      }
      
      // 4. Create the new tree
      // Do not set base_tree to prevent duplication of folders
      
      repo.git.trees.create({tree: newTree})
      .then(function(newTree){
        
        // 5. Create a new commit using the new tree
        repo.git.commits.create({
          message: message,
          tree: newTree.sha, 
          parents: [oldTree]
        }).then(function(commitObj){
          // 6. Update head to latest commit
          repo.git.refs('heads/' + branch).update({
            ref:"heads/" + branch,
            sha: commitObj.sha
          });
          alert ("Moved folder");
        });
      });
    });
  });
}

function removeFolder (username, reponame, branch, folder, message) {
  
  // Username, repo and the files array with one or more changes are required
  if (username == null || reponame == null || folder == null) 
    return (false);
  if (message == null) message = "Removed folder " + folder;
  if (branch == null) branch = 'master';

  // 1. Get the SHA reference of the branch tree.
  
  var repo = octo.repos(username, reponame);
  repo.git.refs('heads/' + branch).fetch().then(function(reference) {
    var ref = reference.object.sha;
    
    // 2. Get the branch tree
    
    repo.git.trees(ref).fetch({'recursive':true}).then(function(result){
      var oldTree = result.sha;
      var newTree = result.tree;

      // 3. Make the necessary changes to the tree
      
      for (var i = 0; i < newTree.length; i++) {

        // Remove any files within the same path and all folders.
        // Git will recreate necessary folders on commit.

        if (newTree[i].path === folder || newTree[i].path.indexOf(folder + "/") === 0 || newTree[i].type === 'tree') {
          newTree.splice(i,1);
          i --; // Decrement for-loop counter to reflect the reduced array size.
        }
      
      }
      
      // 4. Create the new tree
      // Do not set base_tree to ensure files are actually removed
      
      repo.git.trees.create({tree: newTree})
      .then(function(actualTree){
        
        // 5. Create a new commit using the new tree
        repo.git.commits.create({
          message: message,
          tree: actualTree.sha, 
          parents: [oldTree]
        }).then(function(commitObj){
          // 6. Update head to latest commit
          repo.git.refs('heads/' + branch).update({
            ref:"heads/" + branch,
            sha: commitObj.sha
          });
          alert ("removed folder");
        });
      });
    });
  });
}


function writeFile (username, reponame, branch, files, message, parentCommitShas) {

  // Username, repo and the files array with one or more changes are required
  if (files == null || username == null || reponame == null) return (false);
  if (message == null) message = "Modified file(s)";
  if (parentCommitShas == null) parentCommitShas = null;
  if (branch == null) branch = 'master';
  
  var repo = octo.repos(username, reponame);
  var oldTree = parentCommitShas;
  
    // 1. Get the original git tree, storing the promise.
  repo.git.refs('heads/' + branch).fetch().then(function(latestTree) {
    
    // 2. Asynchronously create blobs for each file and store the promises
    // which returns SHAs for blobs that are used to construct the new git tree.

    if (oldTree == null) oldTree = latestTree.object.sha;
    var blobs = [];
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      (function(){
        var that = file;
        console.log(that.path + " " + (that.binary ? 'base64' : 'utf-8'));
        blobs[i] = repo.git.blobs.create({
          // Nov-2016:  problems with utf-8 encoding - so re-enabling check
          // encoding: 'base64', //that.binary ? 'base64' : 'utf-8',
          encoding: that.binary ? 'base64' : 'utf-8',
          content: that.binary ? btoa(that.content) : that.content
        }).then(function (blob){
          return ({
            path: that.path,
            mode: '100644',
            type: 'blob',
            sha: blob.sha
          });
        });
      })(file);
    }
      
    // 3. Generate a new tree which includes the sha's of the created blobs
    $.when.all(blobs).done(function (blobTree) {
      
      repo.git.trees.create({tree: blobTree, base_tree: oldTree})
      .then(function(newTree){
        
    // 4. Create a new commit using the resulting tree
        repo.git.commits.create({
          message: message,
          tree: newTree.sha, 
          parents: [oldTree]
        }).then(function(commitObj){
    // 5. Update head to latest commit
          repo.git.refs('heads/' + branch).update({
            ref:"heads/" + branch,
            sha: commitObj.sha
          }).then(function(){alert ("Written file(s)")});
        });
      });
    });
  });
}


function upload(username, reponame, branch) {
  
  var file = document.getElementById('fileBox').files[0]; //Files[0] = 1st file
  var reader = new FileReader();
  reader.onload = function(evt) {
    var fileData = evt.target.result;
    var bytes = new Uint8Array(fileData);
    var binaryText = '';

    for (var index = 0; index < bytes.byteLength; index++) {
      binaryText += String.fromCharCode( bytes[index] );
    }

    var content = binaryText;
    var message = document.getElementById("uploadmsg").value;
    var path = document.getElementById("uploadpath").value;
    var filename = path + file.name;
    //console.log(username, reponame, branch, filename, content, message);
    
    files = [
      {path: filename, content: content, binary: true}
    ];
  
    writeFile (username, reponame, branch, files, message);
    
  };
  
  reader.readAsArrayBuffer(file);
  
}

function randomString(length) {
  length = length ? length : 5;
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function openPreview (url, caption, panel) {
  var location = pickPanel (panel || 'preview');
  var file = url.split('/');
  var title = caption || (file.length > 0) ? file[file.length-1] : file;
  var previewId = "preview_" + url.hashCode();
  // strip leading slash in pathname
  url = (url.substr(0,1) === "/") ? url.substr(1, url.length) : url;
  var fullUrl = (url.substr(4) === 'http') ? url : 'https://webappeditor.com/' + url;
  if (url.substr(url.length-3).toLowerCase() == '.md')
    fullUrl = 'https://webappeditor.com/markdown.html?r=' + randomString(100) +
    "&url=" + fullUrl;
  if (url.substr(url.length-4).toLowerCase() == '.tex')
    fullUrl = 'https://webappeditor.com/kdmon/texlive.js/master/tex.html?r=' +
    randomString(100) + "&url=" + fullUrl;
  tabList[previewId] = {
    id: previewId,
    fullUrl: fullUrl,
    caption: '<i class="fa fa-eye"></i> ' + title,
    panel: location.area,
    type: 'preview'
  };
  
  w2ui[location.layout].get(location.panel).tabs.add({
    id: previewId,
    closable: true,
    caption: '<i class="fa fa-eye"></i> ' + title
  });
      
  refreshTabs();
  // 4. render into temporary dom element once
  $('<iframe id="' + previewId +'" class="preview-iframe"></iframe>')
    .prependTo("body")
    .attr("src", fullUrl)
    .on('load', function () {
      console.log('iframe loaded');
      var iframe = document.getElementById(previewId);
      iframe.contentWindow.onerror = function(message, xurl, lineno) {
        alert ("JS error: " + message + ", on line " + lineno);
      };
    });

  w2ui.layout.show('right', true);
  w2ui[location.layout].get(location.panel).tabs.click(previewId);
  // Does not work
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

function initToolbar(layout, panel, toolbar) {
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


/* SETUP TABS */

function refreshTabs() {
  
  
  for (var i = 0; i < editors.length; i++) {
    
    /* SLOW CODE! - ONLY RUN WHEN NEEDED! */
  
    // Hide inactive tab areas
    var location = panelAreas[i].split("_");
    if (w2ui[location[1]].get(location[3]).tabs.tabs.length === 0) {
      console.log("expensive fx");
      $("#editor" + i).hide();
      $("#container"+ i + " .jstree").hide();
      $("#content" + i).html('<div class="inactive-panel">' +
      '<p><b>This subpanel is empty.</b></p>' +
      '<ul><li>To use it, drag a tab over.</li>' +
      
      '</ul></div>');
      if (location[1] === 'middlesplit' && location[3] === 'main')
      $("#content" + i).html('<div class="inactive-panel"></div>');
      $("#content" + i).show();
      switchToolbar(location[1], location[3], 'empty');
    }
  }
  
  // Reset draggable events
  var tabSelector = ".w2ui-panel-tabs td:not(:last-child), .w2ui-node";
  var tabContainer = ".w2ui-panel-tabs td:last-child, .w2ui-sidebar-div";
  var tabArea = "#temporarytab";
  $(tabContainer).removeClass('drop-highlight');
  $(tabSelector).off("dragstart").off("dragenter").off("dragleave").off("drag").off("dragend").off("drop").off("close");
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
  $(tabSelector).on("close", function(event) {
    console.log(event);
    event.preventDefault();
  });
  // remove existing events on tabcontainer
  $(tabContainer).off("dragstart").off("dragenter").off("dragleave").off("drag").off("dragend").off("drop").off("close");
  // Allow dropping by preventing default event!
  $(tabContainer).on("dragover", function(event) {
    event.preventDefault();
  });
  $(tabContainer).on("drop", function(event) {
    event.preventDefault();
    var originalId = draggedTabId; //event.originalEvent.dataTransfer.getData("text");
    handleDrop (originalId, this);
  });
  /*
  w2ui[location.layout].get(location.panel).tabs.on('close', function(event) {
    console.log(event);
    return;
    
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
  originalCaption = $(originalCaption).children().last().html();
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
    closable: true
  });
  // Insert after
  else if (targetTab) w2ui[targetLayout].get(targetPanel).tabs.insert(nextTab, {
    id: originalTab,
    caption: originalCaption,
    closable: true
  });
  // Empty tab bar
  else w2ui[targetLayout].get(targetPanel).tabs.add({
    id: originalTab,
    caption: originalCaption,
    closable: true
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
  w2ui.layout.resize();
  updateLayout();
}

function tabClick(obj, event) {
  var elem;
  var item = tabList[event.target];
  var location = pickPanel(item.panel);
  
  // Don't re-render active preview iframes unless they are being moved!
  // Consider simplifying by adding dirty flag to item.
/*  var moved = true;
  if (item.type == 'preview') {
    var parentId = '#' + $("#container_"+item.id).parent().parent().parent().attr('id');
    moved = (parentId !== location.id || w2ui[location.layout].get(location.panel).tabs.active !== item.id) ? true : false;
  }
  if (!moved) return;
  */
  
  $("#editor" + item.panel).hide();
  $("#content" + item.panel).hide();
  $("#container" + item.panel + " .jstree").hide();
  
  // hide preview iframes in current panel
  for (var index in tabList) {
    var tabItem = tabList[index];
    if (tabItem.type === 'preview' && tabItem.panel === item.panel) {
      tabList[tabItem.id].visible = false;
    }
  }
  
  // $("#container" + item.panel + " .preview-area").hide();
  //$("#" + item.id).hide();
  
  switch (item.type) {
    case 'editor':
      switchToolbar(location.layout, location.panel, 'editor');
      editors[item.panel].setSession(item.editSession);
      editors[item.panel].focus();
      $("#editor" + item.panel).show();
      break;
    case 'preview':
      // show
      tabList[item.id].visible = true;
      switchToolbar(location.layout, location.panel, 'preview');
      break;
    case 'preview-collaborate':
      tabList[item.id].visible = true;
      switchToolbar(location.layout, location.panel, 'collaborate');
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
  
  console.log (obj);
  console.log (event);
  updateLayout();
  // w2ui destroy
  // ace detach etc...
}

function updateLayout(force,resizeEvent) {
  
  /* There are two main operations going on here:
  
    1. keep the w2ui layout (panels) updated.
    2. keep widgets unrelated to layout (ace editor, sidebar, iframes) updated.
    
    W2ui library probably handles majority of cases for 1, but not for 2.
    
    Redrawing is expensive, particularly when dealing with nested panels,
    and therefore needs to be optimised for a smooth UI. It should be triggered
    as rarely as possible but still provide smoothness (max 100ms delay).
    
    Interactions triggering redrawing are:
    
    1. Toggling panels (w2ui handles panels, but not widgets, need to trigger
       widget redraws manually after w2ui redraw finishes).
    2. Resizing window (w2ui again handles this for panels, but not widgets).
    3. Resizing panels (modified w2ui code, aedit-panel.js, handles this).
    4. Tab interactions (clicks, drags, closes)
    5. Programmatic refreshs (should be kept at minimum).
    
    It can be difficult to know which widgets are affected by every
    interaction. An easy way is to redraw all widgets after w2ui
    resize oncomplete event is received, but could be slow if many widget.
    
    Another option is to use an array of widgets that need to be redrawn
    and periodically poll/pop the list (e.g. at 60fps).
    
  */
  
  window.requestAnimationFrame(function() {calcLayout(force, resizeEvent)});
}

var fps = 0;
function calcLayout (force,resizeEvent) {
  // refresh layout every n frames or x ms after last cursor move
  // Firefox is good at about fps 10, timer 50.
  // Chrome can handle faster updates: fps 5, timer 10
  fps ++;
  if (fps < 5 && force === undefined) {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){calcLayout(true)}, 10);
    return;
  }
  if (force === undefined) fps = 0;
  
  console.log("calc layout fx");
/*
  if (editorOnly === undefined) {
    //w2ui.layout.resize();
  }
*/

//w2ui.layout.resize(); //SLOW
//return;
// optimise!!
// code below is only for tab/panel/iframe management - should run rarely!
  for (var i = 0; i < editors.length; i++) {
    editors[i].resize();
    
  }
  // update absolute position, size and visibility of preview iframes
  for (var index in tabList) {
    var item = tabList[index];
    if (item.type === 'preview') {
      var top = $("#container" + item.panel).offset().top;
      var left = $("#container" + item.panel).offset().left;
      var height = $("#container" + item.panel).innerHeight();
      var width = $("#container" + item.panel).innerWidth();
      $("#" + item.id).css({
        top: top + 'px',
        left: left + 'px',
        width: width + 'px',
        height: height + 'px'
      });
      if (item.visible && (top !== 0 && left !== 0)) $("#" + item.id).show();
      else $("#" + item.id).hide();
    }
  }
  if (!resizeEvent) w2ui.layout.resize();
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





// Prevent toolbars from stealing focus from editor
$(".w2ui-toolbar:not(.selectable)").on('mousedown', function(event) {
  if (event.target.className.indexOf('selectable') < 0) event.preventDefault();
});


function init(inOverlay) {
  console.log('init');
  initLayout();
  initButtons();
  if (inOverlay) showProjectsInOverlay();
  else {
    setTimeout(function (){initAll();showProjectsInPanel();},150);
  }
}

function initAll() {
  initPanels();
  refreshTabs();
  updateLayout();
}

function initPanels() {
  
  var i = 0;
  $(".w2ui-panel-content").each(function() {
    var panelId = $(this).parent().attr('id');
    if (panelAreas.indexOf(panelId) > -1) {
      $(this).append('<div id="container' + i + '" class="panel-container">'
      + '<div id="content' + i + '" class="panel-content"></div>'
      + '<div id="editor' + i + '" class="panel-editor"></div></div>');
      editors[i] = ace.edit($(this).find(".panel-editor")[0]);
      editors[i].$blockScrolling = Infinity;
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
  
  /* Register resize events */
  
  w2ui.layout.on('refresh', function(event) {
      event.onComplete = function () {
          updateLayout(false,true);
      };
  });
  
  $(window).on("resize", function () {
   updateLayout(false,true);
  });
  
  w2ui.leftsplit.on('resize', function () {
    updateLayout(false,true);
  });
  w2ui.middlesplit.on('resize', function () {
    updateLayout(false,true);
  });
  w2ui.rightsplit.on('resize', function () {
    updateLayout(false,true);
  });
}


// Show and generate project list dialogue

function showProjectsInOverlay () {
  
  $().w2layout({
    name: 'popupLayout',
    panels: [
      { type: 'left', size: 250, resizable: true, minSize: 200 },
      { type: 'main', minSize: 350, overflow: 'hidden' }
    ]
  });
  
  octo.getUser().repos(function(err, repos) {
    
    if (err) w2alert('No repositories are accessible');
    
    else {
      
      var secret = {id: 'secret', text: 'Your private projects (', group: true, expanded: true, nodes: []};
      var open = {id: 'public', text: 'Your public projects (', group: true, expanded: true, nodes: []};
      var shared = {id: 'shared', text: 'Projects shared with you (', group: true, expanded: true, nodes: []};
      var forked =  {id: 'forked', text: 'Projects you have forked (', group: true, expanded: true, nodes: []};
      
      var obj = repos.sort(function(a,b){
        if(a.full_name.toLowerCase() > b.full_name.toLowerCase()) return 1;
        if (a.full_name.toLowerCase() < b.full_name.toLowerCase()) return -1;
        else return 0;
      });
        
      for (var i in obj) {
        var item = obj[i];
        
        if (item.fork)
          forked.nodes.push({
            id: item.full_name + '_' + Math.round(Math.random*1000000),
            text: item.name,
            icon: "fa fa-code-fork"
          });
        else if (item.private)
          secret.nodes.push({
            id: item.full_name + '_' + Math.round(Math.random*1000000),
            text: item.name,
            icon:  "fa fa-eye-slash"
          });
        else if (item.owner.login !== config.user)
          shared.nodes.push({
            id: item.full_name + '_' + Math.round(Math.random*1000000),
            text: '<img class="custom-icon" src="' + item.owner.avatarUrl +'"/> ' + item.fullName
          });
        else
          open.nodes.push({
            id: item.full_name + '_' + Math.round(Math.random*1000000),
            text: item.name,
            icon: "fa fa-github"
          });
      }
      
      // update count
      
      open.text += open.nodes.length + ')';
      shared.text += shared.nodes.length + ')';
      secret.text += secret.nodes.length + ')';
      forked.text += forked.nodes.length + ')';
      
      if (w2ui.projectList) w2ui.projectList.destroy();
      
      $().w2sidebar({
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
          w2popup.close();
          initAll();
          setTimeout (function () {openProject(user,repo);}, 300);
        }
      });
      
      $('#popup').w2render('popupLayout');
      w2ui.popupLayout.content('left', w2ui.projectList);
      w2ui.popupLayout.content('main', '<h1>Select project</h1>');
      //w2ui.layout.resize();
      w2popup.unlock();
    }
  });

  w2popup.open({
    title: 'Open an existing project',
    width: 1200,
    height: 1000,
    body: '<div id="popup"></div>',
    showClose: false,
    maximised: true,
    modal: true,
    onOpen  : function (event) {
      event.onComplete = function () {
        $('#projectList').w2render('popupLayout');
      };
    },
    onToggle: function (event) {
      event.onComplete = function () {
        w2ui.projectList.resize();
      };
    }
  });
  w2popup.lock('Loading projects ...', true);

}

// Show and generate project list dialogue

function showProjectsInPanel () {
  
  $().w2layout({
    name: 'panelLayout',
    panels: [
      { type: 'right', size: '50%', hidden: true},
      { type: 'main'}
    ]
  });
  
  octo.user.repos.fetchAll().then(function(repos) {
    //console.log(repos);
    if (repos.length === 0) w2alert('No repositories are accessible');
    
    else {
      
      var open = {id: 'public', text: 'Public projects (', group: true, expanded: false, nodes: []};
      var secret = {id: 'secret', text: 'Private  projects (', group: true, expanded: false, nodes: []};
      var shared = {id: 'shared', text: 'Shared with you (', group: true, expanded: false, nodes: []};
      var forked =  {id: 'forked', text: 'Forked  projects (', group: true, expanded: false, nodes: []};
      
      var obj = repos.sort(function(a,b){
        if(a.fullName.toLowerCase() > b.fullName.toLowerCase()) return 1;
        if (a.fullName.toLowerCase() < b.fullName.toLowerCase()) return -1;
        else return 0;
      });
        
      for (var i in obj) {
        var item = obj[i];
        
        // stop when encountering api functions appended to end of result set
        if (typeof item === "function") break;
        
        if (item.fork)
          forked.nodes.push({
            id: item.fullName + '_' + Math.round(Math.random*1000000),
            text: item.name,
            icon: "fa fa-code-fork"
          });
        else if (item.private)
          secret.nodes.push({
            id: item.fullName + '_' + Math.round(Math.random*1000000),
            text: item.name,
            icon:  "fa fa-eye-slash"
          });
        else if (item.owner.login !== config.user)
          shared.nodes.push({
            id: item.fullName + '_' + Math.round(Math.random*1000000),
            text: '<img class="custom-icon" src="' + item.owner.avatarUrl +'"/> ' + item.fullName
          });
        else
          open.nodes.push({
            id: item.fullName + '_' + Math.round(Math.random*1000000),
            text: item.name,
            icon: "fa fa-github"
          });
      }
      
      // update count
      
      open.text += open.nodes.length + ')';
      shared.text += shared.nodes.length + ')';
      secret.text += secret.nodes.length + ')';
      forked.text += forked.nodes.length + ')';
      
      if (w2ui.projectList) w2ui.projectList.destroy();
      
      $().w2sidebar({
        name: 'projectList',
        //topHTML: '<div style="padding:0.5em"><h3>Select project</h3></div>',
        showMax: true,
        nodes: [
          open,
          forked,
          shared,
          secret
        ],
        onClick: function (event) {
          var target = event.target.split('/');
          var user = target[0];
          target = target[1].split('_');
          target.pop();
          var repo = target.join('_');
          //initAll();
          showProject(user,repo);
        }/*,
        onDblClick: function (event) {
          var target = event.target.split('/');
          var user = target[0];
          target = target[1].split('_');
          target.pop();
          var repo = target.join('_');
          //initAll();
          setTimeout (function () {openProject(user,repo);}, 300);
        }*/
      });
      
      var dashboard = 
      //'<h2>Welcome <strong>' + config.user + '</strong>' +
      //'<img class="avatar-large" src="' + config.avatar + '"/></h2>' +
      '<div id="startscreen">' +
       '<h2 class="accordion"><i class="fa fa-plus-square"></i> Create a new project.</h2>' +
       '<div class="apanel" id="newproject"><p>' + 'This section is being worked on. Please use github.com to create a repository to begin.' + '</p></div>' +
       '<h2 class="accordion"><i class="fa fa-search"></i> Browse all projects.</h2>' + 
       '<div class="apanel project-browser" id="project-browser"></div>' +
       '<h2 class="accordion active"><i class="fa fa-hourglass-end"></i> ' +
       'Resume a recent project.</h2><div class="apanel show" id="recent">' +
       'Loading recent changes...' + '</div>' +
      '</div>';
       
      $('#content4').addClass("inactive-panel").html(dashboard);
      
      $('#project-browser').w2render('panelLayout');
      
      // Attach project list w2ui widget
      w2ui.panelLayout.content('main', w2ui.projectList);
      
      // Handle accordion events
      
      $(".accordion").on("click", function (event) {
        if ($(this).hasClass("active")) {
          $(this).removeClass("show");
          $(this).removeClass("active");
        }
        else {
          $(".apanel").removeClass("show");
          $(".accordion").removeClass("active");
          $(this).toggleClass("active");
        }
        $(this).next().toggleClass("show");
        setTimeout(updateLayout, 10);
      });
      
      
      // List most recent push events performed by the user by repo and branch

      var reposArray = [];
      var recentHistory = '';
      
      // Prevent hitting rate limit by using token authentication
      $.ajax({
        type: "get",
        url: "https://api.github.com/users/" + config.user + "/events?t=" +
        Math.random(),
        headers: {
          "Authorization": "Token " + localStorage.token
        }
      }).done(function(data) {
        var repos = [];
        for (var i = 0; i < data.length; i++) {
          var item = data[i];
          // only use commit events as activity
          if (item.type == "PushEvent") {
            var repoUser = item.repo.name.split('/')[0];
            var repoName = item.repo.name.split('/')[1];
            var repoBranch = item.payload.ref.substr(11);
            // Remove duplicates by repo name and branch
            if (repos.indexOf(item.repo.name + repoBranch) == -1) {
              repos.push (item.repo.name + repoBranch);
                        
              var editButton = '<div class="pressable" onclick="openProject(' + "'" +
                repoUser + "','" + repoName + "','" + repoBranch + "'" + ')">' +
                '<h2><i class="fa fa-pencil" aria-hidden="true"></i> Edit ' +
                '</h2></div>'; ;
              
              var cardFront = '<div class="card-front">' +
                '<i class="fa fa-2x fa-gear repo-config" ' + 
                'onclick="$(this).parent().parent().toggleClass(' + 
                "'flipped'" + ')"></i>' + '<div class="repo-blurb">' + 
                '<h1><i class="fa fa-github"></i> ' + 
                (repoUser == config.user ? '': repoUser +' / ') + repoName + 
                '</h1><p>Modified ' + timeSince(item.created_at) + ':<br/><br/> "' + 
                item.payload.commits[0].message + '"</p></div>' + editButton +
                '<p class="branch-selector inactive">Branch: ' +
                repoBranch + '</p></div>';
                
              var cardBack = '<div class="card-back"><i class="fa fa-2x fa-share repo-config" ' + 
                'onclick="$(this).parent().parent().toggleClass(' + "'flipped'" + ')"></i>' + 
                '<div class="repo-blurb"><h1>Options</h1><p>Add collaborator</p></div>'
                '</div>';
              
              recentHistory += '<div class="card-container"><div class="card">' + 
                cardFront + cardBack + '</div></div></div>';
            }
          }
        }
        
        $("#recent").html('').prepend(recentHistory || 
          '<p>You do not appear to have any recently saved projects.</p>');
        setTimeout(updateLayout, 10);
      });
      
      
      /*
      // List push events performed by collaborators
      
      $.ajax({
        url: "https://api.github.com/users/" + config.user + "/received_events"
      }).done(function(data) {
        var collaboratorEvents = '';
        $.each(data, function(index, value) {
          if (value.type == "PushEvent") {
            collaboratorEvents += '<li>' + timeSince(value.created_at) + ' ' +
            value.actor.login + " modified <i>" + value.repo.name + '</i>:<br/> -- ' +
            value.payload.commits[0].message + ' (<a href="https://github.com/' +
            value.repo.name + "/commit/" + value.payload.head + 
            '" target="_blank">More</a>)</li>';
          }
        });
        $("#recent").append('<h3>Collaborator activity</h3><ul>' +
        (collaboratorEvents || '<li>No recent activity.</li>') + '</ul>');
      });
      */
      
    }
  });
}

function flipRepo (elem) {
  console.log("css flip", elem);
}

// Show and generate project list dialogue

function showProjectsInTab (panelArea) {
  
  octo.getUser().repos(function(err, repos) {
    
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
            text: '<img class="custom-icon" src="' + item.owner.avatarUrl +'"/> ' + item.fullName
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
        caption: '<i class="fa fa-hdd-o"></i> Projects',
        type: 'projectmanager',
        panel: location.area
      };
      w2ui[location.layout].get(location.panel).tabs.add({
        id: id,
        caption: '<i class="fa fa-hdd-o"></i> Projects'
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
          openProject(user,repo);
        }
      });

      w2popup.close();
      w2ui[location.layout].get(location.panel).tabs.click(id);
      updateLayout();
    }
  });

  w2popup.open({
    title: 'Opening existing projects'
  });
  w2popup.lock('Loading projects ...', true);

}

function pushNodes (id, nodes) {
  console.log("added 100");
  var node = nodes.splice(0,100);
  w2ui[id].add(node);
  setTimeout(function() {
    if (nodes.length > 0) window.requestAnimationFrame(function() {pushNodes (id, nodes);});
    else w2ui[id].unlock();
  }, 1000);
}


// Show project details on front screen

// Create a sidebar for browsing repository files
function showProject (user, repository) {
  
  w2ui.panelLayout.content('right', '<p>Fetching repository details...</p>');
  w2ui.panelLayout.show('right');

  octo.repos(user, repository).fetch().then(function(data) {
    console.log(data);
    var description = data.description;
    description = (description !== null && description !== '' ?
      '<p>' + description + '</p>': '<p>No description available.</p>');
    
    var created = timeSince(data.createdAt);
    var fork = data.fork;
    var isPrivate = data.private;
    var parentRepo = fork ? data.parent : false;
    var owner = data.owner.login;
    var repoIcon = '<i class="fa fa-github"></i> ';
    if (fork) repoIcon = '<i class="fa fa-code-fork"></i> ';
    if (isPrivate) repoIcon = '<i class="fa fa-eye-slash"></i> ';
    if (owner !== config.user) repoIcon = '<img class="avatar-large" src="' +
      data.owner.avatarUrl +'"/> ';
    var history = '<p>Created ' + created + ' by ' + owner + '.</p>';
    if (parentRepo) history = '<p>Forked from ' + parentRepo.fullName + ' ' +
    created + ', by ' + owner + '.</p>';
    
    var editButton = '<div id="editbutton" class="pressable" ' +
      'style="display: none; margin-bottom: 0;" ' +
      'onclick="openProject(' + "'" + owner + "','" + repository + 
      "', 'getbranchfromselection'" + ')">' +
      '<h2><i class="fa fa-pencil" aria-hidden="true"></i> Edit </h2></div>';
    
    var cardFront = '<div class="card-front"><i class="fa fa-2x fa-gear repo-config" ' + 
      'onclick="$(this).parent().parent().toggleClass(' + "'flipped'" + ')"></i>' + 
      '<div class="repo-blurb"><h1>' + repoIcon + repository + '</h1>' +
      description + history + '</div>' + editButton + '<div id="branch-list">' + 
      '<p>Fetching branches ...</p></div></div>';
      
    var cardBack = '<div class="card-back"><i class="fa fa-2x fa-share repo-config" ' + 
      'onclick="$(this).parent().parent().toggleClass(' + "'flipped'" + ')"></i>' + 
      '<div class="repo-blurb"><h1>Options</h1><p>Add collaborator</p></div>' +
      '</div>';
    
    var projectHTML = '<div class="card-container"><div class="card">' + 
      cardFront + cardBack + '</div></div>';
      
    w2ui.panelLayout.content('right', projectHTML);
    
    octo.repos(user, repository).branches.fetch().then(function(results) {
      console.log(results);
      var branches = [];
      for (var i = 0; i< results.items.length; i++) {
        branches.push (results.items[i].name);
      }
      $("#branch-list").html('<select class="branch-selector"><option>' + 
        branches.join('</option><option>') +
        '</option><option>New branch...</option></select>');
      // Allow edit
      $('#editbutton').show();
      // Default to master branch, if it exists
      if (branches.indexOf('master')>-1) $('#branch-list select').val('master');
      updateLayout();
    });
    
  });
}

// Contextmenu callback for jstree

function fileTreeMenu (node) {
  var tree = $("#container_" + node.data.jsTree).jstree(true);
  var items = {
    edit: {
      label: "Edit file",
      icon: "fa fa-pencil",
      separator_after : false,
      action: function () {
        var conf = {
          user: node.data.user,
          repo: node.data.repo,
          branch: node.data.branch,
          path: node.data.path
        };
        startDoc(conf);
      }
    },
    renameFolder: { 
      label: "Rename folder",
      icon: "fa fa-edit",
      action: function () {
        
        // Get old filename.
        var old = node.text.replace(/\s+$/, ''); // trim right spaces
        
        tree.edit(node, null, function(node, success, cancelled) {
          
          // Check if filename was changed
          if (!success || cancelled) return;
          if (node.text.replace(/\s+$/, '')==old) return;
          
          // Check if file name is valid, otherwise revert to old filename.
          // TODO: improve regex matching pattern.
          if (node.text.indexOf('/') > -1) {
            w2alert("Ignoring new filename due to invalid characters.");
            tree.rename_node(node, old);
            return;
          }

          // Checks passed, so now try to commit the name change.
          
          var repo = octo.repos(node.data.user, node.data.repo);
          var branch = node.data.branch;
          var oldPath = node.data.path;
          var parts = node.data.path.split('/');
          parts.pop(); // remove old filename
          var newPath = '';
          
          //prevent leading slash in new path!
          if (parts.length>0) newPath = parts.join("/") + "/" + node.text;
          else newPath = node.text;
          
          moveFolder (node.data.user, node.data.repo, node.data.branch, node.data.path, newPath);
     
          
        });
      }
    },
    renameFile: { 
      label: "Rename file",
      icon: "fa fa-edit",
      action: function () {
        
        // Get old filename.
        var old = node.text.replace(/\s+$/, ''); // trim right spaces
        
        tree.edit(node, null, function(node, success, cancelled) {
          
          // Check if filename was changed
          if (!success || cancelled) return;
          if (node.text.replace(/\s+$/, '')==old) return;
          
          // Check if file name is valid, otherwise revert to old filename.
          // TODO: improve regex matching pattern.
          if (node.text.indexOf('/') > -1) {
            w2alert("Ignoring new filename due to invalid characters.");
            tree.rename_node(node, old);
            return;
          }

          // Checks passed, so now try to commit the name change.
          
          var repo = octo.repos(node.data.user, node.data.repo);
          var branch = node.data.branch;
          var oldPath = node.data.path;
          var parts = node.data.path.split('/');
          parts.pop(); // remove old filename
          var newPath = '';
          
          //prevent leading slash in new path!
          if (parts.length>0) newPath = parts.join("/") + "/" + node.text;
          else newPath = node.text;
          
          moveFile (node.data.user, node.data.repo, node.data.branch, node.data.path, newPath);
     
          
        });
      }
    },
    removeFile: { 
      separator_after : true,
      label: "Delete file",
      icon: "fa fa-trash",
      action: function () {
        w2confirm("Are you sure you want to delete <em>" +
        node.data.name + "</em>?", "Warning",
        function (result) {
          if (result === "Yes") {
            removeFile(node.data.user, node.data.repo, node.data.branch, node.data.path, node.data.sha);
          }
        });
      }
    },
    removeFolder: { 
      separator_before : true,
      separator_after : true,
      label: "Delete folder",
      icon: "fa fa-trash",
      action: function () {
        w2confirm("Are you sure you want to delete the folder <em>" +
        node.data.name + "</em> and any files contained within it?", "Warning",
        function (result) {
          if (result === "Yes") {
            removeFolder(node.data.user, node.data.repo, node.data.branch, node.data.path);
          }
        });
      }
    },
    /*duplicate: { 
      label: "Duplicate",
      icon: "fa fa-copy",
      action: function () {
        alert ("duplicate");
      }
    },
    */
    preview: {
      separator_before : true,
      label: "Quick preview",
      icon: "fa fa-eye",
      action: function () {
        openPreview (node.data.user + '/' + node.data.repo + '/' +
          node.data.branch +'/' + node.data.path);
      }
    },
    open: {
      label: "Preview in window",
      icon: "fa fa-external-link",
      action: function () {
        window.open('/' + node.data.user + '/' + node.data.repo + '/' +
          node.data.branch +'/' + node.data.path, 
          "_blank", "top=100, left=100, width=500, height=500,toolbar=1,resizable=1");
      }
    },
    qrcode: {
      label: "Open QR code",
      separator_after : true,
      icon: "fa fa-qrcode",
      action: function () {
        openPreview (node.data.user + '/' + node.data.repo + '/' +
          node.data.branch +'/' + node.data.path);
      }
    },
    new: {
      label: "Create new ...",
      separator_after : true,
      icon: "fa fa-file-o",
      action: function () {
        console.log("creating",node);
        var newNode = tree.create_node(node);
        tree.edit(newNode);
      }
    }
  };

  if (node.data.type == "directory") {
    delete items.edit;
    delete items.open;
    delete items.preview;
    delete items.qrcode;
    delete items.renameFile;
    delete items.removeFile;
  }

  if (node.data.type == "file" || node.data.type == "binary") {
    delete items.renameFolder;
    delete items.removeFolder;
    
  }
  
  return items;
}

// Create a sidebar for browsing repository files
var actualRepoName;
function openProject (user, repository, branch, panelArea) {
  // strip out any character that isn't: a-z A-Z 0-9 _- (notably periods: .)
  actualRepoName = repository;
  var safeRepo = repository.replace(/[^a-z0-9_-]|\s+/gmi, "");
  branch = (branch !== undefined) ? branch : 'master';
  if (branch == 'getbranchfromselection') branch = $('#branch-list select').val();
  var id = "filebrowser_" + user + "_" + safeRepo + "_" + branch + "_" + Math.round(Math.random() * 10000000);

  w2ui.layout.show('left');
  
  // 1. Fetch all repo files in one go

  octo.repos(user, repository).git.trees(branch).fetch({'recursive' :true}).then(function (response) {

    var tree = response.tree;
    console.log(tree.length, response.truncated);
    if (tree.length === 0) {
      w2alert("Error retrieving files", err);
    }
        
    // GitHub data tree API handles a maximum of approx 60000 file
    // and truncates repositories that are larger than this!
    
    else if (response.truncated) {
      w2alert("Projects with more than <b>60,000 files</b> are unsupported.<br>"+
        "Please try opening a project with fewer files.", "Error");
    }

    // 2. Generate filetree widget
    else {
      
      // Add tab
      
      var title = '<i class="fa fa-folder-open-o"></i> ' + repository;

      var location = pickPanel(panelArea || 'filebrowser');
      
      w2ui[location.layout].get(location.panel).tabs.add({
        id: id,
        closable: true,
        caption: title
      });
      
      tabList[id] = {
        id: id,
        caption: title,
        type: 'filebrowser',
        panel: location.area
      };

      // Prepare jstree data structure
      
      // console.log(tree);
      
      var jsTreeFiles = [];
      var jsTreeFolders = [];
      for (var i = 0; i < tree.length; i ++) {
        var item = tree[i];
        var node = {};
        node.id = item.path;
        var parts = item.path.split('/');
        node.text = parts.pop();
        
        node.data = {
          jsTree: id,
          user: user,
          repo: repository,
          branch: branch,
          path: node.id,
          sha: item.sha,
          name: node.text
        };
        
        // Check if root node
        if (parts.length === 0) node.parent = '#';
        else node.parent = parts.join('/');
        
        // Check if directory (type "tree") or file (type "blob").
        // Ignore git submodules (has type "commit") and symbolic links.

        if (item.type === "tree") {
          node.icon = "fa fa-folder";
          node.data.type = "directory";
          jsTreeFolders.push(node);
        }
        
        // Or a file
        else if (item.type === "blob") {
          node.icon = "fa fa-file-o"; 
          node.data.type = "file";
          jsTreeFiles.push(node);
        }
        
      }
      
      // Insert jstree widget into DOM
      
      $('<div id="container_' + id +'"></div>').appendTo("body");
      
      $("#container_"+id).jstree({
        core : {
          data : jsTreeFolders.concat(jsTreeFiles),
          check_callback : function (action, node, node_parent, position, evt) {
            if (action === "move_node") {
              //only allow dropping inside directory or tree root
              var targetType = node_parent.data ? node_parent.data : {};
              return (node_parent.id === "#" || 
                      targetType.type === "directory");
            }
            return true;  //allow all other operations
          },
          show_only_matches: true
        },
        plugins : [
          "contextmenu",
          "search",
          "unique",
          "dnd",
          "state",
          "sort"
        ],
        contextmenu : {
          items : fileTreeMenu
        },
        sort: function (a, b) {
            var nodeA = this.get_node(a);
            var nodeB = this.get_node(b);
            var lengthA = nodeA.children.length;
            var lengthB = nodeB.children.length;                
            if ((lengthA === 0 && lengthB === 0) || (lengthA > 0 && lengthB > 0))
              return this.get_text(a) > this.get_text(b) ? 1 : -1;
            else
              return lengthA > lengthB ? -1 : 1;
        }
      });
      
      // Listen for and handle jsTree events
      
      $('#container_' + id)
      .on('create_node.jstree', function (e, data) {
        console.log("Created node", data);
      })
      .on('delete_node.jstree', function (e, data) {
        console.log("Deleted node", data);
      })
      .on('move_node.jstree', function (e, data) {
        console.log("Moved node", data);
      })
      .on('rename_node.jstree', function (e, node) {
        /*
        var old = node.text.replace(/\s+$/, ''); // trim right spaces
        instance.edit(node, null, function(node, success, cancelled) {
            if (!success || cancelled) return;
            if (node.text.replace(/\s+$/, '')==old) return;

            // all good, your rename code here
        */
        
      })
      .on('dblclick', '.jstree-anchor', function () {
        var instance = $.jstree.reference(this),
        node = instance.get_node(this);
        
        // Only open files for editing
        if (node.data.type !== 'file') return;
        
        var conf = {
          user: node.data.user,
          repo: node.data.repo,
          branch: node.data.branch,
          path: node.data.path
        };
        
        startDoc(conf);
      });

      // Activate filetree widget
      
      w2ui[location.layout].get(location.panel).tabs.click(id);
      $(location.id).find(".w2ui-tabs").scrollLeft(99999);
      refreshTabs();
    
    }
  });
}


// Create a sidebar for browsing repository files
function refreshProject (user, repository, branch, id) {
  
  // 1. Fetch all repo files in one go

  octo.repos(user, repository).git.trees(branch).fetch({'recursive':true}).then(function (response) {

    var tree = response.tree;
    console.log(tree.length, response.truncated);
    if (tree.length === 0) {
      w2alert("Error retrieving files", err);
    }
        
    // GitHub data tree API handles a maximum of approx 60000 file
    // and truncates repositories that are larger than this!
    
    else if (response.truncated) {
      w2alert("Projects with more than <b>60,000 files</b> are unsupported.<br>"+
        "Please try opening a project with fewer files.", "Error");
    }

    // 2. Generate filetree widget
    else {
      
      // Prepare jstree data structure
      
      var jsTreeFiles = [];
      var jsTreeFolders = [];
      for (var i = 0; i < tree.length; i ++) {
        var item = tree[i];
        var node = {};
        node.id = item.path;
        var parts = item.path.split('/');
        node.text = parts.pop();
        
        node.data = {
          jsTree: id,
          user: user,
          repo: repository,
          branch: branch,
          path: node.id,
          sha: item.sha,
          name: node.text
        };
        
        // Check if root node
        if (parts.length === 0) node.parent = '#';
        else node.parent = parts.join('/');
        
        // Check if directory (type "tree") or file (type "blob").
        // Ignore git submodules (has type "commit") and symbolic links.

        if (item.type === "tree") {
          node.icon = "fa fa-folder";
          node.data.type = "directory";
          jsTreeFolders.push(node);
        }
        
        // Or a file
        else if (item.type === "blob") {
          node.icon = "fa fa-file-o"; 
          node.data.type = "file";
          jsTreeFiles.push(node);
        }
        
      }
      
      // Remove existing jstree widget
      $("#container_"+id).jstree("destroy");
      
      // Create new jstree widget 
      $("#container_"+id).jstree({
        core : {
          data : jsTreeFolders.concat(jsTreeFiles),
          check_callback : function (action, node, node_parent, position, evt) {
            if (action === "move_node") {
              //only allow dropping inside directory or tree root
              var targetType = node_parent.data ? node_parent.data : {};
              return (node_parent.id === "#" || 
                      targetType.type === "directory");
            }
            return true;  //allow all other operations
          },
          show_only_matches: true
        },
        plugins : [
          "contextmenu",
          "search",
          "unique",
          "dnd",
          "state",
          "sort"
        ],
        contextmenu : {
          items : fileTreeMenu
        },
        sort: function (a, b) {
            var nodeA = this.get_node(a);
            var nodeB = this.get_node(b);
            var lengthA = nodeA.children.length;
            var lengthB = nodeB.children.length;                
            if ((lengthA === 0 && lengthB === 0) || (lengthA > 0 && lengthB > 0))
              return this.get_text(a) > this.get_text(b) ? 1 : -1;
            else
              return lengthA > lengthB ? -1 : 1;
        }
      });
      
      // Listen for and handle jsTree events
      
      $('#container_' + id)
      .on('create_node.jstree', function (e, data) {
        console.log("Created node", data);
      })
      .on('delete_node.jstree', function (e, data) {
        console.log("Deleted node", data);
      })
      .on('move_node.jstree', function (e, data) {
        console.log("Moved node", data);
      })
      .on('rename_node.jstree', function (e, node) {
        /*
        var old = node.text.replace(/\s+$/, ''); // trim right spaces
        instance.edit(node, null, function(node, success, cancelled) {
            if (!success || cancelled) return;
            if (node.text.replace(/\s+$/, '')==old) return;

            // all good, your rename code here
        */
        
      })
      .on('dblclick', '.jstree-anchor', function () {
        var instance = $.jstree.reference(this),
        node = instance.get_node(this);
        
        // Only open files for editing
        if (node.data.type !== 'file') return;
        
        var conf = {
          user: node.data.user,
          repo: node.data.repo,
          branch: node.data.branch,
          path: node.data.path
        };
        
        startDoc(conf);
      });

    }
  });
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
          id: "#" + panelAreas[7],
          layout: panelAreas[7].split('_')[1],
          panel: 'main',
          area: 7
        };
      break;
      
      case 'project':
        obj = {
          id: "#" + panelAreas[1],
          layout: panelAreas[1].split('_')[1],
          panel: 'main',
          area: 1
        };
      break;
      
      case 'filebrowser':
        obj = {
          id: "#" + panelAreas[1],
          layout: panelAreas[1].split('_')[1],
          panel: 'main',
          area: 1
        };
      break;
      
      default:
        obj = {
          id: "#" + panelAreas[4],
          layout: 'middlesplit',
          panel: 'main',
          area: 4
        };
      break;
    }
    
  }

  return obj;
}

function startDoc(settings) {
  console.log(settings);
  w2popup.open().lock("Loading " + settings.path, true);
  // TabId stores the full url of the file
  var tabId = settings.user + '/' + settings.repo + '/' + 
    settings.branch + '/' + settings.path;
  var user = settings.user;
  var repository = settings.repo;
  var branch = settings.branch;
  var path = settings.path;
  var file = path.split('/');
  var title = settings.caption || (file.length > 0) ? file[file.length-1] : file;
  var preserveContent = settings.preserveContent || true;
  var color = settings.color || "red";
  var username = config.user || 'guest';
  var url = '/' + user + '/' + repository + '/' + branch + '/' + path;
  var encodedUrl = encodeURIComponent(url);
  var location = pickPanel();
  
  $.ajax({
    url: url,
    dataType: 'text'
  }).success(function(value) {
    
    w2popup.close();
    // Check to prevent opening binary files in text editor!
    
    var bytes = toUTF8Array(value);
    
    if (isBinaryFile(bytes, bytes.length)) {
      openPreview (url, title);
      refreshTabs();
      w2ui[location.layout].get(location.panel).tabs.click(tabId);
      w2popup.close();
      return;
    }
    
    connection.open(encodedUrl, 'text', function(error, doc) {
      if(error) {
        w2popup.close();
        console.log ("Unable to initiate real-time document", error);
      }
      else {
        
        var editSession = ace.createEditSession('', '');
        var editorObj = editors[location.area].setSession(editSession);
        tabList[tabId] = {
          id: tabId,
          caption: '<i class="fa fa-file-text-o"></i> ' + title,
          path: path,
          panel: location.area,
          type: 'editor',
          editSession: editSession
        };
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
        
        if (localStorage.fontSize) {$(".panel-editor").css("font-size", localStorage.fontSize + "px");}
        
        $(".panel-editor").css("font-size", "15px");
        
        editors[location.area].setOptions({
          enableBasicAutocompletion: true
        });
        
        var mode = modelist.getModeForPath(path).mode;
        editors[location.area].getSession().setMode(mode);
        editors[location.area].setOption("enableEmmet", true);
        editors[location.area].getSession().setTabSize(2);
        
        if (localStorage.lineWrap > 0) editors[location.area].getSession().setUseWrapMode(true);
        else editors[location.area].getSession().setUseWrapMode(false);
        
        //editors[location.area].session.setValue(value);
        editors[location.area].setValue(value, -1);
        editors[location.area].getSession().setUndoManager(new UndoManager());
        editors[location.area].gotoLine(0,0); // start at top
        editors[location.area].focus();

        
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
/*  
            $.get("http://webappeditor.com:3000/__browser_sync__?method=reload&args=" + encodedUrl, function (data) {});

            if (editors[location.area].getSession().getUndoManager().isClean()) w2ui[location.layout].get(location.panel).set(tabId, { caption: path });
            else w2ui[location.layout].get(location.panel).set(tabId, { caption: ' * ' + path});

            if (editors[currentFile].getSession().getUndoManager().hasUndo()) console.log("enable undo button");
            else console.log("disable undo button");

            if (editors[currentFile].getSession().getUndoManager().hasRedo()) console.log("enable redo button");
            else console.log("disable redo button");

            checkUnsaved();
*/

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
        
        
        // Attach editor to share document
        
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
              // updateCursor(data.user, location.area);
            break;
            case "selection":
              selections[data.user] = [data.row, data.column, data.row2, data.column2, data.color];
              //updateSelections(data.user, location.area);
            break;
          }
        });
        
        
        // add tab
        w2ui[location.layout].get(location.panel).tabs.add({
          id: tabId,
          closable: true,
          caption: '<i class="fa fa-file-text-o"></i> ' + title
        });
        
        //  Tab close clicks to be handled elsewhere!
        
        refreshTabs();
        w2ui[location.layout].get(location.panel).tabs.click(tabId);
        
      }
      
    });
  });
}


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

// Fix iframe overlapping resize toggles bug
// Todo: should be done at render finish, not arbitrary timeout
// NOT REQUIRED ANYMORE

/*
setTimeout(function () {
  $( ".w2ui-resize-toggle" ).hover(function() {
    $(".preview-iframe").css("z-index", 120);
  }).mouseout(function() {
    $(".preview-iframe").css("z-index", 121);
  });
}, 500);
*/

// KNOCKOUT MODEL - not implemented

/*
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
*/


// Start app

var connection = new sharejs.Connection("https://webappeditor.com:444/channel");

setTimeout(function() {
  console.log('auth')
  authenticate();
}, 500);