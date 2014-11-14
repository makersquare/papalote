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

1. Shehzan Devani
2. JON rogLOLzen
3. Parag DaDudeWheresMyCarhaniya Gets Data
4. Daniel Olasky
5. Dev Sethi
6. Jeff Louie
8. Kim Phamalote
9. Jon Katz
10. George Garabedian
11. Peng Gao
12. DJ Daniels
13. Pipe
14. Stephan Yu


## Getting Started

1. run `bundle install`
2. run `gem install figaro`
  * run `figaro install`
3. create the following files, and **populate with your local enviroment data**:
  * *There are examples of these files within the directory.*
  * create and populate: `config/database.yml`
  * create and populate: `config/application.yml`
    * application.yml holds all the secret api keys and other non public information.
    * **This file should not be uploaded to git**
4. Setup the database (step 3 must be completed)
  * run `rake db:create db:migrate`

At this point you should be able to run: `rails s` or `bundle exec rails s` and the server should start.
Go to `http://localhost:3000/#/` or `http://10.10.10.10:3000/#/` and the application should be running with a silly landing page which tests that all the assets are avaliable.

## Git Workflow

This section will be in two parts, the first is merely a list of the commands that you will be using as well as an explanation of what they do.  The second part will be the typical workflow you should all follow which will limit the ammount of merge conflicts and other git related issues that can occur when working in a large team.

### Git Commands

* `git fetch`
	* the command `git pull` performs a g `git fetch` right before it actually pulls
	* `git fetch` will compare your local repo with the remote BUT NOT make changes to your local
	* commonly used to check if a pull --rebase is necessary
* `git pull --rebase <remote> <cur_branch>`
	* this command will rewind all your changes to the last commit.
	* then it will fastforward the external changes and combine them with your own
	* this command differs from `git merge` by the fact that it attempts to lay the changes in sequential order that they where applied compared to your own changes.
	* it is recommend that you use `git pull --rebase <remote> <cb>` often and before pushing your changes up.  This will keep your local branches current with the changes on the remote.
* `git checkout -b <new_branch_name>`
	* first is creates a new branch
	* next it checks that branch out
* `git add ./`
	* this adds all files that have been changed
* `git add .`
	* this adds every single file regardless if it has been changed or not
* `git commit -m "commit message"`
* `git rebase HEAD~#`
	* `#` <- is a place holder for an integer
	* this command will allow you to squash commits
	* say we have a feature branch and have made 20 commits to the feature branch, the feature is completed and ready to merge into development
	* we want to run `git rebase HEAD~20` this will open a vim window which will allow us to squash commits int oa single commit

### Git Workflow

* **Master** is a pristine branch **DO NOT** push to it directly without prior approval, significant testing and a code review.
* **Staging** is a pristine branch used to test updates about to be pushed to *Master*
* **Development** or **Dev** is the main development branch and the one that you should be branching from in order to create issue branches.
* **(Issue Branch)** This is an issue branch.  Say, I was assigned the task of created a ORM.  I would create a branch *off of Development* where I would work.
	* It is **IMPERATIVE** that you **DO NOT** pull and merge (User1 Issue Branch) with (User2 Issue Branch), IE two feature branches,  this will taint the git repo and cause massive ammounts of merge conflicts

###### Here is a scenario

I have been tasked with creating a user login system.  Another developer has created the necessary backend omniauth connection.  The other developer has merged their branch into development.  My local dev branch currently **DOES NOT** have these changes and has a older version of the Dev Branch.

1. Update my local dev branch with the remote
	* (I am currently in the development branch)
	* `git pull --rebase origin development` (from development)
2. create my feature/issue branch
	* `git checkout -b login` (from development)
	* (I am now in the login branch)
3. Test!!!!!
4. Code!!!!!
5. Test!!!!!
6. Get your code peer reviewed - this is mandatory!
7. `git rebase HEAD~#` (from feature branch)
	* squash our commits into a single one as to not clutter the log history
8. Update your branch with changes from the development branch
	* `git fetch` (from feature, this will work for all branches in the repo regardless of where you currently are)
	* IF Development has changed run the following to update
	* `git checkout development`
	* `git pull --rebase origin development`
	* `git checkout <feature_branch>`
	* `git rebase development` (if there are merge conflicts, you will fix it here)
	* IF you have a merge conflict, do the following:
	* Fix the files that have the conflicts
	* `git add <file-name>`
	* `git rebase --continue`
	* (repeat the last 3 steps as necessary)
9. `git checkout development`
10. `git merge <feature_branch>`
11. `git push origin development`
12. You can now delete your feature branch - `git branch -d <feature_branch>`

## Environments
Rails provides us the ability to use different environments. The most commonly used ones are *'development', 'testing'* and *'production'*. Code being run on our local computers, by default, is run as a **development** environment. Code pushed to heroku, are automatically deployed as a *production* environment. 

At a glance, it might not be clear why that would cause a problem. But there are a lot of things that can (and do) differ between these 2 environments. For instance, You don't run your database in the same server as your application. That is why `database.myl` gives you the ability to configure these seperately.

In order for us to make sure the changes we just made won't *break* production we need to run our local environment as if it were production. To do this run your server using these commands:


```
> RAILS_ENV=production rake assets:precompile
> bundle exec rails server -e production
```

NOTE: Another change you have to make is copy **secret_kay_base** from `secrets.yml` into *application.yml*  **and put it in ALL CAPS** (SECRET_KEY_BASE)
