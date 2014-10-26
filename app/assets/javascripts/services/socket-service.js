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


app.factory('Socket', ['$rootScope', function($rootScope){
  var socket = io.connect('10.10.10.10:8080');
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