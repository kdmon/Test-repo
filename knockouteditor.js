var Document = function(title) {
  var self = this;
  self.title = ko.observable(title || 'zebra');
};
 
var Project = function( title) {
  // Stores an array of documents
  var self = this;
  self.title = ko.observable(title || 'lion');
  self.documents = ko.observableArray([new Document()]);
  // Operations
  self.addDocument = function(title) { self.documents.push(new Document(title || "Untitled ")) };
  self.closeDocument = function(id) { self.documents.pop() };
};

var Model = function() {
  var self = this;
  self.projects = ko.observableArray([new Project('New...')]);
  self.activeProject = ko.observable(0);
  // Return documents associated with the current or specific project
  self.projectDocuments = ko.computed(function () {
    var docs = self.projects()[self.activeProject()];
    if (docs) return docs.documents()
    else return;
  });
  // Return list of projects
  self.projectList = ko.computed(function () {
    return ["Existing", "New..."]
  });
  // Operations
  self.addProject = function(title) { self.projects.push(new Project(title || "Untitled " + Math.random())) };
  self.closeProject = function(id) { self.projects.pop() };
};

var app = new Model()
ko.applyBindings(app);


/*

// Class to represent a document
function Document(title, obj) {
    var self = this;
    self.title = ko.observable(title);
    self.obj = obj;
    // Put documents methods here... save rename delete close ?
}


function Model (contexts, settings) {
  var self = this;
  self.editor = ace.edit("editor");
  self.documents = ko.observableArray();
  self.addDocument = function(title, content, mode) {
    var editSession = ace.createEditSession('','');
    self.documents.push(new Document(title, editSession));
    self.editor.setSession(editSession);
  };
  self.setDocument = function(id) {
    self.editor.setSession(self.documents[id]);
  };
  self.closeDocument = function(id) {
    //self.documents.splice(id, 1);
    self.documents.pop();
    //self.documents.remove(id);
  };
  self.currentDocument = ko.computed(function() {
    return self.editor.getSession();
  });
};
//var instance = new Model(sampleContext);
ko.applyBindings(new Model ());
*/
/*
var sampleContext = [{
  label: "Test-repo context",
  repository: 'Test-repo',
  username: "kdmon",
  branch: "master",
  temporary: false,
  documents: [{
    id: '0',
    label: "Untitled.html",
    value: "html document",
    unsaved: false
  }],
  files: [{
    filename: 'index.html',
    path: "/",
    value: "html document",
    unsaved: false
  }]
}];
  
  self.addContext = function(context) {};
  self.setContext = function(id) {};
  self.delContext = function(id) {};
  
  self.context = ko.observable(0);
  self.contexts = ko.observableArray(ko.utils.arrayMap(contexts, function(context) {
    return {
      label: context.label,
      repository: context.repository,
      username: context.username,
      branch: context.branch,
      temporary: context.temporary,
      documents: ko.observableArray(context.documents),
      files: ko.observableArray(context.files),
    };
  }));
  self.currentContext = ko.computed(function() {
    return self.contexts()[self.context()].label;
  });
  self.contextFiles = ko.computed(function() {
    return self.contexts()[self.context()].files;
  });
  
        self.documents = ko.observableArray(ko.utils.arrayMap(documents, function(document) {
          return {
            id: document.id,
            label: document.label,
            value: document.value,
            unsaved: document.unsaved
          };
        }));
        self.files = ko.observableArray(ko.utils.arrayMap(files, function(file) {
          return {
            name: document.id,
            path: document.label,
            type: document.value,
            unsaved: document.unsaved
          };
        }));
    */
/*
      var file = {
        "name":"",
        "path":"",
        "type":"",
        "opened": false,
        "unsaved": false
      };
      
      var model = {
        "auth": {
          "state": false,
          "user": "guest"
        },
        "chat": {
          "room": "lobby",
          "remoteVideos": ko.observableArray(),
          "participants": ko.observableArray()
          },
        "context": [
          {
            "label": "",
            "temporary": false,
            "repository" : "",
            "owner": "",
            "branch" : "",
            "documents": ko.observableArray(),
            "files" : ko.observableArray(),
           
            
          }
        ],
        "settings": {
          "fontsize": 12,
          "theme": "light"
        }
      };
      */