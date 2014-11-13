## User Stories

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
