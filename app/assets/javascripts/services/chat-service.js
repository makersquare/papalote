app.factory('ChatService', ['Socket', 'User', function(Socket, User) {
  var messages = [];
  var emitEventName = "chat message";
  var receiveEventName = "receive message";

  return {
    sendMessage: function(message) {
      message.user = User.user;
      Socket.emit(
        emitEventName,
        message
      );
    },
    setSocketListener: function() {
      Socket.on(receiveEventName, function(message) {
        messages.push(message);
      });
      Socket.on('connect_error', function(){
        messages.push({
          user: User.user,
          message: 'Failed to connect to the chat server...'
        });
      });
    },
    messages: messages
  }
}]);