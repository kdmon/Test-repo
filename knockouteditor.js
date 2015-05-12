(function () {
  
	// TABS-WEST - sortable
	$(".ui-layout-west").tabs().find(".ui-tabs-nav").sortable({ axis: 'x', zIndex: 2 });

	// TABS-EAST - sortable
	$(".ui-layout-east").tabs().find(".ui-tabs-nav").sortable({ axis: 'x', zIndex: 2 });

	// TABS-CENTER - sortable
	$(".ui-layout-center").tabs({change: function () {  }}).find(".ui-tabs-nav").sortable({ axis: 'x', zIndex: 2 })	;

	// PAGE LAYOUT
	myLayout = $('body').layout({
    west__size: 0.33,
    east__size: 0.33,
    south__initClosed: true
	});
	
  var github = new Github({
    token: "",
    auth: "oauth"
  });
  
  var repo = github.getRepo("kdmon", "cats");
  
  var queue = [];
  
  function queueSave (sha, file, content, message) {
    queue.push ({sha:sha, file: file, content: content, message:message});
  }
  
  function queueProcess () {
    if (queue.length > 0) {
      var item = queue.pop();
      repo.write(item.sha, item.file, item.content, item.message, function (err) {
        if (err) alert ("Error saving " + item.file);
        console.log(err);
      });
      setTimeout(function () {queueProcess()},500);
    }
  }
  
  queueSave('master', 'file7.txt', 'File 7', 'Test commit');
  queueSave('master', 'file8.txt', 'File 8', 'Test commit');
  queueSave('master', 'file9.txt', 'File 9', 'Test commit');
  queueSave('master', 'file10.txt', 'File 10', 'Test commit');
  //queueProcess ();
  
  
  var webAppEditor = ace.edit("editor");
  $("#editor").hide();
  
  var Model = function() {
    var self = this;
    self.activeProject = ko.observable(0);
    self.projects = ko.observableArray();
    // Return documents associated with the active project
    self.projectDocuments = ko.computed(function () {
      var docs = self.projects[self.activeProject];
      if (docs) return docs.documents;
      else return;
    });
    self.currentProject = ko.computed(function () {
      return self.projects()[self.activeProject()];
    });
    // Return list of projects
    self.projectList = ko.computed(function () {
      var list = [];
      for (i=0;i<self.projects().length;i++) {
        list.unshift(self.projects()[i].title);
      }
      return list;
    });
    // Explicitly passing in params not possible from dom binding
    // Instead can be implicit if inside ko context, with, foreach etc.
    self.addProject = function() { self.projects.push(new Project("Untitled " + Math.random()));};
    self.closeProject = function(project) { self.projects.remove(project) };
    self.selectProject = function(project) {self.activeProject(project)};
    // Act on project change
    self.projects.subscribe(function(newValue) {
      console.log("Projects changed");
    });
  };
  
  var Editor = function () {
    var self = this;
    self.document = ko.observable();
  };
  
  var Project = function(title, root) {
    var self = this;
    self.title = ko.observable(title || 'Untitled project');
    self.root = ko.observable(root);
    self.documents = ko.observableArray();
    self.addDocument = function() {
      var editSession = ace.createEditSession('',  '');
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
      if (self.documents().length>0){
        $("#editor").show();
        webAppEditor.setSession(self.documents()[self.documents().length-1].editSession);
        webAppEditor.focus();
      }
      else $("#editor").hide();
    });
  };
  
  var Document = function(title, editSession) {
    var self = this;
    self.title = ko.observable(title || 'zebra');
    self.editSession = editSession;
  };
  
  var app = new Model();
  setTimeout(function(){
    ko.applyBindings(app);
  },250);
  
  
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

  
})();

