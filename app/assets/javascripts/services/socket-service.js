/** 
 * $rootScope is the parent scope of all scopes. We use the $apply
 *    because we are executing an expression in angular from outside
 *    of the angular framework. Since the DOM is looking at controller's
 *    scope to update its variables, and the scope is a child of the 
 *    root scope, we must attach the data from our node chat server
 *    to the root scope. After the $apply call, Angular performs a
 *    $digest cycle on the root scope, which propogates throughout all
 *    child scopes. This will ensure that the variables on the DOM
 *    are updated.
 */

/**
 * io.connect([chat server location]) => This command establishes
 *    a connection with the node chat server, but does not try to reconnect.
 *
 * Socket.on(eventName, callback) => This is used to set a listener, which
 *    waits for data to come back from the chat server. It executes
 *    the callback when data is received.
 *
 * Socket.emit(eventName, data, callback) => This is used to send {data} to
 *    the chat server. A callback is executed if provided on success.
 */

app.factory('Socket', ['$rootScope', function($rootScope){
  var url = window.location.hostname + ':8080';
  var socket = io.connect(url , {
    reconnection: false
  });
  return {
    on: function(eventName, callback){
      socket.on(eventName, function(){
        var args = arguments;
        $rootScope.$apply(function(){
          callback.apply(socket, args);
        });
      });
    },
    emit: function(eventName, data, callback){
      socket.emit(eventName, data, function(){
        var args = arguments;
        if(callback) {
          callback.apply(socket, args);
        }
      });
    }
  };
}]);