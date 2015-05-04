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
var Model = function(contexts, settings) {
  var self = this;
  self.label = "editor";
  self.context = 0;
  self.contexts = ko.observableArray(ko.utils.arrayMap(contexts, function(context) {
    return {
      label: context.label,
      repository: context.repository,
      username: context.username,
      branch: context.branch,
      temporary: context.temporary,
      documents: context.documents,
      files: context.files,
    };
  }));
  self.currentContext = ko.computed(function() {
    return self.contexts()[self.context].label;
  });
  self.contextFiles = ko.computed(function() {
    return self.contexts()[self.context].files;
  });
  self.addContext = function(context) {};
  self.setContext = function(id) {};
  self.delContext = function(id) {};
  self.sessions = ko.observableArray();
  self.addSession = function(session) {
    self.sessions.push(session)
  };
  self.delSession = function(id) {
    self.sessions.splice(id, 1);
  };
  self.setSession = function(id) {
    editor.setSession(sessions[id].session);
  };
};
ko.applyBindings(new Model(sampleContext));
var editor = ace.edit("editor");
var cssMode = '';
var occurSession0 = editor.getSession();
var occurSession1 = ace.createEditSession('File 2', cssMode);
var occurSession2 = ace.createEditSession('File 3', cssMode);
//Test          
$('#link0').click(function(eventObject) {
  editor.setSession(occurSession0);
});
$('#link1').click(function(eventObject) {
  editor.setSession(occurSession1);
});
$('#link2').click(function(eventObject) {
  editor.setSession(occurSession2);
});
/*
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