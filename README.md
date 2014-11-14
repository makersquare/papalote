# Papalote - Collaborative Code Editor

###Workflow

Our team used Trello to organize our different features for the application. Trello was also used to assign people to the different tasks.
Trello was kept up to date by each individual who was working on a task. We also had daily scrum meetings in which every member of the team recapped what they worked on during the previous day and what they are planning to work on during the current day.

In order for our 9 person team to effectively collaborate with each other, we used Github for version control. Off of our Master branch, we created a branch called Dev which housed code which was reviewed and was functional. Each person/group working on a task created their own feature branch off of dev. When a feature was completed, the code was peer-reviewed and reviewed by a project manager. Once the code was approved, it was merged into the Dev branch.
We committed our code often throughout our tasks. After a review was completed, we condensed our commit messages by squashing our commits into more meaningful messages which gave overall descriptions of features that were worked on.

We experienced many merge conflicts. Merge conflicts were handled by every individual who ran into them. The merge conflicts were required to be resolved in a manner which would ensure the code was still functional before being merged with Dev.
In order to deploy the app, we used Heroku. We implemented continuous integration, where any changes merged into our Development branch were automatically deployed.

### Technologies used:
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

### User Stories

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
3. Multiple users can view the same document and edit it in real time
4. Users can chat on a document page
5. Users can login as a guest or through Github to have their documents persist on the server
6. Users can see a list of all the documents and folders they've created
7. Documents and folders have CRUD operations
