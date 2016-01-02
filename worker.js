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

onmessage = function(e) {
  
  console.log('Message received from main script');
  console.log (e);
  
  var tree = e.data.tree;
  var repo = e.data.repo;
  var branch = e.data.branch;
  var user = e.data.user;
  
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
  // return result to main script and exit
  postMessage(nodes);
  self.close();
};