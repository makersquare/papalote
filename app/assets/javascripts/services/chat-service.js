app.factory('ChatService', ['Socket', function(Socket) {
  var messages = [];
  var emitEventName = "chat message";
  var receiveEventName = "receive message";

  return {
    sendMessage: function(message) {
      Socket.emit(
        emitEventName,
        message
      );
    },
    setSocketListener: function() {
      Socket.on(receiveEventName, function(message) {
        messages.push(message);
      });
    },
    messages: messages
  }
}]);