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
5. Users can login as a guest or through Github to have their documents persist on the server
6. Users can see a list of all the documents and folders they've created
7. Documents and folders have CRUD operations
