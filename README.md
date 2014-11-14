# Papalote - Collaborative Code Editor

## Build Status
[ ![Codeship Status for makersquare/papalote](https://www.codeship.io/projects/b53e2560-4118-0132-e238-5e14300eaef6/status?branch=dev)](https://www.codeship.io/projects/44095)

##Overview
#### [Papalote](http://code.mks.io) is a real-time collaborative code editor  
This was the final project of MakerSquare cohort SF2.
It was used as a platform to explore new technologies and learn to work in a large team (9 collaborators and 2 project managers). We learned to separate tasks, collaborate, and merge code. We learned best practice project flow including daily scrum meetings, product sprints, and dealing with feature creep.

##Table of Contents
* [Purpose](#purpose)
* [Try it out](#try-it-out)
* [Workflow](#workflow)
* [Technologies used](#technologies-used)
* [User Stories](#user-stories)
* [Team Members](#team-members)

##Purpose
To learn how to create a web application using the following technology.

* Ruby on Rails
* AngularJS
* Websockets
* OAuth
* Sass
* Foundation
* Git/Github
  
Further, the application will hopefully be useful to conduct coding interviews for future applicants to the MakerSquare program. Or to disceminate and/or live edit code during class.

##Try it out
The latest build of papalote is available [here](http://code.mks.io). Full functionality is only available in Chrome and Firefox at the moment.  
  
1. Open papalote
* Click the new file icon at the top of the page
* Click on 'Document Name' and type in a filename with the extension of your favorite language (e.g. 'test.js')
* Click save!
* Send the url of your page to a friend
* Write some code! 
* Don't forget to save when you're done.  
  
Papalote also supports saving folders and files when logged in. You'll also find a file-specific chat box on the bottom right!

See it in action:  

![image](http://i.imgur.com/wE8FOZT.png =400x280)  

![image](http://i.imgur.com/4AwdlGe.png =400x280)

##Workflow

Our team used Trello to organize our different features for the application. Trello was also used to assign people to the different tasks.
Trello was kept up to date by each individual who was working on a task. We also had daily scrum meetings in which every member of the team recapped what they worked on during the previous day and what they are planning to work on during the current day.

In order for our 9 person team to effectively collaborate with each other, we used Github for version control. Off of our Master branch, we created a branch called Dev which housed code which was reviewed and was functional. Each person/group working on a task created their own feature branch off of dev. When a feature was completed, the code was peer-reviewed and reviewed by a project manager. Once the code was approved, it was merged into the Dev branch.
We committed our code often throughout our tasks. After a review was completed, we condensed our commit messages by squashing our commits into more meaningful messages which gave overall descriptions of features that were worked on.

We experienced many merge conflicts. Merge conflicts were handled by every individual who ran into them. The merge conflicts were required to be resolved in a manner which would ensure the code was still functional before being merged with Dev.
In order to deploy the app, we used Heroku. We implemented continuous integration, where any changes merged into our Development branch were automatically deployed.

##Technologies used
* Ruby
* Rails
* ActiveRecord
* AngularJS
* Node.js
* Socket.io
* Express
* Foundation
* RSpec
* OmniAuth
* Git
* HTML5/SASS

Ruby on Rails was used for the backend of the application. For our database, we used ActiveRecord. The frontend of the application was built out using AngularJS, HTML5/SASS, and Foundation. Node.js was used to run the chat server for the application and we used Socket.io to have a real-time chat feature. RSpec was used for writing and performing different tests. OmniAuth allowed for users to login to the app via their github login. Our team used Git for version control and to share our files. 

##User Stories

1. Users can create documents

  ### rails
  ```ruby 
  def create
    if params['file']
      new_doc =  {
        name: params['file'].original_filename,
        content: params['file'].read
      }
      @doc = Doc.new(new_doc)
    else
      @doc = Doc.new(doc_params)
    end
    respond_to do |format|
      if @doc.save
        format.html { redirect_to @doc, notice: 'Doc was successfully created.' }
        format.json { render :show, status: :created, location: @doc }
      else
        format.html { render :new }
        format.json { render json: @doc.errors, status: :unprocessable_entity }
      end
    end
  end
  ```
  ### angular
  ```javascript
  app.factory('Doc', ['$resource', function($resource) {
    return $resource('/docs/:id',
      {id: '@id'},
      {update: {method: "PATCH"}}
    );
  }]);
  ```
2. Users can edit a document and have its syntax highlighted based on language

  ### angular
  ```javascript
  app.factory('DocService', ['$location', 'Doc', 'User', '$http',
    function($location, Doc, User, $http) {
      return {
        updateDoc: function(doc) {
          Doc.update(doc);
        },
      }
    };
  }]);
  ```

  ```javascript
  // creates editor view based upon passed in mode (e.g. ruby, javascript, etc.)
  var loadFile = function(data) {
    editor = ace.edit("editor");
    scope.doc.currentUserId = User.currentUser.id;
    // Set Default Theme
    scope.theme = "tomorrow_night";
    editor.setTheme("ace/theme/tomorrow_night");
    editor.getSession().setTabSize(2);
    if (data !== undefined) {
      editor.setValue(data.content);
      editor.clearSelection();
      setMode(data);
    } else {
      // Set Choose Language Text
      scope.mode = "plain_text";
      editor.setValue("");
    }
  };

  // sets programming language based on file extension
  var setMode = function(data) {
    if (data.name.slice(data.name.indexOf('.')+1) === 'js') {
      editor.getSession().setMode("ace/mode/javascript");
      document.getElementById('mode').value = 'javascript';
    } else if (data.name.slice(data.name.indexOf('.')+1) === 'rb') {
      editor.getSession().setMode("ace/mode/ruby");
      document.getElementById('mode').value = 'ruby';
    } else if (data.name.slice(data.name.indexOf('.')+1) === 'java') {
      editor.getSession().setMode("ace/mode/java");
      document.getElementById('mode').value = 'java';
    } else if (data.name.slice(data.name.indexOf('.')+1) === 'html') {
      editor.getSession().setMode("ace/mode/html");
      document.getElementById('mode').value = 'html';
    } else if (data.name.slice(data.name.indexOf('.')+1) === 'css') {
      editor.getSession().setMode("ace/mode/css");
      document.getElementById('mode').value = 'css';
    }
  };
  ```
3. Multiple users can view the same document and edit it in real time using WebSocket Rails and Angular JS

```ruby
class LiveController < WebsocketRails::BaseController
  # Sends updates to all subscribers to the same channel (set by document id)
  def channel_broadcast
    WebsocketRails[message[:id].to_s].trigger(:change_doc, {:content => message[:content],
      :senderId => message[:currentUserId]})
  end

  def delete_user
    WebsocketRails[message].unsubscribe(connection)
  end
end
```
```javascript
      link: function(scope, element, attrs) {
        var dispatcher = new WebSocketRails(window.location.host+'/websocket');
        var channel = dispatcher.subscribe($route.current.params.id);
        element.bind("keyup", function(event) {
          scope.doc.content = editor.getValue();
          dispatcher.trigger('change_doc',scope.doc);
        });
```
```javascript
        // on navigation to another document, close the WebSocket channel
        scope.$on('$routeChangeStart', function(a, b) {
          document.getElementById("editor").remove();
          dispatcher.trigger("client_disconnected",$route.current.params.id);
        });

        // sets WebSocket listener to view changes made by another user on same document
        channel.bind('change_doc',function(data) {
          if (scope.doc.currentUserId !== data.senderId) {
            var cursor = editor.getCursorPosition();
            editor.getSession().setValue(data.content);
            editor.selection.moveCursorTo(cursor.row, cursor.column);
            scope.doc.content = data.content;
          }
        });
```
4. Users can chat on a document page
```javascript
app.controller('ChatController', ['$scope', '$routeParams', 'ChatService',
  function($scope, $routeParams, ChatService) {
    ChatService.resetMessages();
    $scope.messages = ChatService.messages;
    $scope.id = $routeParams.id;
    $scope.glued = true;

    $scope.sendMessage = function(data) {
      data.room = $routeParams.id;
      ChatService.sendMessage(data);
      $scope.message = {message: ""};
      return false;
    };

    ChatService.setSocketListener($scope.id);
}]);
```

5. Users can login as a guest or through Github to have their documents persist on the server

```ruby
class User < ActiveRecord::Base
  has_many :docs, foreign_key: "owner_id"
  has_many :folders, foreign_key: "owner_id"
  
  def self.create_user(auth)
    create! do |user|
      user.github_uid = auth['uid']
      user.guest = false
      if auth['info']
        user.name = auth['info']['name'] || ""
        user.display_name = auth['info']['nickname'] || ""
      end
    end
  end

  def self.retrieve_user(user_id)
    if user_id
      current_user ||= User.find(user_id)
    else
      current_user = User.create(name: "Guest #{Time.now.to_i}", guest: true)
    end
  end
end
```

6. Users can see a list of all the documents and folders they've created
```javascript
```javascript
app.controller('UserController', ['$scope', '$routeParams', '$location', 'User',
  function($scope, $routeParams, $location, User){
    $scope.user = User.currentUser;

    $scope.userContents = User.userDocs.get({owner_id: $routeParams["owner_id"]});
    $scope.userContents.$promise.then(function(data){
      $scope.userFiles = data.docs;
      $scope.userFolders = data.folders;
    });

    $scope.findFile = function(file) {
      $location.path("/docs/"+file.id);
    };
    $scope.findFolder = function(folder) {
      $location.path('/folders/' + folder.id);
    } 
  }]);
```
```
7. Documents and folders have CRUD operations
```javascript
app.controller('DocController', ['$scope','Doc', '$timeout', '$route',
  'DocService', '$location', function($scope, Doc,
    $timeout, $route, DocService, $location) {
  $scope.id = $route.current.params.id;
  $scope.doc = Doc.get({id: $route.current.params.id});
  $scope.doc.$promise.then(function(data){
    currentFolderId = data.folder_id
    $scope.backToParentView = !!currentFolderId;
  });

  $scope.titleEditDisable = true;
  $scope.saveComplete = false;
  $scope.downloadDoc = true;
  $scope.backToParentView = true;
  $scope.chatContainer = true;
  $scope.showChat = true;

  $scope.saveDoc = function(doc) {
    DocService.updateDoc(doc);
    $scope.titleEditDisable = true;
    $scope.saveComplete = true;
    $timeout(function() {
      $scope.saveComplete = false;
    }, 5000);
    $scope.createDownloadFile();
  };

  $scope.newDoc = function() {
    DocService.newDoc();
  };

  $scope.createTempFile = function(doc) {
    DocService.updateDoc(doc);
    DocService.createTempFile(doc.id);
  };

  $scope.editName = function() {
    $scope.titleEditDisable = false;
  };

  $scope.findParentFolder = function(){
    $location.path('/folders/' + currentFolderId);
  };

  $scope.toggleChatDisplay = function(){
    $scope.showChat = !$scope.showChat;
  };
}]);
```

```javascript
app.controller('ViewFolderController', ['$scope', '$routeParams', '$location', 'Folder', 'Doc', 'User',
  function($scope, $routeParams, $location, Folder, Doc, User) {
    $scope.folder = Folder.folderResource.get({id: $routeParams["id"]});
    $scope.folder.$promise.then(function(data){
      $scope.parentFolder = data.parentfolder_id;
      $scope.currentFolder = data;
      $scope.input = {folder: $scope.currentFolder};
    });
    $scope.backToParentView = false;
    $scope.folderDocs = Folder.folderDocResource.get({folder_id: $routeParams["id"]});
    $scope.folderDocs.$promise.then(function(data){
      $scope.subfolders = data.folders;
      $scope.docs = data.docs;
      $scope.empty = (!$scope.subfolders.length && !$scope.docs.length);
      $scope.backToParentView = !!$scope.parentFolder;
    });
    $scope.user = User.currentUser;
    $scope.updateFolderName = function(folder) {
      Folder.folderResource.update(folder);
    };
    $scope.findDoc = function(doc) {
      $location.path("/docs/" + doc.id);
    };
    $scope.findSubFolder = function(subfolder) {
      $location.path('/folders/' + subfolder.id);
    };
    $scope.findParentFolder = function(folder) {
      $location.path('/folders/' + folder.parentfolder_id);
    };
    $scope.newDoc = function(input) {
      Folder.createDocForFolder({folder_id: input.folder.id, name: input.name});
    };
    $scope.newFolder = function(input) {
      Folder.createFolder({name: input.name, parentfolder_id: input.folder.id});
    };
    $scope.newDocOrFolder = function(input) {
      Folder.createDocOrFolder(input);
    };
    $scope.deleteDoc = function(doc){
      document.getElementById(doc.id).remove();
      Doc.delete(doc, function(data) {
        $location.path('/folders/' + $scope.folder.id);
      });
    };
    $scope.deleteFolder = function(folder){
      document.getElementById(folder.id).remove();
      Folder.deleteFolder(folder, function(data) {
        $location.path('/folders/' + $scope.folder.id);
      });
    };
    $scope.viewUserPage = function() {
      $location.path("/users/"+$scope.user.id+'/contents');
    }
  }]);
```

## Team Members

2. Jon Rogozen
3. Parag Dadhaniya
4. Daniel Olasky
5. Dev Sethi
6. Jeff Louie
8. Kim Pham
10. George Garabedian
11. Peng Gao
14. Stephan Yu
